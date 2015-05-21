var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');

exports.add = function (datas, done) {
    logger.info('datas', datas);
    var filePath = datas[0];
    var nickname = datas[1];
    var contents = "회원님의 아이템 보정이 완료되었습니다.";

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        } else {
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
                }, function(callback){
                    var sql = "select ITEM_URL from item where USER_NICKNAME=? and ITEM_URL=?";
                    conn.query(sql, [nickname, filePath] , function(err, row){
                        if(err){
                            callback(err);
                        }else{
                            callback(null, row[0].ITEM_URL);
                        }
                    });
                },function (item_url, callback) {
                    var sql = "insert into alarm(ALARM_FLAG, USER_NICKNAME, ALARM_CONTENTS, ALARM_REGDATE, IMG_URL) values(1,?,?,now(),?)";
                    conn.query(sql, [nickname, contents, item_url], function (err, row) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, true);
                        }
                    });
                }
            ], function (err, success) {
                if (err) {
                    logger.error('db_admin add error', err);
                    conn.release();
                    done(false);
                } else {
                    var sql = "select USER_PUSHKEY from user where USER_NICKNAME=?";
                    conn.query(sql, nickname, function (err, row) {
                        if (err) {
                            logger.error('db_admin add error', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_admin add success', row[0].USER_PUSHKEY);
                            conn.release();
                            done(true, contents, row[0].USER_PUSHKEY);
                        }
                    });
                }
            });
        }
    });
}