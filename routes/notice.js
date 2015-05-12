var express = require('express');
var router = express.Router();
var logger = require('../logger');
var db_notice = require('../models/db_notice.js');

router.post('/', function(req, res, next) {
    db_notice.notice(function(success, datas){
        if(success){
            logger.info('/notice ok', datas);
            res.json({"Result": datas});
        }else{
            logger.error('/notice fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/service', function(req, res, next) {
    db_notice.service(function(success, datas){
        if(success){
            logger.info('/service ok', datas);
            res.json({"Result": datas});
        }else{
            logger.error('/service fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/private', function(req, res, next) {
    db_notice.private(function(success, datas){
        if(success){
            logger.info('/private ok', datas);
            res.json({"Result": datas});
        }else{
            logger.error('/private fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/faq', function(req, res, next) {
    db_notice.faq(function(success, datas){
        if(success){
            logger.info('/faq ok', datas);
            res.json({"Result": datas});
        }else{
            logger.error('/faq fail');
            res.json({"Result": "fail"});
        }
    });
});

module.exports = router;