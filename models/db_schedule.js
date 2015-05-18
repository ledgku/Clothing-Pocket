var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');
var merge = require('merge');

exports.scheduleCoordi = function (datas, done) {
    logger.info('db_schedule scheduleCoordi datas ', datas);
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select CAL_DATE, CD_NUM from calendar where USER_NICKNAME=? and CAL_DATE like ?";
            conn.query(sql, datas, function(err, rows){
                if(err){
                    logger.error('db_schedule scheduleCoordi error ', err);
                    done(false);
                }else{
                    logger.info('db_schedule scheduleCoordi success');
                    done(true, rows);
                }
            });
        }
    });
}

exports.scheduleCoordiReg = function (datas, done) {
    logger.info('db_schedule scheduleCoordiReg datas ', datas);
    var nickname = datas[0];
    var date = datas[1];
    var coordi_num = datas[2];

    pool.getConnection(function(err, conn){
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            async.waterfall([
                function(callback){
                    var sql = "select count(*) cnt from calendar where CAL_DATE=? and USER_NICKNAME=?";
                    conn.query(sql, [date, nickname], function(err, row){
                       if(err){
                           callback(err);
                       }else{
                           logger.info('db_schedule scheduleCoordiReg cnt ', row[0].cnt);
                           callback(null, row[0].cnt);
                       }
                    });
                }, function(cnt, callback){
                    if(cnt==1){
                        var sql = "update calendar set CD_NUM=?, CAL_REGDATE=now() where CAL_DATE=?";
                        conn.query(sql, [coordi_num, date], function(err, row){
                           if(err){
                               callback(err);
                           } else{
                               logger.info('db_schedule scheduleCoordiReg update success');
                               callback(null);
                           }
                        });
                    }else if(cnt==0){
                        var sql = "insert into calendar(CAL_DATE, USER_NICKNAME, CD_NUM, CAL_REGDATE) values(?,?,?,now())";
                        conn.query(sql, [date, nickname, coordi_num], function(err, row){
                           if(err){
                               callback(err);
                           } else{
                               logger.info('db_schedule scheduleCoordiReg insert success');
                               callback(null);
                           }
                        });
                    }
                }
            ],function(err){
                if(err){
                    logger.error('db_schedule scheduleCoordiReg error', err);
                    conn.release();
                    done(false);
                }else{
                    logger.info('db_schedule scheduleCoordiReg success');
                    conn.release();
                    done(true);
                }
            });
        }
    });
}

exports.scheduleCoordiDel = function (datas, done) {
    logger.info('db_schedule scheduleCoordiDel datas ', datas);

    pool.getConnection(function(err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "delete from calendar where USER_NICKNAME=? and CAL_DATE=?";
            conn.query(sql, datas, function (err, row) {
                if (err) {
                    logger.error('getConnection error', err);
                    done(false);
                } else {
                    if (row.affectedRows == 1) {
                        logger.info('db_schedule scheduleCoordiDel success');
                        conn.release();
                        done(true);
                    } else {
                        logger.info('db_schedule scheduleCoordiDel fail');
                        conn.release();
                        done(false);
                    }
                }
            });
        }
    });
}