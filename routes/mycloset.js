var express = require('express');
var router = express.Router();
var logger = require('../logger');
var multer = require('multer');
var merge = require('merge');
var db_mycloset = require('../models/db_mycloset.js');

router.post('/info', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_mycloset.info(nickname, function (success, results) {
        if (success) {
            logger.info('/mycloset/info results', results);
            var clotheDatas = results[1].concat(results[2]);
            var clotheNum = merge(clotheDatas[0], clotheDatas[1]);
            var followDatas = results[3].concat(results[4]);
            var followNum = merge(followDatas[0], followDatas[1]);
            res.json({"userInfo": results[0], "clotheNum": clotheNum, "followNum": followNum});
        } else {
            logger.info('/mycloset/info fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/item', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var datas = [nickname, page_num];

    db_mycloset.item(datas, function (success, items) {
        if (success) {
            logger.info('/mycloset/item success');
            res.json({"myclosetItems": items});
        } else {
            logger.info('/mycloset/item fail');
            res.json({"Result": "fail"});
        }
    });
});


router.post('/coordi', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var datas = [nickname, page_num];

    db_mycloset.coordi(datas, function (success, coordis) {
        if (success) {
            logger.info('/mycloset/coordi success');
            res.json({"myclosetCoordis": coordis});
        } else {
            logger.info('/mycloset/coordi fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/zzim/item', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var datas = [nickname, page_num];

    db_mycloset.zzimItem(datas, function(success, items){
        if(success){
            if (success) {
                logger.info('/mycloset/zzim/item success');
                res.json({"myclosetZzimItems": items});
            } else {
                logger.info('/mycloset/zzim/item fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/zzim/coordi', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var datas = [nickname, page_num];

    db_mycloset.zzimCoordi(datas, function(success, Coordis){
        if(success){
            if (success) {
                logger.info('/mycloset/zzim/coordi success');
                res.json({"myclosetZzimItems": Coordis});
            } else {
                logger.info('/mycloset/zzim/coordi fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/item/search', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var prop = req.body.itemProp;
    var datas = [nickname, page_num, prop];

    db_mycloset.searchPropItem(datas, function(success, items){
        if(success){
            if (success) {
                logger.info('/mycloset/item/search success');
                res.json({"searchPropItems": items});
            } else {
                logger.info('/mycloset/item/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/coordi/search', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var prop = req.body.coordiProp;
    var datas = [nickname, page_num, prop];

    db_mycloset.searchPropCoordi(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/mycloset/coordi/search success');
                res.json({"searchPropCoordis": coordis});
            } else {
                logger.info('/mycloset/coordi/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/pick/item/search', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var prop = req.body.itemProp;
    var datas = [nickname, page_num, prop];

    db_mycloset.searchZzimPropItem(datas, function(success, items){
        if(success){
            if (success) {
                logger.info('/mycloset/pick/item/search success');
                res.json({"searchPropZzimItems": items});
            } else {
                logger.info('/mycloset//pick/item/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/pick/coordi/search', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var page_num = req.body.pageNum;
    var prop = req.body.coordiProp;
    var datas = [nickname, page_num, prop];

    db_mycloset.searchZzimPropCoordi(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/mycloset/pick/coordi/search success');
                res.json({"searchPropZzimCoordis": coordis});
            } else {
                logger.info('/mycloset/pick/coordi/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/coordi/wear/recent', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_mycloset.recentWearCoordi(nickname, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/mycloset/coordi/wear/recent success');
                res.json({"recentWearCoordis": coordis});
            } else {
                logger.info('/mycloset/coordi/wear/recent fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/both/reg/recent', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;
    var datas = [nickname, nickname];

    db_mycloset.regRecentItemCoordis(datas, function(success, datas){
        if(success){
            if (success) {
                logger.info('/mycloset/both/reg/recent');
                res.json({"regRecentItemCoordis": datas});
            } else {
                logger.info('/mycloset/both/reg/recent fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/coordi/today', function (req, res, next) {
    logger.info('req.body.datas ', req.body.datas);
    logger.info('req.session.nickname', req.session.nickname);

    var nickname = req.session.nickname;
    var datas = JSON.parse(req.body.datas).weather.hourly[0];
    var windSpeed = datas.wind.wspd * 3.6;
    var weatherCode = datas.sky.code.substring(5,7);
    var temperature = (datas.temperature.tmax-datas.temperature.tmin)/2;
    var feelTemp = 13.12+0.6215*temperature-11.37*Math.pow(windSpeed, 0.16)+0.3965*Math.pow(windSpeed, 0.16)*temperature;
    var datas = [];

    async.series([
        function(callback){
            if(feelTemp>30){
                callback(null, 'ctp0');
            }else if(feelTemp>20){
                callback(null, 'ctp1');
            }else if(feelTemp>10){
                callback(null, 'ctp2');
            }else{
                callback(null, 'ctp3');
            }
        }, function(callback){
            if(weatherCode=='01' || weatherCode=='02' || weatherCode=='03'){
                callback(null, 'cwp0');
            }else if(weatherCode=='07' || weatherCode=='11'){
                callback(null, 'cwp1');
            }else if(weatherCode=='04' || weatherCode=='06' || weatherCode=='08' || weatherCode=='10' || weatherCode=='12' || weatherCode=='14'){
                callback(null, 'cwp2');
            }else{
                callback(null, 'cwp3');
            }
        }
    ], function(err, result){
        if(err){
            logger.error('/mycloset/coordi/today error', err);
            res.json({"Result":"fail"});
        }else{
            logger.info('/mycloset/coordi/today success');
            datas=[nickname, result[0], result[1]];
        }
    });

    db_mycloset.todaysCoordi(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/mycloset/coordi/today success');
                res.json({"todaysCoordis": coordis});
            } else {
                logger.info('/mycloset/coordi/today fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

module.exports = router;