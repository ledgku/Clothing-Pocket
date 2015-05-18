var express = require('express');
var router = express.Router();
var logger = require('../logger');
var merge = require('merge');
var db_list = require('../models/db_list.js');

router.post('/closet/good', function(req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_list.listGood(nickname, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/good success');
                res.json({"listGoodCoordis": coordis});
            } else {
                logger.info('/closet/good fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/closet/recent', function(req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_list.listRecent(nickname, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/recent success');
                res.json({"listRecentCoordis": coordis});
            } else {
                logger.info('/closet/recent fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/closet/follow', function(req, res, next) {
    logger.info('req.session', req.session);
    var nickname = req.session.nickname;

    db_list.listFollow(nickname, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/follow success');
                res.json({"listFollowCoordis": coordis});
            } else {
                logger.info('/closet/follow fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/closet/good/search', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body', req.body);
    var nickname = req.session.nickname;
    var prop = req.body.coordiProp;
    var datas = [nickname, prop];

    db_list.searchListPropGood(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/good/search success');
                res.json({"searchPropListGoodCoordis": coordis});
            } else {
                logger.info('/closet/good/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/closet/recent/search', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body', req.body);
    var nickname = req.session.nickname;
    var prop = req.body.coordiProp;
    var datas = [nickname, prop];

    db_list.searchListPropRecent(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/recent/search success');
                res.json({"searchPropListRecentCoordis": coordis});
            } else {
                logger.info('/closet/recent/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

router.post('/closet/follow/search', function(req, res, next) {
    logger.info('req.session', req.session);
    logger.info('req.body', req.body);
    var nickname = req.session.nickname;
    var prop = req.body.coordiProp;
    var datas = [nickname, prop];

    db_list.searchListPropFollow(datas, function(success, coordis){
        if(success){
            if (success) {
                logger.info('/closet/follow/search success');
                res.json({"searchPropListFollowCoordis": coordis});
            } else {
                logger.info('/closet/follow/search fail');
                res.json({"Result": "fail"});
            }
        }
    });
});

module.exports = router;