var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');

//아이템 등록
exports.add = function (datas, done) {
    logger.info('datas ', datas);
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        }
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
        }
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
    });
}
