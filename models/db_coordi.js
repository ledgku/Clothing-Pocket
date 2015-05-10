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
                }
                conn.release();
                done(0, success);
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
        }
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
    });
}