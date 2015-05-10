var express = require('express');
var router = express.Router();

router.post('/item', function (req, res, next) {
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
    }]);
});

router.post('/item/grid_2', function (req, res, next) {
    res.json([{
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

router.post('/item/grid_4', function (req, res, next) {
    res.json([{
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

router.post('/coordi', function (req, res, next) {
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

router.post('/coordi/grid_2', function (req, res, next) {
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
    },{
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    },{
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    },{
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    },{
        "img_url": "http://52.68.143.198:3000/item/img/shirts",
        "profile_url": "http://52.68.143.198:3000/user/img/profile",
        "nickname": "tester",
        "good_num": "50",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    },{
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

router.post('/zzim/item/grid_2', function (req, res, next) {
    res.json([{
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

router.post('/zzim/item/grid_4', function (req, res, next) {
    res.json([{
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

router.post('/zzim/coordi/grid_2', function (req, res, next) {
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

router.post('/coordi/wear/recent/grid_2', function (req, res, next) {
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

router.post('/both/reg/recent/grid_2', function (req, res, next) {
    res.json([
        {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/item/img/shirts"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
        }, {
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi"
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

router.post('/coordi/today/grid_2', function (req, res, next) {
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