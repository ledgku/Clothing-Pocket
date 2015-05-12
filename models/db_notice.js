var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');
var async = require('async');

exports.notice = function (done) {
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('/notice getConnection err', err);
            done(fail, null);
        } else {
            var sql = "select * from notice";
            conn.query(sql, [], function (err, rows) {
                if (err) {
                    logger.error('/notice conn.query err', err);
                    done(fail, null);
                } else {
                    logger.info('rows ', rows);
                    conn.release();
                    done(true, rows);
                }
            });
        }
    });
}

exports.faq = function (done) {
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('/faq getConnection err', err);
            done(fail, null);
        } else {
            var sql = "select * from faq";
            conn.query(sql, [], function (err, rows) {
                if (err) {
                    logger.error('/notice/faq conn.query err', err);
                    done(fail, null);
                } else {
                    logger.info('rows ', rows);
                    conn.release();
                    done(true, rows);
                }
            });
        }
    });
}

exports.service = function (done) {
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('/notice/service getConnection err', err);
            done(fail, null);
        } else {
            var sql = "select CT_SERVICE from contract";
            conn.query(sql, [], function (err, rows) {
                if (err) {
                    logger.error('/notice/service conn.query err', err);
                    done(fail, null);
                } else {
                    logger.info('rows ', rows);
                    conn.release();
                    done(true, rows);
                }
            });
        }
    });
}

exports.private = function (done) {
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('/notice/private getConnection err', err);
            done(fail, null);
        } else {
            var sql = "select CT_PRIVATE from contract";
            conn.query(sql, [], function (err, rows) {
                if (err) {
                    logger.error('/notice/private conn.query err', err);
                    done(fail, null);
                } else {
                    logger.info('rows ', rows);
                    conn.release();
                    done(true, rows);
                }
            });
        }
    });
}