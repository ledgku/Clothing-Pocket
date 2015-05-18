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
            var year = datas[1];
            var month = datas[2];

            var yearMonth = year+'-'+month;
            logger.info('aaaaaaaaaaa', yearMonth);
        }
    });
}