var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');

exports.add = function (data, done) {
    logger.info('data', data);
    var filePath = data;
    var contents = "회원님의 아이템 보정이 완료되었습니다.";

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            conn.beginTransaction(function (err) {
                async.waterfall([
                    function (callback) {
                        var sql = "update item set ITEM_MODIFLAG=1, ITEM_MODIDATE=now() where ITEM_URL=?";
                        conn.query(sql, filePath, function (err, row) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    }, function (callback) {
                        var sql = "select ITEM_URL, USER_NICKNAME from item where ITEM_URL=?";
                        conn.query(sql, filePath, function (err, row) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, row[0].ITEM_URL, row[0].USER_NICKNAME);
                            }
                        });
                    }, function (item_url, nickname, callback) {
                        var sql = "insert into alarm(ALARM_FLAG, USER_NICKNAME, ALARM_CONTENTS, ALARM_REGDATE, IMG_URL) values(1,?,?,now(),?)";
                        conn.query(sql, [nickname, contents, item_url], function (err, row) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, true, nickname);
                            }
                        });
                    }
                ], function (err, success, nickname) {
                    if (err) {
                        logger.error('db_admin add error', err);
                        conn.rollback(function(err){
                            if(err){
                                logger.error('rollback error');
                                conn.release();
                                done(false);
                            }else{
                                logger.error('rollback complete');
                                conn.release();
                                done(false);
                            }
                        });
                    } else {
                        var sql = "select USER_PUSHKEY, USER_ALARM_FLAG from user where USER_NICKNAME=?";
                        conn.query(sql, nickname, function (err, row) {
                            if (err) {
                                conn.rollback(function (err) {
                                    logger.error('db_admin add error', err);
                                    conn.release();
                                    done(false);
                                });
                            } else {
                                conn.commit(function(err){
                                    logger.info('db_admin add success', row[0].USER_PUSHKEY);
                                    conn.release();
                                    if (row[0].USER_ALARM_FLAG == 1) {
                                        done(true, 1, contents, row[0].USER_PUSHKEY);
                                    } else {
                                        done(true, 0);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
}