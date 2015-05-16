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
    res.json([{
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    }, {
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    }, {
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    }, {
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    }, {
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    }, {
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    }, {
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    }
    ]);
});

router.post('/zzim/coordi', function (req, res, next) {
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

router.post('/item/search', function (req, res, next) {
    res.json([
        {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }
    ]);
});

router.post('/coordi/search', function (req, res, next) {
    res.json([
        {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }
    ]);
});

router.post('/pick/item/search', function (req, res, next) {
    res.json([
        {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }
    ]);
});

router.post('/pick/coordi/search', function (req, res, next) {
    res.json([
        {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }
    ]);
});

router.post('/coordi/wear/recent', function (req, res, next) {
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

router.post('/both/reg/recent', function (req, res, next) {
    res.json([
        {
            "img_url": "http://52.68.143.198:3000/item/img/shirts",
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
            "img_url": "http://52.68.143.198:3000/item/img/shirts",
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
            "img_url": "http://52.68.143.198:3000/item/img/shirts",
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