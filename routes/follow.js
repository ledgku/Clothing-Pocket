var express = require('express');
var router = express.Router();
var logger = require('../logger');
var db_follow = require('../models/db_follow.js');

router.post('/', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body ', req.body);

    var nickname = req.body.nickname;
    var nickname2 = req.session.nickname;
    var datas = [nickname, nickname2];

    if(!nickname){
        logger.error('/follow nicknameNull');
        res.json({"Result":"nicknameNull"});
    }else{
        db_follow.follow(datas, function(success){
            if(success){
                logger.info('/follow success');
                res.json({"Result": "ok"});
            }else{
                logger.error('/follow fail');
                res.json({"Result": "fail"});
            }
        });
    }
});

module.exports = router;