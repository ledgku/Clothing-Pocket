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
                            logger.error('db_closet info 1/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_closet info 1/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) item_cnt from item where item.USER_NICKNAME=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_closet info 2/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_closet info 2/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) coordi_cnt from coordi where coordi.USER_NICKNAME=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_closet info 3/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_closet info 3/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) follow_cnt from follow where follow.USER_NICKNAME=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_closet info 4/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_closet info 4/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) follower_cnt from follow where follow.USER_NICKNAME2=?";
                    conn.query(sql, data, function (err, row) {
                        if (err) {
                            logger.error('db_closet info 5/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_closet info 5/5 success');
                            callback(null, row);
                        }
                    });
                }
            ], function (err, results) {
                if (err) {
                    logger.error('db_closet info error', err);
                    conn.release();
                    done(false);
                } else {
                    logger.info('db_closet info results', results);
                    conn.release();
                    done(true, results);
                }
            });
        }
    });
}

exports.coordi = function (data, done) {
    logger.info('db_closet coordi data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select coordi.CD_NUM from coordi where coordi.USER_NICKNAME=? order by CD_REGDATE desc";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_closet coordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_closet coordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('coordi conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('coordi success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('coordi conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('coordi success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('coordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('coordi detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('coordi conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('coordi success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/coordi error", err);
                                done(false);
                            } else {
                                logger.info("/closet/coordi info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "ItemProp": results[3], "ItemCoordi": results[4]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_closet coordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_closet coordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.pickCoordi = function (data, done) {
    logger.info('db_closet pickCoordi data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select good_coordi.CD_NUM from good_coordi where good_coordi.USER_NICKNAME=?";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_closet pickCoordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_closet pickCoordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('pickCoordi conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('pickCoordi success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('pickCoordi conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('pickCoordi success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('pickCoordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('pickCoordi detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('pickCoordi conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('pickCoordi success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/pick/coordi error", err);
                                done(false);
                            } else {
                                logger.info("/closet/pick/coordi info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "ItemProp": results[3], "ItemCoordi": results[4]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_closet pickCoordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_closet pickCoordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.searchPropCoordi = function (data, done) {
    logger.info('db_closet searchPropCoordi data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select coordi.CD_NUM from coordi where coordi.USER_NICKNAME=?) a join (select coordi_prop.CD_NUM from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP where coordi_prop_code.COORDI_PROP_CONTENT=?) b on a.CD_NUM = b.CD_NUM";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_closet searchPropCoordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_closet searchPropCoordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPropCoordi conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchPropCoordi success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPropCoordi conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchPropCoordi success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('searchPropCoordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('searchPropCoordi detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPropCoordi conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchPropCoordi success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/coordi/search error", err);
                                done(false);
                            } else {
                                logger.info("/closet/coordi/search info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "ItemProp": results[3], "ItemCoordi": results[4]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_closet searchPropCoordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_closet searchPropCoordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.searchPickPropCoordi = function (data, done) {
    logger.info('db_closet searchPickPropCoordi data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select good_coordi.CD_NUM from good_coordi where good_coordi.USER_NICKNAME=?) a join (select coordi_prop.CD_NUM from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP where coordi_prop_code.COORDI_PROP_CONTENT=?) b on a.CD_NUM = b.CD_NUM";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_closet searchPickPropCoordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_closet searchPickPropCoordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPickPropCoordi conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchPickPropCoordi success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPickPropCoordi conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchPickPropCoordi success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('searchPickPropCoordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('searchPickPropCoordi detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPickPropCoordi conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchPickPropCoordi success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/pick/coordi/search error", err);
                                done(false);
                            } else {
                                logger.info("/closet/pick/coordi/search info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "ItemProp": results[3], "ItemCoordi": results[4]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_closet searchPickPropCoordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_closet searchPickPropCoordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}