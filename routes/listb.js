var express = require('express');
var router = express.Router();

router.post('/follow', function (req, res, next) {
    res.json([{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    }
    ]);
});

router.post('/following', function (req, res, next) {
    res.json([{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    },{
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "item_num":"30",
        "coordi_num":"100"
    }
    ]);
});

router.post('/coordi/hot', function (req, res, next) {
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

router.post('/coordi/hot/grid_2', function (req, res, next) {
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

router.post('/user/hot', function (req, res, next) {
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

router.post('/user/hot/detail', function (req, res, next) {
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