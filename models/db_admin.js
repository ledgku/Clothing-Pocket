var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);
var logger = require('../logger');

exports.add = function (data, done) {
    logger.info('data', data);
    var filePath = data;
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(0, false);
        }
        var sql = "update item set ITEM_MODIFLAG = 1 where ITEM_URL = ?";
        conn.query(sql, filePath, function (err, row) {
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