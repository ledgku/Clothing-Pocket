var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');

exports.follow = function (datas, done) {
    logger.info('datas', datas);
    var contents = datas[1] + '님이 회원님을 팔로우 했습니다.';

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            async.waterfall([
                function (callback) {
                    var sql = "select count(*) cnt from follow where USER_NICKNAME=? and USER_NICKNAME2=?";
                    conn.query(sql, datas, function (err, row) {
                        if (err) {
                            callback(err);
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
                                callback(err);
                            } else {
                                callback(null, "down");
                            }
                        });
                    } else {
                        //입력
                        var sql = "insert into follow(USER_NICKNAME, USER_NICKNAME2) values(?,?)";
                        conn.query(sql, datas, function (err, row) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, "up");
                            }
                        });
                    }
                }
            ], function (err, stat) {
                if(err){
                    logger.error('db_follow follow error', err);
                    conn.release();
                    done(false);
                }else{
                    if(stat=="up"){
                        var sql = "select USER_PROFILE_URL from user where USER_NICKNAME=?";
                        conn.query(sql, datas[1], function(err, row){
                           if(err){
                               logger.error('db_follow follow error', err);
                               conn.release();
                               done(false);
                           }else{
                               var user_profile_url = row[0].USER_PROFILE_URL;
                               var sql = "insert into alarm(ALARM_FLAG, USER_NICKNAME, ALARM_CONTENTS, ALARM_REGDATE, USER_PROFILE_URL) values(4,?,?,now(),?)";
                               conn.query(sql, [datas[0], contents, user_profile_url], function(err, row){
                                  if(err){
                                      logger.error('db_follow follow error', err);
                                      conn.release();
                                      done(false);
                                  }else{
                                      var sql = "select USER_PUSHKEY from user where USER_NICKNAME=?";
                                      conn.query(sql, datas[0], function(err, row){
                                         if(err){
                                             logger.error('db_follow follow error', err);
                                             conn.release();
                                             done(false);
                                         }else{
                                             logger.info('db_follow follow success', row);
                                             conn.release();
                                             done(true, contents, stat, row[0].USER_PUSHKEY);
                                         }
                                      });
                                  }
                               });
                           }
                        });
                    }else{
                        done(true, contents, stat);
                    }
                }
            });
        }
    });
}