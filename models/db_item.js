var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');
var fs = require('fs');

//아이템 등록
exports.add = function (datas, done) {
    logger.info('datas ', datas);
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            var sql = "insert into item(USER_NICKNAME, ITEM_REGDATE, ITEM_URL) values(?, now(), ?)";
            conn.query(sql, datas, function (err, row) {
                if (err) {
                    logger.error('item add conn.query error ', err);
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

exports.modify = function (datas, done) {
    logger.info('datas ', datas);

    var item_num = datas[0];
    var categoryProp = datas[1];
    var seasonProp = datas[2];
    var colorProp = datas[3];
    var props = [categoryProp, seasonProp, colorProp];

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            var sql = "select count(*) cnt from item_prop where ITEM_NUM=?";
            conn.query(sql, item_num, function (err, row) {
                if (err) {
                    logger.error('item modify count conn.query error ', err);
                    conn.release();
                    done(1, false);
                } else {
                    if (row[0].cnt == 0) {
                        //기존 아이템 속성이 없을 경우
                        async.each(props, function (prop, callback) {
                            var itemProp = [item_num, prop];
                            var sql = "insert into item_prop(ITEM_NUM, ITEM_PROP) values(?,?)";
                            conn.query(sql, itemProp, function (err, row) {
                                if (err) {
                                    logger.error('item modify insert conn.query error ', err);
                                    callback(err);
                                } else {
                                    logger.info(itemProp);
                                    callback();
                                }
                            });
                        }, function (err) {
                            if (err) {
                                logger.error('itemModifyAsyncEachError ', err);
                                conn.release();
                                done(2, false);
                            } else {
                                conn.release();
                                done(0, true);
                            }
                        });
                    } else {
                        //기존 아이템 속성이 있을 경우
                        var sql = "delete from item_prop where ITEM_NUM=?";
                        conn.query(sql, item_num, function (err, row) {
                            if (err) {
                                logger.error('item modify delete conn.query error ', err);
                                callback(err);
                            } else {
                                async.each(props, function (prop, callback) {
                                    var itemProp = [item_num, prop];
                                    var sql = "insert into item_prop(ITEM_NUM, ITEM_PROP) values(?,?)";
                                    conn.query(sql, itemProp, function (err, row) {
                                        if (err) {
                                            logger.error('item modify insert conn.query error ', err);
                                            callback(err);
                                        } else {
                                            logger.info(itemProp);
                                            callback();
                                        }
                                    });
                                }, function (err) {
                                    if (err) {
                                        logger.error('itemModifyAsyncEachError ', err);
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

    var item_num = datas[0];
    var description = datas[1];
    var data = [description, item_num];
    logger.info('data ', data);
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            var sql = "update item set ITEM_DESCRIPTION = ? where ITEM_NUM = ?";
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
    var item_num = data;
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
                        var sql = "select ITEM_URL from item where ITEM_NUM=?";
                        conn.query(sql, item_num, function (err, row) {
                            if (err) {
                                logger.error('good_item_url select error');
                                callback(err);
                            } else {
                                logger.info('good_item_url select success');
                                callback(null, row[0].ITEM_URL);
                            }
                        });
                    }, function (callback) {
                        var sql = "delete from good_item where ITEM_NUM=?";
                        conn.query(sql, item_num, function (err, row) {
                            if (err) {
                                logger.error('good_item delete error');
                                callback(err);
                            } else {
                                logger.info('good_item delete success');
                                callback(null);
                            }
                        });
                    }, function (callback) {
                        var sql = "delete from item_prop where ITEM_NUM=?";
                        conn.query(sql, item_num, function (err, row) {
                            if (err) {
                                logger.error('item_prop delete error');
                                callback(err);
                            } else {
                                logger.info('item_prop delete success');
                                callback(null);
                            }
                        });
                    }, function (callback) {
                        var sql = "delete from coordi_item where ITEM_NUM=?";
                        conn.query(sql, item_num, function (err, row) {
                            if (err) {
                                logger.error('coordi_item delete error');
                                callback(err);
                            } else {
                                logger.info('coordi_item delete success');
                                callback(null);
                            }
                        });
                    }, function (callback) {
                        var sql = "delete from item where ITEM_NUM=?";
                        conn.query(sql, item_num, function (err, row) {
                            if (err) {
                                logger.error('item delete error');
                                callback(err);
                            } else {
                                logger.info('item delete success');
                                callback(null);
                            }
                        });
                    }
                ], function (err, imgPath) {
                    if (err) {
                        logger.error('delete item error.');
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
                            } else {
                                var pathArr = imgPath[1].split('/');
                                var fileName = pathArr[pathArr.length - 1];
                                var filePath = "./public/images/items/" + fileName;
                                logger.info(filePath);
                                fs.unlink(filePath, function (err) {
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
    var contents = datas[1] + '님이 회원님의 아이템을 좋아합니다.';

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            async.waterfall([
                function (callback) {
                    var sql = "select count(*) cnt from good_item where ITEM_NUM=? and USER_NICKNAME=?";
                    conn.query(sql, datas, function (err, row) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, row[0].cnt);
                        }
                    })
                }, function (cnt, callback) {
                    if (cnt == 1) {
                        //삭제
                        var sql = "delete from good_item where ITEM_NUM=? and USER_NICKNAME=?";
                        conn.query(sql, datas, function (err, row) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, 'down');
                            }
                        });
                    } else {
                        //입력
                        var sql = "insert into good_item values(?,?)";
                        conn.query(sql, datas, function (err, row) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, 'up');
                            }
                        });
                    }
                }, function(stat, callback){
                    var sql = "select ITEM_URL, USER_NICKNAME from item where ITEM_NUM=?";
                    conn.query(sql, datas[0], function(err, row){
                       if(err){
                           callback(err);
                       } else{
                           var item_url = row[0].ITEM_URL;
                           var user_nickname = row[0].USER_NICKNAME;
                           if(!item_url || !user_nickname){
                               callback(null, false);
                           }else {
                               var sql = "select USER_PROFILE_URL from user where USER_NICKNAME=?";
                               conn.query(sql, user_nickname, function (err, row) {
                                   if (err) {
                                       callback(err);
                                   } else {
                                       var user_profile_url = row[0].USER_PROFILE_URL;
                                       if(!user_profile_url){
                                           callback(null, false);
                                       }else {
                                           var datas = [user_nickname, contents, item_url, user_profile_url];
                                           var sql = "insert into alarm(ALARM_FLAG, USER_NICKNAME, ALARM_CONTENTS, ALARM_REGDATE, IMG_URL, USER_PROFILE_URL) values(2,?,?,now(),?,?)";
                                           conn.query(sql, datas, function(err, row){
                                              if(err){
                                                  callback(err);
                                              } else{
                                                  callback(null, true, stat, user_nickname);
                                              }
                                           });
                                       }
                                   }
                               });
                           }
                       }
                    });
                }
            ], function (err, success, stat, nickname) {
                if (success) {
                    logger.info("/item/good stat nickname", stat, nickname);

                    var sql = "select USER_PUSHKEY from user where USER_NICKNAME=?";
                    conn.query(sql, nickname, function(err, row){
                        if(err){
                            conn.release();
                            done(1, false);
                        }else{
                            conn.release();
                            done(0, true, stat, contents, row[0].USER_PUSHKEY);
                        }
                    });
                } else {
                    logger.error('db_item good error');
                    conn.release();
                    done(2, false);
                }
            });
        }
    });
}

exports.detail = function (data, done) {
    logger.info('data ', data);

    var item_num = data;

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            async.series([
                function (callback) {
                    var sql = "select item.ITEM_NUM, item.ITEM_URL, item.ITEM_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from item join user on item.USER_NICKNAME = user.USER_NICKNAME and item.ITEM_NUM=?";
                    conn.query(sql, item_num, function (err, row) {
                        if (err) {
                            logger.error('item detail conn.query error 1/4', err);
                            callback(err);
                        } else {
                            logger.info('item detail success 1/4');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) cnt from good_item where ITEM_NUM=?";
                    conn.query(sql, item_num, function (err, row) {
                        if (err) {
                            logger.error('item detail conn.query error 2/4', err);
                            callback(err);
                        } else {
                            logger.info('item detail success 2/4');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select p.ITEM_PROP_CONTENT from item join (select item_prop.ITEM_NUM, item_prop_code.ITEM_PROP_CONTENT from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP) p where item.ITEM_NUM = p.ITEM_NUM and item.ITEM_NUM=?";
                    conn.query(sql, item_num, function (err, row) {
                        if (err) {
                            logger.error('item detail conn.query error 3/4', err);
                            callback(err);
                        } else {
                            logger.info('item detail success 3/4');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select coordi.CD_NUM, coordi.CD_URL from coordi join (select coordi_item.CD_NUM from item join coordi_item on item.ITEM_NUM = coordi_item.ITEM_NUM and item.ITEM_NUM=?) p where coordi.CD_NUM = p.CD_NUM limit 7";
                    conn.query(sql, item_num, function (err, row) {
                        if (err) {
                            logger.error('item detail conn.query error 4/4', err);
                            callback(err);
                        } else {
                            logger.info('item detail success 4/4');
                            callback(null, row);
                        }
                    });
                }
            ], function (err, results) {
                if (err) {
                    logger.error("/item/detail error", err);
                    conn.release();
                    done(false);
                } else {
                    logger.info("/item/detail info");
                    conn.release();
                    done(true, results);
                }
            });
        }
    });
}

exports.modifyInfo = function (data, done) {
    logger.info('data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            async.series([
                function (callback) {
                    var sql = "select item_prop.ITEM_PROP from item_prop where item_prop.ITEM_NUM=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select ITEM_DESCRIPTION from item where ITEM_NUM=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, row);
                        }
                    });
                }
            ], function (err, row) {
                if (err) {
                    logger.error('db_item modifyInfo error', err);
                    conn.release();
                    done(false);
                } else {
                    logger.info('db_item modifyInfo success');
                    conn.release();
                    done(true, row);
                }
            });
        }
    });
}