var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var graph = require('fbgraph');
var logger = require('../logger');
var async = require('async');

//일반 회원 가입, USER_JOINPATH(0)
exports.join = function (datas, done) {
    pool.getConnection(function (err, conn) {
        if (err) done(2, false);

        var nickname = datas[0];
        var id = datas[1];
        var sql = "select count(*) cnt from user where USER_NICKNAME=?";

        //닉네임 중복 체크
        conn.query(sql, nickname, function (err, row) {
            if (err) {
                conn.release();
                done(3, false);
            }
            logger.info(row);
            if (row[0].cnt != 0) {
                conn.release();
                done(1, false);
            } else {
                //아이디 중복 체크
                var sql = "select count(*) cnt from user where USER_ID=?";
                conn.query(sql, id, function (err, row) {
                    if (err) {
                        conn.release();
                        done(2, false);
                    }
                    logger.info(row);
                    if (row[0].cnt != 0) {
                        conn.release();
                        done(0, false);
                    } else {
                        //회원 가입
                        var sql = "insert into user(USER_NICKNAME, USER_JOINPATH, USER_ID, USER_PASSWORD, USER_JOINDATE, USER_LASTLOGIN, USER_GENDER) values(?,0,?,?,now(),now(),?)";
                        conn.query(sql, datas, function (err, row) {
                            if (err) {
                                conn.release();
                                done(3, false);
                            }
                            logger.info('row', row);
                            var success = false;
                            if (row.affectedRows == 1) {
                                success = true;
                            }
                            conn.release();
                            done(0, success);
                        });
                    }
                });
            }
        });
    });
};

exports.fb = function (datas, done) {
    var access_token = datas[0];
    var push_id = datas[1];
    var join_path = 1;
    logger.info('db_user fb access_token ', access_token);
    graph.setAccessToken(access_token);

    graph.get("me", function (err, res) {
        if (err) {
            logger.error('db_user fb graph.get error', err);
            done(0, false);
        } else {
            var gender = 0;
            if (res.gender != 'male') {
                gender = 1;
            }
            var datas = [res.id, join_path, gender];
            pool.getConnection(function (err, conn) {
                if (err) {
                    logger.error('err ', err);
                    done(0, false);
                } else {
                    var fb_id = res.id;
                    logger.info('fb_id ', fb_id);
                    async.waterfall([
                        function (callback) {
                            var sql = "select count(*) cnt from user where user.USER_FACEBOOK=?";
                            conn.query(sql, fb_id, function (err, row) {
                                if (err) {
                                    logger.error('db_user fb conn.query error ', err);
                                    callback(err);
                                } else {
                                    logger.info('db_user fb conn.query cnt ', row[0].cnt);
                                    if (row[0].cnt == 1) {
                                        logger.info('db_user fb cnt ok');
                                        callback(null, true);
                                    } else {
                                        logger.info('db_user fb cnt 0');
                                        callback(null, false);
                                    }
                                }
                            });
                        }, function (success, callback) {
                            if (success) {
                                var sql = "select user.USER_NICKNAME from user where user.USER_FACEBOOK=?";
                                conn.query(sql, fb_id, function (err, row) {
                                    if (err) {
                                        logger.error('db_user fb nick conn.query error', err);
                                        callback(err);
                                    } else {
                                        logger.info('db_user fb nick row ', row);
                                        var nickname = row[0].USER_NICKNAME;
                                        if (nickname) {
                                            logger.info('db_user fb nick row[0].USER_NICKNAME', nickname);
                                            callback(null, true, nickname);
                                        } else {
                                            callback(err);
                                        }
                                    }
                                });
                            } else {
                                callback(null, false, datas);
                            }
                        }
                    ], function (err, success, data) {
                        if (err) {
                            logger.error('db_user fb error', err);
                            conn.release();
                            done(0, false);
                        } else if (success) {
                            logger.info('db_user fb login data');
                            var sql = "update user set user.USER_LASTLOGIN=now(), user.USER_PUSHKEY=? where user.USER_NICKNAME=?";
                            conn.query(sql, [push_id, data], function(err, row){
                               if(err){
                                   logger.error('db_user fb login error', err);
                                   conn.release();
                                   done(1, false);
                               } else{
                                   logger.info('db_user fb login success');
                                   conn.release();
                                   done(0, true, data);
                               }
                            });
                        } else {
                            logger.info('db_user fb fail data');
                            conn.release();
                            done(1, false, data);
                        }
                    });
                }
            });
        }
    });
}

//페이스북 회원 가입, USER_JOINPATH(1)
exports.fbjoin = function (datas, done) {
    logger.info('datas ', datas);
    // datas = [facebook_id, join_path, gender, nickname];

    pool.getConnection(function (err, conn) {
        async.waterfall([
            function (callback) {
                var sql = "select count(*) cnt from user where user.USER_FACEBOOK=?";
                conn.query(sql, datas[0], function (err, row) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        logger.info('db_user fbjoin cnt success');
                        callback(null, row[0].cnt);
                    }
                });
            }, function (cnt, callback) {
                if (cnt == 1) {
                    //FACEBOOK ID 중복일때
                    callback(null, 0);
                } else {
                    var sql = "select count(*) cnt from user where user.USER_NICKNAME=?";
                    conn.query(sql, datas[3], function (err, row) {
                        if (err) {
                            callback(err);
                        } else {
                            //nickname 중복일때
                            if (row[0].cnt == 1) {
                                callback(null, 1);
                            } else {
                                callback(null, 2);
                            }
                        }
                    });
                }
            }, function (flag, callback) {
                if (flag == 0) {
                    callback(null, 0);
                } else if (flag == 1) {
                    callback(null, 3)
                } else {
                    var sql = "insert into user(USER_FACEBOOK, USER_JOINPATH, USER_GENDER, USER_NICKNAME, USER_JOINDATE, USER_LASTLOGIN) values(?,?,?,?,now(),now())";
                    conn.query(sql, datas, function (err, row) {
                        if (err) {
                            logger.error('fbjoin conn.query error', err);
                            callback(err);
                        } else {
                            callback(null, 1);
                        }
                    });
                }
            }
        ], function (err, flag) {
            if (err) {
                logger.error('db_user fbjoin error', err);
                conn.release();
                done(false, 0);
            } else if (flag == 0) {
                logger.info('db_user fbjoin idDuplicated');
                conn.release();
                done(false, 1);
            } else if (flag == 1) {
                logger.info('db_user fbjoin success');
                conn.release();
                done(true, 0);
            } else if (flag == 2) {
                logger.info('db_user fbjoin conn.query error');
                conn.release();
                done(false, 2);
            } else if (flag == 3) {
                logger.info('db_user fbjoin nicknameDuplicated');
                conn.release();
                done(false, 3);
            }
        });
    });
}

exports.login = function (datas, done) {
    logger.info('db_user datas ', datas);

    pool.getConnection(function (err, conn) {
        async.waterfall([
            function (callback) {
                var sql = "select count(*) cnt from user where USER_ID=? and USER_PASSWORD=?";
                conn.query(sql, datas, function (err, row) {
                    if (err) {
                        logger.error('db_user select err ', err);
                        callback(err);
                    } else {
                        logger.info('db_user select success row ', row);
                        if (row[0].cnt == 1) {
                            callback(null, true);
                        } else {
                            callback(null, false);
                        }
                    }
                });
            }, function (success, callback) {
                if (success) {
                    var sql = "select user.USER_NICKNAME from user where user.USER_ID=?";
                    conn.query(sql, datas[0], function (err, row) {
                        if (err) {
                            logger.error('db_user select err ', err);
                            callback(err);
                        } else {
                            logger.info('/user/login user.USER_NICKNAME ', row[0].USER_NICKNAME);
                            callback(null, true, row[0].USER_NICKNAME);
                        }
                    });
                } else {
                    logger.error('/user/login fail ');
                    callback(null, false);
                }
            }
        ], function (err, success, nick) {
            if (err) {
                logger.error('/user/login err', err);
                conn.release();
                done(fail);
            } else {
                if (nick) {
                    var sql = "update user set user.USER_LASTLOGIN=now(), user.USER_PUSHKEY=? where user.USER_NICKNAME=?";
                    conn.query(sql, [datas[2], nick], function (err, row) {
                        if (err) {
                            logger.error('db_user update err ', err);
                            done(false);
                        } else {
                            logger.info('/user/login nick', nick);
                            conn.release();
                            done(success, nick);
                        }
                    });
                } else {
                    logger.info('/user/login nick', nick);
                    conn.release();
                    done(success, nick);
                }
            }
        });
    });
}

exports.update = function (data, done) {
    logger.info('db_user update data ', data);

    pool.getConnection(function (err, conn) {
        var sql = "select user.USER_ID, user.USER_NICKNAME from user where user.USER_NICKNAME=?";
        conn.query(sql, data, function (err, rows) {
            if (err) {
                logger.error('db_user conn.query err ', err);
                conn.release();
                done(false);
            } else {
                logger.info('db_user select rows ', rows);
                conn.release();
                done(true, rows);
            }
        });
    });
}

exports.changepasswd = function (datas, done) {
    logger.info('db_user changepasswd datas ', datas);
    pool.getConnection(function (err, conn) {
        async.waterfall([
            function (callback) {
                var sql = "select count(*) cnt from user where user.USER_NICKNAME=? and user.USER_PASSWORD=?";
                var data = [datas[0], datas[1]];
                conn.query(sql, data, function (err, row) {
                    if (err) {
                        logger.error('db_user changepasswd conn.query 1/2 Error', err);
                        callback(err);
                    } else {
                        logger.info('db_user changepasswd cnt', row[0].cnt);
                        callback(null, true, row[0].cnt);
                    }
                });
            }, function (success, cnt, callback) {
                if (success) {
                    if (cnt == 1) {
                        var sql = "update user set user.USER_PASSWORD=? where user.USER_NICKNAME=?";
                        var data = [datas[2], datas[0]];
                        conn.query(sql, data, function (err, row) {
                            if (err) {
                                logger.error('db_user changepasswd conn.query 2/2 Error', err);
                                callback(err);
                            } else {
                                callback(null, true);
                            }
                        });
                    } else {
                        logger.info('db_user changepasswd cnt==0');
                        callback(null, false);
                    }
                } else {
                    callback(null, false);
                }
            }
        ], function (err, success) {
            if(err){
                logger.error('db_user changepasswd error ', err);
                conn.release();
                done(false);
            }else {
                if (success) {
                    logger.info('db_user changepasswd success');
                    conn.release();
                    done(true);
                } else {
                    logger.info('db_user changepasswd fail');
                    conn.release();
                    done(false);
                }
            }
        });
    });
}

exports.userSearch = function (data, done) {
    logger.info('db_user userSearch data ', data);
    pool.getConnection(function (err, conn) {
        if(err){
            logger.error('getConnection error', err);
            done(false);
        }else{
            var sql = "select USER_NICKNAME from user where USER_NICKNAME like ?";
            conn.query(sql, data, function(err, rows){
                if(err){
                    logger.error('db_user userSearch conn.query error', err);
                    conn.release();
                    done(false);
                }else{
                    var users = [];
                    async.eachSeries(rows, function(row, callback){
                        var nickname = row.USER_NICKNAME;
                        logger.info('db_user userSearch nickname', nickname);

                        var sql = "select user.USER_NICKNAME, user.USER_PROFILE_URL from user where user.USER_NICKNAME=?";
                        conn.query(sql, nickname, function (err, row) {
                            if (err) {
                                logger.error("/user/search error", err);
                                done(false);
                            } else {
                                logger.info("/user/search info", row);
                                var result = {"Info": row};
                                users.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_user userSearch error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_user userSearch success');
                            conn.release();
                            done(true, users);
                        }
                    });
                }
            });
        }
    });
}

exports.userWeatherInfo = function (datas, done) {
    logger.info('db_user userSearch datas ', datas);

}