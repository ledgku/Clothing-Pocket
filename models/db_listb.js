var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');
var merge = require('merge');

exports.followingList = function (data, done) {
    logger.info('data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select user.USER_NICKNAME from user join (select USER_NICKNAME from follow where USER_NICKNAME2=?) a on user.USER_NICKNAME = a.USER_NICKNAME";
            conn.query(sql, data, function(err, rows){
                if(err){
                    logger.error('db_listb following conn.query error', err);
                    conn.release();
                    done(false);
                }else{
                    var users = [];
                    async.eachSeries(rows, function(row, callback){
                        var nickname = row.USER_NICKNAME;
                        logger.info('db_listb following nickname', nickname);
                        async.series([
                            function (callback) {
                                var sql = "select user.USER_NICKNAME, user.USER_PROFILE_URL from user where user.USER_NICKNAME=?";
                                conn.query(sql, nickname, function (err, row) {
                                    if (err) {
                                        logger.error('db_listb following 1/3 error', err);
                                        callback(err);
                                    } else {
                                        logger.info('db_listb following 1/3 success');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) item_cnt from item where item.USER_NICKNAME=?";
                                conn.query(sql, nickname, function (err, row) {
                                    if (err) {
                                        logger.error('db_listb following 2/3 error', err);
                                        callback(err);
                                    } else {
                                        logger.info('db_listb following 2/3 success');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) coordi_cnt from coordi where coordi.USER_NICKNAME=?";
                                conn.query(sql, nickname, function (err, row) {
                                    if (err) {
                                        logger.error('db_listb following 3/3 error', err);
                                        callback(err);
                                    } else {
                                        logger.info('db_listb following 3/3 success');
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/listb/following error", err);
                                done(false);
                            } else {
                                logger.info("/listb/following info", results);
                                var usersArr = results[0].concat(results[1]).concat(results[2]);
                                var usersInfo = merge(usersArr[0], usersArr[1], usersArr[2]);
                                var result = {"Info": usersInfo};
                                users.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_listb following error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_listb following success');
                            conn.release();
                            done(true, users);
                        }
                    });
                }
            });
        }
    });
}

exports.followerList = function (data, done) {
    logger.info('data ', data);

    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select user.USER_NICKNAME from user join (select USER_NICKNAME2 from follow where USER_NICKNAME=?) a on user.USER_NICKNAME = a.USER_NICKNAME2";
            conn.query(sql, data, function(err, rows){
                if(err){
                    logger.error('db_listb follower conn.query error', err);
                    conn.release();
                    done(false);
                }else{
                    var users = [];
                    async.eachSeries(rows, function(row, callback){
                        var nickname = row.USER_NICKNAME;
                        logger.info('db_listb follower nickname', nickname);
                        async.series([
                            function (callback) {
                                var sql = "select user.USER_NICKNAME, user.USER_PROFILE_URL from user where user.USER_NICKNAME=?";
                                conn.query(sql, nickname, function (err, row) {
                                    if (err) {
                                        logger.error('db_listb follower 1/3 error', err);
                                        callback(err);
                                    } else {
                                        logger.info('db_listb follower 1/3 success');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) item_cnt from item where item.USER_NICKNAME=?";
                                conn.query(sql, nickname, function (err, row) {
                                    if (err) {
                                        logger.error('db_listb follower 2/3 error', err);
                                        callback(err);
                                    } else {
                                        logger.info('db_listb follower 2/3 success');
                                        callback(null, row);
                                    }
                                });
                            }, function (callback) {
                                var sql = "select count(*) coordi_cnt from coordi where coordi.USER_NICKNAME=?";
                                conn.query(sql, nickname, function (err, row) {
                                    if (err) {
                                        logger.error('db_listb follower 3/3 error', err);
                                        callback(err);
                                    } else {
                                        logger.info('db_listb follower 3/3 success');
                                        callback(null, row);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                logger.error("/listb/follower error", err);
                                done(false);
                            } else {
                                logger.info("/listb/follower info", results);
                                var usersArr = results[0].concat(results[1]).concat(results[2]);
                                var usersInfo = merge(usersArr[0], usersArr[1], usersArr[2]);
                                var result = {"Info": usersInfo};
                                users.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_listb follower error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_listb follower success');
                            conn.release();
                            done(true, users);
                        }
                    });
                }
            });
        }
    });
}

exports.hotUser = function (done) {
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            var sql = "select user.USER_NICKNAME from user join (select USER_NICKNAME from follow) a on user.USER_NICKNAME = a.USER_NICKNAME group by USER_NICKNAME order by count(*) desc;";
            conn.query(sql, [], function(err, rows){
                if(err){
                    logger.error('db_listb hotUser conn.query error', err);
                    conn.release();
                    done(false);
                }else{
                    var users = [];
                    async.eachSeries(rows, function(row, callback){
                        var nickname = row.USER_NICKNAME;
                        logger.info('db_listb hotUser nickname', nickname);

                        var sql = "select user.USER_NICKNAME, user.USER_PROFILE_URL from user where user.USER_NICKNAME=?";
                        conn.query(sql, nickname, function (err, row) {
                            if (err) {
                                logger.error("/listb/user/hot error", err);
                                done(false);
                            } else {
                                logger.info("/listb/user/hot info", row);
                                var result = {"Info": row};
                                users.push(result);
                                callback();
                            }
                        });
                    }, function (err) {
                        if (err) {
                            logger.error('db_listb hotUser error ', err);
                            conn.release();
                            done(false);
                        } else {
                            logger.info('db_listb hotUser success');
                            conn.release();
                            done(true, users);
                        }
                    });
                }
            });
        }
    });
}