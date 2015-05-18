var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');

exports.follow = function (datas, done) {
    logger.info('datas', datas);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
            async.waterfall([
                function (callback) {
                    var sql = "select count(*) cnt from follow where USER_NICKNAME=? and USER_NICKNAME2=?";
                    conn.query(sql, datas, function (err, row) {
                        if (err) {
                            callback(err, 'db_follow good conn.query error');
                        } else {
                            callback(null, row[0].cnt);
                        }
                    })
                }, function (cnt, callback) {
                    if (cnt == 1) {
                        //삭제
                        var sql = "delete from follow where USER_NICKNAME=? and USER_NICKNAME2=?";
                        conn.query(sql, datas, function (err, row) {
                            if (err) {
                                callback(err, "db_follow DeleteError");
                            } else {
                                callback(null, "ok");
                            }
                        });
                    } else {
                        //입력
                        var sql = "insert into follow(USER_NICKNAME, USER_NICKNAME2) values(?,?)";
                        conn.query(sql, datas, function (err, row) {
                            if (err) {
                                callback(err, "db_follow InsertError");
                            } else {
                                callback(null, "ok");
                            }
                        });
                    }
                }
            ], function (err, Msg) {
                if (Msg == "ok") {
                    logger.info("follow change success");
                    conn.release();
                    done(true);
                } else {
                    logger.error('err ', Msg);
                    conn.release();
                    done(false);
                }
            });
        }
    });
}