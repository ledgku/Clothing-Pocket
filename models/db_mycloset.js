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
                                        logger.error('item conn.query error 1/3');
                                        callback(err);
                                    } else {
                                        logger.info('item success 1/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) cnt from good_item where ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 2/3');
                                        callback(err);
                                    } else {
                                        logger.info('item success 2/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.ITEM_PROP_CONTENT from item join (select item_prop.ITEM_NUM, item_prop_code.ITEM_PROP_CONTENT from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP) as p where item.ITEM_NUM = p.ITEM_NUM and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('item conn.query error 3/3');
                                        callback(err);
                                    } else {
                                        logger.info('item success 3/3', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/mycloset/item error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/item info");
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
            var sql = "select coordi.CD_NUM from coordi where coordi.USER_NICKNAME=?";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset coordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_mycloset coordi coordi_num', coordi_num);
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
                            }, function (callback) {
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('coordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else {
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
                                logger.error("/mycloset/coordi error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/coordi info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "ItemProp": results[3], "ItemCoordi": results[4]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset coordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset coordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.zzimItem = function (data, done) {
    logger.info('db_mycloset zzimItem data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select good_item.ITEM_NUM from good_item where good_item.USER_NICKNAME=?";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset item conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var items = [];
                    async.eachSeries(rows, function (row, callback) {
                        var item_num = row.ITEM_NUM;
                        logger.info('db_mycloset zzimItem item_num', item_num);
                        async.series([
                            function (callback) {
                                var sql = "select item.ITEM_NUM, item.ITEM_URL, item.ITEM_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from item join user on item.USER_NICKNAME = user.USER_NICKNAME and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('zzimItem conn.query error 1/3');
                                        callback(err);
                                    } else {
                                        logger.info('zzimItem success 1/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) cnt from good_item where ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('zzimItem conn.query error 2/3');
                                        callback(err);
                                    } else {
                                        logger.info('zzimItem success 2/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.ITEM_PROP_CONTENT from item join (select item_prop.ITEM_NUM, item_prop_code.ITEM_PROP_CONTENT from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP) as p where item.ITEM_NUM = p.ITEM_NUM and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('zzimItem conn.query error 3/3');
                                        callback(err);
                                    } else {
                                        logger.info('zzimItem success 3/3', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/mycloset/zzim/item error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/zzim/item info");
                                var itemArr = results[0].concat(results[1]);
                                var itemInfo = merge(itemArr[0], itemArr[1]);
                                var result = {"Info": itemInfo, "ItemProp": results[2], "ItemCoordi": results[3]};
                                items.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset zzimItem error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset zzimItem success');
                            conn.release();
                            done(true, items);
                        }
                    });
                }
            });
        }
    });
}

exports.zzimCoordi = function (data, done) {
    logger.info('db_mycloset zzimCoordi data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select good_coordi.CD_NUM from good_coordi where good_coordi.USER_NICKNAME=?";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset zzimCoordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_mycloset zzimCoordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('zzimCoordi conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('zzimCoordi success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('zzimCoordi conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('zzimCoordi success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('zzimCoordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else {
                                        logger.info('zzimCoordi detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('zzimCoordi conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('zzimCoordi success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/mycloset/zzim/coordi error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/zzim/coordi info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "ItemProp": results[3], "ItemCoordi": results[4]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset zzimCoordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset zzimCoordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.searchPropItem = function (datas, done) {
    logger.info('db_mycloset searchPropItem data ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.ITEM_NUM from (select item.ITEM_NUM from item where item.USER_NICKNAME=?) a join (select item_prop.ITEM_NUM from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP where item_prop_code.ITEM_PROP_CONTENT=?) b on a.ITEM_NUM = b.ITEM_NUM";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset searchPropItem conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var items = [];
                    async.eachSeries(rows, function (row, callback) {
                        var item_num = row.ITEM_NUM;
                        logger.info('db_mycloset searchPropItem item_num', item_num);
                        async.series([
                            function (callback) {
                                var sql = "select item.ITEM_NUM, item.ITEM_URL, item.ITEM_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from item join user on item.USER_NICKNAME = user.USER_NICKNAME and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPropItem conn.query error 1/3');
                                        callback(err);
                                    } else {
                                        logger.info('searchPropItem success 1/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) cnt from good_item where ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPropItem conn.query error 2/3');
                                        callback(err);
                                    } else {
                                        logger.info('searchPropItem success 2/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.ITEM_PROP_CONTENT from item join (select item_prop.ITEM_NUM, item_prop_code.ITEM_PROP_CONTENT from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP) as p where item.ITEM_NUM = p.ITEM_NUM and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPropItem conn.query error 3/3');
                                        callback(err);
                                    } else {
                                        logger.info('searchPropItem success 3/3', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/mycloset/item/search error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/item/search info");
                                var itemArr = results[0].concat(results[1]);
                                var itemInfo = merge(itemArr[0], itemArr[1]);
                                var result = {"Info": itemInfo, "ItemProp": results[2], "ItemCoordi": results[3]};
                                items.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset searchPropItem error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset searchPropItem success');
                            conn.release();
                            done(true, items);
                        }
                    });
                }
            });
        }
    });
}

exports.searchPropCoordi = function (datas, done) {
    logger.info('db_mycloset searchPropCoordi data ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select coordi.CD_NUM from coordi where coordi.USER_NICKNAME=?) a join (select coordi_prop.CD_NUM from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP where coordi_prop_code.COORDI_PROP_CONTENT=?) b on a.CD_NUM = b.CD_NUM";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset searchPropCoordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_mycloset searchPropCoordi coordi_num', coordi_num);
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
                            }, function (callback) {
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchPropCoordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else {
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
                                logger.error("/mycloset/coordi/search error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/coordi/search info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "ItemProp": results[3], "ItemCoordi": results[4]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset searchPropCoordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset searchPropCoordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.searchZzimPropItem = function (datas, done) {
    logger.info('db_mycloset searchZzimPropItem data ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.ITEM_NUM from (select good_item.ITEM_NUM from good_item where good_item.USER_NICKNAME=?) a join (select item_prop.ITEM_NUM from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP where item_prop_code.ITEM_PROP_CONTENT=?) b on a.ITEM_NUM = b.ITEM_NUM";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset searchZzimPropItem conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var items = [];
                    async.eachSeries(rows, function (row, callback) {
                        var item_num = row.ITEM_NUM;
                        logger.info('db_mycloset searchZzimPropItem item_num', item_num);
                        async.series([
                            function (callback) {
                                var sql = "select item.ITEM_NUM, item.ITEM_URL, item.ITEM_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from item join user on item.USER_NICKNAME = user.USER_NICKNAME and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchZzimPropItem conn.query error 1/3');
                                        callback(err);
                                    } else {
                                        logger.info('searchZzimPropItem success 1/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) cnt from good_item where ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchZzimPropItem conn.query error 2/3');
                                        callback(err);
                                    } else {
                                        logger.info('searchZzimPropItem success 2/3', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.ITEM_PROP_CONTENT from item join (select item_prop.ITEM_NUM, item_prop_code.ITEM_PROP_CONTENT from item_prop join item_prop_code on item_prop.ITEM_PROP = item_prop_code.ITEM_PROP) as p where item.ITEM_NUM = p.ITEM_NUM and item.ITEM_NUM=?";
                                conn.query(sql, item_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchZzimPropItem conn.query error 3/3');
                                        callback(err);
                                    } else {
                                        logger.info('searchZzimPropItem success 3/3', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/mycloset/pick/item/search error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/pick/item/search info");
                                var itemArr = results[0].concat(results[1]);
                                var itemInfo = merge(itemArr[0], itemArr[1]);
                                var result = {"Info": itemInfo, "ItemProp": results[2], "ItemCoordi": results[3]};
                                items.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset searchZzimPropItem error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset searchZzimPropItem success');
                            conn.release();
                            done(true, items);
                        }
                    });
                }
            });
        }
    });
}

exports.searchZzimPropCoordi = function (datas, done) {
    logger.info('db_mycloset searchZzimPropCoordi data ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.CD_NUM from (select good_coordi.CD_NUM from good_coordi where good_coordi.USER_NICKNAME=?) a join (select coordi_prop.CD_NUM from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP where coordi_prop_code.COORDI_PROP_CONTENT=?) b on a.CD_NUM = b.CD_NUM";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset searchZzimPropCoordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_mycloset searchZzimPropCoordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchZzimPropCoordi conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchZzimPropCoordi success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchZzimPropCoordi conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchZzimPropCoordi success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchZzimPropCoordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else {
                                        logger.info('searchZzimPropCoordi detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('searchZzimPropCoordi conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('searchZzimPropCoordi success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/mycloset/pick/coordi/search error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/pick/coordi/search info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset searchZzimPropCoordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset searchZzimPropCoordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}

exports.regRecentItemCoordis = function (datas, done) {
    logger.info('db_mycloset regRecentItemCoordis data ', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select a.NUM, a.URL from (select ITEM_NUM as NUM, ITEM_URL as URL, ITEM_REGDATE as REGDATE from item where ITEM_MODIFLAG=1 and USER_NICKNAME=? union select CD_NUM as NUM, CD_URL as URL, CD_REGDATE as REGDATE from coordi where USER_NICKNAME=?) a order by a.REGDATE limit 7";
            conn.query(sql, datas, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset regRecentItemCoordis conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var clothe = [];
                    async.eachSeries(rows, function (row, callback) {
                        var url = row.URL;
                        async.waterfall([
                            function (callback) {
                                var type = url.split('/')[3];
                                logger.info('db_mycloset regRecentItemCoordis type ', type);
                                callback(null, type);
                            }, function (type, callback) {
                                if (type == 'item') {
                                    var item_num = row.NUM;
                                    logger.info('db_mycloset regRecentItemCoordis item_num ', item_num);
                                    var sql = "select ITEM_NUM, ITEM_URL from item where ITEM_NUM=?";
                                    conn.query(sql, item_num, function(err, row){
                                        if(err){
                                            logger.error('db_mycloset regRecentItemCoordis error', err);
                                            callback(err);
                                        }else{
                                            logger.info('db_mycloset regRecentItemCoordis row', row);
                                            callback(null, row);
                                        }
                                    });
                                } else if (type = 'coordi') {
                                    var coordi_num = row.NUM;
                                    logger.info('db_mycloset regRecentItemCoordis coordi_num ', coordi_num);
                                    var sql = "select CD_NUM, CD_URL from coordi where CD_NUM=?";
                                    conn.query(sql, coordi_num, function(err, row){
                                        if(err){
                                            logger.error('db_mycloset regRecentItemCoordis error', err);
                                            callback(err);
                                        }else{
                                            logger.info('db_mycloset regRecentItemCoordis row', row);
                                            callback(null, row);
                                        }
                                    });
                                }
                            }
                        ], function (err, row) {
                            if(err){
                                logger.error('db_mycloset regRecentItemCoordis error ', err);
                                callback();
                            }else{
                                logger.info('db_mycloset regRecentItemCoordis success');
                                clothe.push(row);
                                callback();
                            }
                        });
                    }, function(err){
                        if(err){
                            logger.error('db_mycloset regRecentItemCoordis error', err);
                            conn.release();
                            done(false);
                        }else{
                            logger.info('db_mycloset regRecentItemCoordis success');
                            conn.release();
                            done(true, clothe);
                        }
                    });
                }
            });
        }
    });
}

exports.recentWearCoordi = function (data, done) {
    logger.info('db_mycloset recentWearCoordi data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select CD_NUM from calendar where USER_NICKNAME=? group by CD_NUM order by CAL_DATE desc";
            conn.query(sql, data, function (err, rows) {
                if (err) {
                    logger.error('db_mycloset recentWearCoordi conn.query error', err);
                    conn.release();
                    done(false);
                } else {
                    var coordis = [];
                    async.eachSeries(rows, function (row, callback) {
                        var coordi_num = row.CD_NUM;
                        logger.info('db_mycloset recentWearCoordi coordi_num', coordi_num);
                        async.series([
                            function (callback) {
                                var sql = "select coordi.CD_NUM, coordi.CD_URL, coordi.CD_DESCRIPTION, user.USER_NICKNAME, user.USER_PROFILE_URL from coordi join user on coordi.USER_NICKNAME = user.USER_NICKNAME and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('recentWearCoordi conn.query error 1/4');
                                        callback(err);
                                    } else {
                                        logger.info('recentWearCoordi success 1/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) good_cnt from good_coordi where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('recentWearCoordi conn.query error 2/4');
                                        callback(err);
                                    } else {
                                        logger.info('recentWearCoordi success 2/4', row);
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) reply_cnt from coordi_reply where CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('recentWearCoordi detail conn.query error 3/4', err);
                                        callback(err);
                                    } else {
                                        logger.info('recentWearCoordi detail success 3/4');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select p.COORDI_PROP_CONTENT from coordi join (select coordi_prop.CD_NUM, coordi_prop_code.COORDI_PROP_CONTENT from coordi_prop join coordi_prop_code on coordi_prop.COORDI_PROP = coordi_prop_code.COORDI_PROP) as p where coordi.CD_NUM = p.CD_NUM and coordi.CD_NUM=?";
                                conn.query(sql, coordi_num, function (err, row) {
                                    if (err) {
                                        logger.error('recentWearCoordi conn.query error 4/4');
                                        callback(err);
                                    } else {
                                        logger.info('recentWearCoordi success 4/4', row);
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/mycloset/coordi/wear/recent error", err);
                                done(false);
                            } else {
                                logger.info("/mycloset/coordi/wear/recent info");
                                var coordiArr = results[0].concat(results[1]).concat(results[2]);
                                var coordiInfo = merge(coordiArr[0], coordiArr[1], coordiArr[2]);
                                var result = {"Info": coordiInfo, "CoordiProp": results[3]};
                                coordis.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_mycloset recentWearCoordi error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_mycloset recentWearCoordi success');
                            conn.release();
                            done(true, coordis);
                        }
                    });
                }
            });
        }
    });
}