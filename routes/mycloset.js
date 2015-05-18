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

    db_mycloset.item(nickname, function (success, results) {
        if (success) {
            logger.info('/mycloset/item success');
            res.json({"myclosetItems": results});
        } else {
            logger.info('/mycloset/item fail');
            res.json({"Result": "fail"});
        }
    });
});


router.post('/coordi', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_mycloset.coordi(nickname, function (success, results) {
        if (success) {
            logger.info('/mycloset/coordi success');
            res.json({"myclosetCoordis": results});
        } else {
            logger.info('/mycloset/coordi fail');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/zzim/item', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_mycloset.zzimItem(nickname, function(success, items){
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

    db_mycloset.zzimCoordi(nickname, function(success, Coordis){
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
    var prop = req.body.itemProp;
    var datas = [nickname, prop];

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
    var prop = req.body.coordiProp;
    var datas = [nickname, prop];

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
    var prop = req.body.itemProp;
    var datas = [nickname, prop];

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
    var prop = req.body.coordiProp;
    var datas = [nickname, prop];

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
    res.json([
        {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "good_num": "50",
            "reply_num": "100",
            "prop1": "학교",
            "prop2": "흐림",
            "prop3": "따듯한",
            "description": "내가 제일 좋아하는 옷"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "good_num": "50",
            "reply_num": "100",
            "prop1": "학교",
            "prop2": "흐림",
            "prop3": "따듯한",
            "description": "내가 제일 좋아하는 옷"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "good_num": "50",
            "reply_num": "100",
            "prop1": "학교",
            "prop2": "흐림",
            "prop3": "따듯한",
            "description": "내가 제일 좋아하는 옷"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "good_num": "50",
            "reply_num": "100",
            "prop1": "학교",
            "prop2": "흐림",
            "prop3": "따듯한",
            "description": "내가 제일 좋아하는 옷"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "good_num": "50",
            "reply_num": "100",
            "prop1": "학교",
            "prop2": "흐림",
            "prop3": "따듯한",
            "description": "내가 제일 좋아하는 옷"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "good_num": "50",
            "reply_num": "100",
            "prop1": "학교",
            "prop2": "흐림",
            "prop3": "따듯한",
            "description": "내가 제일 좋아하는 옷"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "good_num": "50",
            "reply_num": "100",
            "prop1": "학교",
            "prop2": "흐림",
            "prop3": "따듯한",
            "description": "내가 제일 좋아하는 옷"
        }
    ]);
});

module.exports = router;