var express = require('express');
var router = express.Router();

router.post('/coordi', function(req, res, next) {
    res.json({
        "year":"2015",
        "month":"5",
        "day":"3",
        "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
        "good_num": "50",
        "reply_num": "23",
        "prop1": "학교",
        "prop2": "흐림",
        "prop3": "따듯한",
        "description": "내가 제일 좋아하는 옷"
    });
});

router.post('/coordi/reg', function(req, res, next) {
    res.json({"success":"ok"});
});

router.post('/coordi/del', function(req, res, next) {
    res.json({"success":"ok"});
});

module.exports = router;