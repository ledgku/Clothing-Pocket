var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var graph = require('fbgraph');
var logger = require('../logger');

//일반 회원 가입, USER_JOINPATH(0)
exports.join = function (datas, done) {
    pool.getConnection(function (err, conn) {
        if (err) done(2, false);

        var nickname = datas[0];
        var id = datas[1];
        var sql = "select count(*) cnt from user where USER_NICKNAME=?";

        //닉네임 중복 체크
        conn.query(sql, nickname, function (err, row) {
            if (err) {
                conn.release();
                done(3, false);
            }
            logger.info(row);
            if (row[0].cnt != 0) {
                conn.release();
                done(1, false);
            } else {
                //아이디 중복 체크
                var sql = "select count(*) cnt from user where USER_ID=?";
                conn.query(sql, id, function (err, row) {
                    if (err) {
                        conn.release();
                        done(2, false);
                    }
                    logger.info(row);
                    if (row[0].cnt != 0) {
                        conn.release();
                        done(0, false);
                    } else {
                        //회원 가입
                        var sql = "insert into user(USER_NICKNAME, USER_JOINPATH, USER_ID, USER_PASSWORD, USER_JOINDATE, USER_LASTLOGIN, USER_GENDER) values(?,0,?,?,now(),now(),?)";
                        conn.query(sql, datas, function (err, row) {
                            if (err){
                                conn.release();
                                done(3, false);
                            }
                            logger.info('row', row);
                            var success = false;
                            if (row.affectedRows == 1) {
                                success = true;
                            }
                            conn.release();
                            done(0, success);
                        });
                    }
                });
            }
        });
    });
};

//페이스북 회원 가입, USER_JOINPATH(1)
exports.fbjoin = function (datas, done) {
    logger.info('datas ', datas);
    var nickname = datas[0];
    var access_token = datas[1];
    var gender = 0;
    var join_path = 1;
    //accesstoken 설정
    graph.setAccessToken(access_token);

    graph.get("me", function (err, res) {
        if (err) {
            logger.error('graph.get error ', err);
            done(0, false);
        }
        //성별 체크
        if (res.gender != 'male') {
            gender = 1;
        }
        var id = res.id;
        var datas = [nickname, join_path, id, gender];
        logger.info('fbjoin datas ', datas);
        pool.getConnection(function (err, conn) {
            if (err) {
                logger.error('getConnection error', err);
                done(1, false);
            } else {
                //닉네임 중복 검사
                var sql = "select count(*) cnt from user where USER_NICKNAME=?";
                conn.query(sql, nickname, function (err, row) {
                    if (err) {
                        done(4, false);
                        conn.release();
                        logger.error('fbjoin conn.query error', err);
                    }
                    logger.info(row);
                    if (row[0].cnt != 0) {
                        conn.release();
                        done(3, false);
                    } else {
                        //페이스북 아이디 중복 검사
                        var id = res.id;
                        var sql = "select count(*) cnt from user where USER_FACEBOOK=?";
                        conn.query(sql, id, function (err, row) {
                            if (err) {
                                done(4, false);
                                conn.release();
                                logger.error('fbjoin conn.query error', err);
                            }
                            logger.info(row);
                            if (row[0].cnt != 0) {
                                conn.release();
                                done(2, false);
                            } else {
                                //회원 가입
                                var sql = "insert into user(USER_NICKNAME, USER_JOINPATH, USER_FACEBOOK, USER_JOINDATE, USER_LASTLOGIN, USER_GENDER) values(?,?,?,now(),now(),?)";
                                conn.query(sql, datas, function (err, row) {
                                    if (err) logger.error('fbjoin conn.query error', err);
                                    logger.info('row', row);
                                    var success = false;
                                    if (row.affectedRows == 1) {
                                        success = true;
                                    }
                                    conn.release();
                                    done(0, success);
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}
