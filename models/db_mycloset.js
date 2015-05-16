var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');
var merge = require('merge');

exports.info = function (data, done) {
    logger.info('data ', data);
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            async.series([
                function (callback) {
                    var sql = "select user.USER_NICKNAME, user.USER_PROFILE_URL from user where user.USER_NICKNAME=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 1/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 1/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) item_cnt from item where item.USER_NICKNAME=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 2/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 2/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) coordi_cnt from coordi where coordi.USER_NICKNAME=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 3/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 3/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) follow_cnt from follow where follow.USER_NICKNAME=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 4/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 4/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) follower_cnt from follow where follow.USER_NICKNAME2=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 5/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 5/5 success');
                            callback(null, row);
                        }
                    });
                }
            ], function (err, results) {
                if (err) {
                    logger.error('db_mycloset info error', err);
                    conn.release();
                    done(false);
                } else {
                    logger.info('db_mycloset info results', results);
                    conn.release();
                    done(true, results);
                }
            });
        }
    });
}

exports.item = function (data, done) {
    logger.info('db_mycloset item data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select item.ITEM_NUM from item where item.ITEM_MODIFLAG=1 and item.USER_NICKNAME=?";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset item conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var items = [];
                    async.eachSeries(rows, function (row, callback) {
                        var item_num = row.ITEM_NUM;
                        logger.info('db_mycloset item item_num', item_num);
                        async.series([
                            function (callback) {
                                var sql = "select item.ITEM_NUM, item.ITEM_URL, item.ITEM_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from item join user on item.USER_NICKNAME = user.USER_NICKNAME and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) cnt from good_item where ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.ITEM_PROP_CONTENT from item join (select item_prop.ITEM_NUM, item_prop_code.ITEM_PROP_CONTENT from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP) as p where item.ITEM_NUM = p.ITEM_NUM and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 3/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 3/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL from coordi join (select coordi_item.CD_NUM from item join coordi_item on item.ITEM_NUM = coordi_item.ITEM_NUM and item.ITEM_NUM=?) p where coordi.CD_NUM = p.CD_NUM limit 7";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/item/detail error", err);
                                done(false);
                            } else {
                                logger.info("/item/detail info");
                                var itemArr = results[0].concat(results[1]);
                                var itemInfo = merge(itemArr[0], itemArr[1]);
                                var result = {"Info": itemInfo, "ItemProp": results[2], "ItemCoordi": results[3]};
                                items.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset item error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset item success');
                            conn.release();
                            done(true, items);
                        }
                    });
                }
            });
        }
    });
}

exports.coordi = function (data, done) {
    logger.info('db_mycloset coordi data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select item.ITEM_NUM from item where item.ITEM_MODIFLAG=1 and item.USER_NICKNAME=?";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset item conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var items = [];
                    async.eachSeries(rows, function (row, callback) {
                        var item_num = row.ITEM_NUM;
                        logger.info('db_mycloset item item_num', item_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, item.ITEM_URL, item.ITEM_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from item join user on item.USER_NICKNAME = user.USER_NICKNAME and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) cnt from good_item where ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.ITEM_PROP_CONTENT from item join (select item_prop.ITEM_NUM, item_prop_code.ITEM_PROP_CONTENT from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP) as p where item.ITEM_NUM = p.ITEM_NUM and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 3/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 3/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL from coordi join (select coordi_item.CD_NUM from item join coordi_item on item.ITEM_NUM = coordi_item.ITEM_NUM and item.ITEM_NUM=?) p where coordi.CD_NUM = p.CD_NUM limit 7";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('item success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/item/detail error", err);
                                done(false);
                            } else {
                                logger.info("/item/detail info");
                                var itemArr = results[0].concat(results[1]);
                                var itemInfo = merge(itemArr[0], itemArr[1]);
                                var result = {"Info": itemInfo, "ItemProp": results[2], "ItemCoordi": results[3]};
                                items.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset item error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset item success');
                            conn.release();
                            done(true, items);
                        }
                    });
                }
            });
        }
    });
}