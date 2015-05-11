var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');

//아이템 등록
//datas = [nickname, coordiPath]
exports.add = function (datas, done) {
    logger.info('datas ', datas);
    pool.getConnection(function(err, conn){
        if(err){
            logger.error('getConnection error', err);
            done(0, false);
        }
        var sql = "insert into coordi(USER_NICKNAME, CD_REGDATE, CD_URL) values(?, now(), ?)";
        conn.query(sql, datas, function(err, row){
            if(err){
                logger.error('coordi add conn.query error ', err);
                conn.release();
                done(1, false);
            }else{
                logger.info('row ', row);
                var success=false;
                if(row.affectedRows == 1){
                    success = true;
                    conn.release();
                    done(0, success);
                }
            }
        });
    });
}

exports.modify = function (datas, done) {
    logger.info('datas ', datas);

    var cd_num = datas[0];
    var situationProp = datas[1];
    var seasonProp = datas[2];
    var tempProp = datas[3];
    var props = [situationProp, seasonProp, tempProp];

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            var sql = "select count(*) cnt from coordi_prop where CD_NUM=?";
            conn.query(sql, cd_num, function (err, row) {
                if (err) {
                    logger.error('coordi modify count conn.query error ', err);
                    conn.release();
                    done(1, false);
                } else {
                    if (row[0].cnt == 0) {
                        //기존 아이템 속성이 없을 경우
                        async.each(props, function (prop, callback) {
                            var coordiProp = [cd_num, prop];
                            var sql = "insert into coordi_prop(CD_NUM, COORDI_PROP) values(?,?)";
                            conn.query(sql, coordiProp, function (err, row) {
                                if (err) {
                                    logger.error('coordi modify insert conn.query error ', err);
                                    callback(err);
                                } else {
                                    logger.info(coordiProp);
                                    callback();
                                }
                            });
                        }, function (err) {
                            if (err) {
                                logger.error('coordiModifyAsyncEachError ', err);
                                conn.release();
                                done(2, false);
                            } else {
                                conn.release();
                                done(0, true);
                            }
                        });
                    } else {
                        //기존 아이템 속성이 있을 경우
                        var sql = "delete from coordi_prop where CD_NUM=?";
                        conn.query(sql, cd_num, function (err, row) {
                            if (err) {
                                logger.error('coordi modify delete conn.query error ', err);
                                callback(err);
                            } else {
                                async.each(props, function (prop, callback) {
                                    var coordiProp = [cd_num, prop];
                                    var sql = "insert into coordi_prop(CD_NUM, COORDI_PROP) values(?,?)";
                                    conn.query(sql, coordiProp, function (err, row) {
                                        if (err) {
                                            logger.error('coordi modify insert conn.query error ', err);
                                            callback(err);
                                        } else {
                                            logger.info(coordiProp);
                                            callback();
                                        }
                                    });
                                }, function (err) {
                                    if (err) {
                                        logger.error('coordiModifyAsyncEachError ', err);
                                        conn.release();
                                        done(2, false);
                                    } else {
                                        conn.release();
                                        done(0, true);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
}

exports.modifyDesc = function (datas, done) {
    logger.info('datas ', datas);

    var coordi_num = datas[0];
    var description = datas[1];
    var data = [description, coordi_num];
    logger.info('data ', data);
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        }else {
            var sql = "update coordi set CD_DESCRIPTION = ? where CD_NUM = ?";
            conn.query(sql, data, function (err, row) {
                if (err) {
                    logger.error('modifyDesc conn.query error ', err);
                    conn.release();
                    done(1, false);
                } else {
                    logger.info('row ', row);
                    var success = false;
                    if (row.affectedRows == 1) {
                        success = true;
                    }
                    conn.release();
                    done(0, success);
                }
            });
        }
    });
}

exports.delete = function (data, done) {
    logger.info('data', data);
    var coordi_num = data;
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            conn.beginTransaction(function (err) {
                async.series([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    }, function (callback) {
                        var sql = "delete from good_coordi where CD_NUM=?";
                        conn.query(sql, coordi_num, function (err, row) {
                            if (err) {
                                logger.error('good_coordi delete error');
                                callback(err);
                            } else {
                                logger.error('good_coordi delete success');
                                callback(null);
                            }
                        });
                    }, function (callback) {
                        var sql = "delete from coordi_prop where CD_NUM=?";
                        conn.query(sql, coordi_num, function (err, row) {
                            if (err) {
                                logger.error('coordi_prop delete error');
                                callback(err);
                            } else {
                                logger.error('coordi_prop delete success');
                                callback(null);
                            }
                        });
                    }, function (callback) {
                        var sql = "delete from coordi_item where CD_NUM=?";
                        conn.query(sql, coordi_num, function (err, row) {
                            if (err) {
                                logger.error('coordi_item delete error');
                                callback(err);
                            } else {
                                logger.error('coordi_item delete success');
                                callback(null);
                            }
                        });
                    }, function (callback) {
                        var sql = "delete from coordi where CD_NUM=?";
                        conn.query(sql, coordi_num, function (err, row) {
                            if (err) {
                                logger.error('coordi delete error');
                                callback(err);
                            } else {
                                logger.error('coordi delete success');
                                callback(null);
                            }
                        });
                    }
                ], function (err) {
                    if (err) {
                        logger.error('delete coordi error.');
                        conn.rollback(function (err) {
                            if (err) {
                                logger.error('rollback error');
                                done(1, false);
                            } else {
                                logger.error('rollback complete');
                                done(2, false);
                            }
                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                conn.rollback(function (err) {
                                    logger.error('rollback error');
                                    done(1, false);
                                });
                            }else {
                                done(0, true);
                            }
                        });
                    }
                });
            });
        }
    });
}

exports.good = function (datas, done) {
    logger.info('datas', datas);

    pool.getConnection(function(err, conn){
        if(err){
            logger.error('getConnection error', err);
            done(0, false);
        }else{
            async.waterfall([
                function(callback){
                    var sql = "select count(*) cnt from good_coordi where CD_NUM=? and USER_NICKNAME=?";
                    conn.query(sql, datas, function(err, row){
                        if(err){
                            callback(err, 'db_item good conn.query error');
                        }else{
                            callback(null, row[0].cnt);
                        }
                    })
                }, function(cnt, callback){
                    if(cnt==1){
                        //삭제
                        var sql = "delete from good_coordi where CD_NUM=? and USER_NICKNAME=?";
                        conn.query(sql, datas, function(err, row){
                            if(err){
                                callback(err, "good_coordiDeleteError");
                            }else{
                                callback(null, "ok");
                            }
                        });
                    }else{
                        //입력
                        var sql = "insert into good_coordi values(?,?)";
                        conn.query(sql, datas, function(err, row){
                            if(err){
                                callback(err, "good_coordiInsertError");
                            }else{
                                callback(null, "ok");
                            }
                        });
                    }
                }
            ],function(err, Msg){
                if(Msg=="ok"){
                    logger.info("좋아요 변경 성공");
                    conn.release();
                    done(0, true);
                }else{
                    logger.error('err ', Msg);
                    conn.release();
                    done(2, false);
                }
            });
        }
    });
}