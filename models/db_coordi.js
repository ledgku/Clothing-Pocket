var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');
var fs = require('fs');

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
                    },  function(callback){
                        var sql = "select CD_URL from coordi where CD_NUM=?";
                        conn.query(sql, coordi_num, function(err, row){
                            if(err){
                                logger.error('CD_URL select error');
                                callback(err);
                            }else{
                                logger.info('CD_URL select success');
                                callback(null, row[0].CD_URL);
                            }
                        });
                    },function (callback) {
                        var sql = "delete from good_coordi where CD_NUM=?";
                        conn.query(sql, coordi_num, function (err, row) {
                            if (err) {
                                logger.error('good_coordi delete error');
                                callback(err);
                            } else {
                                logger.info('good_coordi delete success');
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
                                logger.info('coordi_prop delete success');
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
                                logger.info('coordi_item delete success');
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
                                logger.info('coordi delete success');
                                callback(null);
                            }
                        });
                    }
                ], function (err, imgPath) {
                    if (err) {
                        logger.error('delete coordi error.');
                        conn.rollback(function (err) {
                            if (err) {
                                logger.error('rollback error');
                                done(1, false);
                            } else {
                                logger.info('rollback complete');
                                done(2, false);
                            }
                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                conn.rollback(function (err) {
                                    logger.error('rollback error');
                                    conn.release();
                                    done(1, false);
                                });
                            }else {
                                var pathArr = imgPath[1].split('/');
                                var fileName = pathArr[pathArr.length-1];
                                var filePath = "./public/images/coordi/"+fileName;
                                logger.info(filePath);
                                fs.unlink(filePath, function(err){
                                    logger.error('err', err);
                                    done(3, false);
                                });
                                conn.release();
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

exports.detail = function (data, done) {
    logger.info('data ', data);

    var coordi_num = data;

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            async.series([
                function (callback) {
                    var sql = "select coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                    conn.query(sql, coordi_num, function(err, row){
                        if(err){
                            logger.error('coordi detail conn.query error 1/5', err);
                            callback(err);
                        }else{
                            logger.info('coordi detail success 1/5');
                            callback(null, row);
                        }
                    });
                }, function (callback){
                    var sql = "select count(*) cnt from good_coordi where CD_NUM=?";
                    conn.query(sql, coordi_num, function(err, row){
                        if(err){
                            logger.error('coordi detail conn.query error 2/5', err);
                            callback(err);
                        } else{
                            logger.info('coordi detail success 2/5');
                            callback(null, row);
                        }
                    });
                }, function (callback){
                    var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                    conn.query(sql, coordi_num, function(err, row){
                        if(err){
                            logger.error('coordi detail conn.query error 3/5', err);
                            callback(err);
                        } else{
                            logger.info('coordi detail success 3/5');
                            callback(null, row);
                        }
                    });
                }, function (callback){
                    var sql = "select item.ITEM_NUM, item.ITEM_URL from COORDI_ITEM join ITEM on coordi_item.ITEM_NUM = item.ITEM_NUM where coordi_item.CD_NUM=?";
                    conn.query(sql, coordi_num, function(err, row){
                        if(err){
                            logger.error('item detail conn.query error 4/5', err);
                            callback(err);
                        } else{
                            logger.info('item detail success 4/5');
                            callback(null, row);
                        }
                    });
                }, function (callback){
                    var sql = "select coordi.CD_NUM, coordi.CD_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME where coordi.USER_NICKNAME=(select coordi.USER_NICKNAME from coordi where coordi.CD_NUM=?) limit 7";
                    conn.query(sql, coordi_num, function(err, row){
                        if(err){
                            logger.error('item detail conn.query error 5/5', err);
                            callback(err);
                        } else{
                            logger.info('item detail success 5/5');
                            callback(null, row);
                        }
                    });
                }
            ], function (err, results) {
                if(err){
                    logger.error("/coordi/detail error", err);
                    conn.release();
                    done(false);
                }else{
                    logger.info("/coordi/detail info");
                    conn.release();
                    done(true, results);
                }
            });
        }
    });
}