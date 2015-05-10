var express = require('express');
var router = express.Router();

router.post('/closet/good', function(req, res, next) {
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

router.post('/closet/good/grid_2', function (req, res, next) {
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

router.post('/closet/recent', function(req, res, next) {
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

router.post('/closet/recent/grid_2', function (req, res, next) {
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

router.post('/closet/follow', function(req, res, next) {
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

router.post('/closet/follow/grid_2', function (req, res, next) {
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

router.post('/closet/good/search', function(req, res, next) {
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

router.post('/closet/recent/search', function(req, res, next) {
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

router.post('/closet/follow/search', function(req, res, next) {
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

module.exports = router;