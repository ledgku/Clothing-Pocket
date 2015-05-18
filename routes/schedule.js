var express = require('express');
var router = express.Router();
var logger = require('../logger');
var db_schedule = require('../models/db_schedule.js');

router.post('/coordi', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body', req.body);

    var nickname = req.session.nickname;
    var year = req.body.year;
    var month = req.body.month;
    var date = year + '-' + month + '-%';
    var datas = [nickname, date];

    db_schedule.scheduleCoordi(datas, function(success, schedule){
       if(success){
           logger.info('/schedule/coordi success');
           res.json({"schedule":schedule});
       }else{
           logger.info('/schedule/coordi fail');
           res.json({"Result":"fail"});
       }
    });
});

router.post('/coordi/reg', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body', req.body);

    var nickname = req.session.nickname;
    var year = req.body.year;
    var month = req.body.month;
    var day = req.body.day;
    var coordi_num = req.body.coordiNum;
    var date = year + '-' + month + '-' + day;
    var datas = [nickname, date, coordi_num];

    db_schedule.scheduleCoordiReg(datas, function(success){
        if(success){
            logger.info('/schedule/coordi/reg success');
            res.json({"Result":"ok"});
        }else{
            logger.info('/schedule/coordi/reg fail');
            res.json({"Result":"fail"});
        }
    });
});

router.post('/coordi/del', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body', req.body);

    var nickname = req.session.nickname;
    var year = req.body.year;
    var month = req.body.month;
    var day = req.body.day;
    var date = year + '-' + month + '-' + day;
    var datas = [nickname, date];

    db_schedule.scheduleCoordiDel(datas, function(success){
        if(success){
            logger.info('/schedule/coordi/del success');
            res.json({"Result":"ok"});
        }else{
            logger.info('/schedule/coordi/del fail');
            res.json({"Result":"fail"});
        }
    });
});

module.exports = router;