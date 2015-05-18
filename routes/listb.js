var express = require('express');
var router = express.Router();
var logger = require('../logger');
var db_listb = require('../models/db_listb.js');

router.post('/following', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_listb.followingList(nickname, function(success, follows){
        if(success){
            if (success) {
                logger.info('/listb/following success');
                res.json({"followList": follows});
            } else {
                logger.info('/listb/following fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/follower', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_listb.followerList(nickname, function(success, follows){
        if(success){
            if (success) {
                logger.info('/listb/follower success');
                res.json({"followList": follows});
            } else {
                logger.info('/listb/follower fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/user/hot', function (req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_listb.hotUser(function(success, users){
        if(success){
            if (success) {
                logger.info('/listb/user/hot success');
                res.json({"hotUserList": users});
            } else {
                logger.info('/listb/user/hot fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

module.exports = router;