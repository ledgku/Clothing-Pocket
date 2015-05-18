var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');
var merge = require('merge');

exports.listGood = function (data, done) {
    logger.info('db_list listGood data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select coordi.CD_NUM from coordi where coordi.USER_NICKNAME<>?) a join good_coordi using(CD_NUM) group by CD_NUM order by count(*) desc";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_list listGood conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_list searchPickPropCoordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listGood conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('listGood success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listGood conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('listGood success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('listGood detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('listGood detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listGood conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('listGood success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/good error", err);
                                done(false);
                            } else {
                                logger.info("/closet/good info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_list listGood error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_list listGood success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.listRecent = function (data, done) {
    logger.info('db_list listRecent data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select CD_NUM from coordi where USER_NICKNAME<>? order by CD_REGDATE desc";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_list listRecent conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_list listRecent coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listRecent conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('listRecent success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listRecent conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('listRecent success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('listRecent detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('listRecent detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listRecent conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('listRecent success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/recent error", err);
                                done(false);
                            } else {
                                logger.info("/closet/recent info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_list listRecent error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_list listRecent success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.listFollow = function (data, done) {
    logger.info('db_list listFollow data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select coordi.CD_NUM from coordi join (select USER_NICKNAME from follow where USER_NICKNAME2=?) a on coordi.USER_NICKNAME=a.USER_NICKNAME order by coordi.CD_REGDATE";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_list listFollow conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_list listFollow coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listFollow conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('listFollow success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listFollow conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('listFollow success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('listFollow detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('listFollow detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('listFollow conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('listFollow success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/follow error", err);
                                done(false);
                            } else {
                                logger.info("/closet/follow info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_list listFollow error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_list listFollow success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.searchListPropGood = function (datas, done) {
    logger.info('db_list searchListPropGood datas ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select CD_NUM from coordi where USER_NICKNAME<>?) a join (select coordi_prop.CD_NUM from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP where coordi_prop_code.COORDI_PROP_CONTENT=?) b on a.CD_NUM = b.CD_NUM";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_list searchListPropGood conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_list searchListPropGood coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropGood conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropGood success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropGood conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropGood success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('searchListPropGood detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('searchListPropGood detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropGood conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropGood success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/good/search error", err);
                                done(false);
                            } else {
                                logger.info("/closet/good/search info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_list searchListPropGood error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_list searchListPropGood success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.searchListPropRecent = function (datas, done) {
    logger.info('db_list searchListPropRecent datas ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select CD_NUM from coordi where USER_NICKNAME<>? order by CD_REGDATE) a join (select coordi_prop.CD_NUM from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP where coordi_prop_code.COORDI_PROP_CONTENT=?) b on a.CD_NUM = b.CD_NUM";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_list searchListPropRecent conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_list searchListPropRecent coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropRecent conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropRecent success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropRecent conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropRecent success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('searchListPropRecent detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('searchListPropRecent detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropRecent conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropRecent success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/recent/search error", err);
                                done(false);
                            } else {
                                logger.info("/closet/recent/search info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_list searchListPropRecent error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_list searchListPropRecent success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.searchListPropFollow = function (datas, done) {
    logger.info('db_list searchListPropFollow datas ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select coordi.CD_NUM from coordi join (select USER_NICKNAME from follow where USER_NICKNAME2=?) c on coordi.USER_NICKNAME = c.USER_NICKNAME order by coordi.CD_REGDATE) a join (select coordi_prop.CD_NUM from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP where coordi_prop_code.COORDI_PROP_CONTENT=?) b on a.CD_NUM = b.CD_NUM";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_list searchListPropFollow conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_list searchListPropFollow coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropFollow conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropFollow success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropFollow conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropFollow success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback){
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function(err, row){
                                    if(err){
                                        logger.error('searchListPropFollow detail conn.query error 3/4', err);
                                        callback(err);
                                    } else{
                                        logger.info('searchListPropFollow detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchListPropFollow conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchListPropFollow success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/closet/follow/search error", err);
                                done(false);
                            } else {
                                logger.info("/closet/follow/search info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_list searchListPropFollow error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_list searchListPropFollow success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}