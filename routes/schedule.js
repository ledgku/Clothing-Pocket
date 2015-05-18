var express = require('express');
var router = express.Router();
var logger = require('../logger');
var db_schedule = require('../models/db_schedule.js');

router.post('/coordi', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body', req.body);

    var nickname = req.session.nickname;
    var year = req.body.year;
    var month = req.body.month-1;
    var datas = [nickname, year, month];

    db_schedule.scheduleCoordi(datas, function(success, schedule){
       if(success){
           logger.info('/schedule/coordi success');
           res.json({"schedule":schedule});
       }else{
           logger.info('/schedule/coordi success');
           res.json({"Result":"fail"});
       }
    });
});

router.post('/coordi/reg', function(req, res, next) {
    res.json({"success":"ok"});
});

router.post('/coordi/del', function(req, res, next) {
    res.json({"success":"ok"});
});

module.exports = router;