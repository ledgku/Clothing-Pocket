var express = require('express');
var router = express.Router();
var logger = require('../logger');
var multer = require('multer');
var merge = require('merge');
var db_closet = require('../models/db_closet.js');

router.post('/info', function(req, res, next) {
    logger.info('req.body', req.body);
    var nickname = req.body.nickname;

    db_closet.info(nickname, function (success, results) {
        if (success) {
            logger.info('/closet/info results', results);
            var clotheDatas = results[1].concat(results[2]);
            var clotheNum = merge(clotheDatas[0], clotheDatas[1]);
            var followDatas = results[3].concat(results[4]);
            var followNum = merge(followDatas[0], followDatas[1]);
            res.json({"userInfo": results[0], "clotheNum": clotheNum, "followNum": followNum});
        } else {
            logger.info('/closet/info fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/coordi', function(req, res, next) {
    logger.info('req.body', req.body);
    var nickname = req.body.nickname;

    db_closet.coordi(nickname, function (success, results) {
        if (success) {
            logger.info('/closet/coordi success');
            res.json({"closetCoordis": results});
        } else {
            logger.info('/closet/coordi fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/pick/coordi', function(req, res, next) {
    logger.info('req.body', req.body);
    var nickname = req.body.nickname;

    db_closet.pickCoordi(nickname, function(success, Coordis){
        if(success){
            if (success) {
                logger.info('/mycloset/pick/coordi success');
                res.json({"closetPickItems": Coordis});
            } else {
                logger.info('/mycloset/pick/coordi fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/coordi/search', function(req, res, next) {
    logger.info('req.body', req.body);
    var nickname = req.body.nickname;
    var prop = req.body.coordiProp;
    var datas = [nickname, prop];

    db_closet.searchPropCoordi(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/coordi/search success');
                res.json({"searchPropCoordis": coordis});
            } else {
                logger.info('/closet/coordi/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/pick/coordi/search', function(req, res, next) {
    logger.info('req.body', req.body);
    var nickname = req.body.nickname;
    var prop = req.body.coordiProp;
    var datas = [nickname, prop];

    db_closet.searchPickPropCoordi(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/pick/coordi/search success');
                res.json({"searchPropPickCoordis": coordis});
            } else {
                logger.info('/closet/pick/coordi/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

module.exports = router;