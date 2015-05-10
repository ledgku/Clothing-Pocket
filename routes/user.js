var express = require('express');
var router = express.Router();
var fs = require('fs');
var db_user = require('../models/db_user.js');
var async = require('async');
var logger = require('../logger');

router.get('/img/:IMG_NAME', function (req, res) {
    var imgName = req.params.IMG_NAME;
    var img = fs.readFileSync('./public/images/profile/'+imgName+'.png');
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(img, 'binary');
});

//일반 회원 가입
router.post('/join', function(req, res, next) {
    logger.info('req.body', req.body);
    var id = req.body.id;
    var passwd = req.body.passwd;
    var nickname = req.body.nickname;
    var gender = req.body.gender;
    var datas = [nickname, id, passwd, gender];

    if(!id){
        res.json({"Result":"fail", "ResultMsg":"idNull"});
    }else if(!passwd){
        res.json({"Result":"fail", "ResultMsg":"passwdNull"});
    }else if(!nickname) {
        res.json({"Result": "fail", "ResultMsg": "nickNull"});
    }else if(!gender){
        res.json({"Result":"fail", "ResultMsg":"genderNull"});
    }else {
        db_user.join(datas, function (flag, success) {
            if (success) {
                logger.info('회원가입 성공');
                res.json({"Result": "ok"});
            } else {
                //flag=0
                if(flag==0) {
                    logger.info('회원가입 실패(아이디 중복)');
                    res.json({"Result": "idDuplicated"});
                }else if(flag==1){
                    logger.info('회원가입 실패(닉네임 중복)');
                    res.json({"Result": "nickDuplicated"});
                }else{
                    logger.info('회원가입 실패(커넥션 에러)');
                    res.json({"Result": "connError"});
                }
            }
        });
    }
});

//페이스북 회원가입
router.post('/fbjoin', function(req, res, next) {
    logger.info('req.body', req.body);
    var nickname = req.body.nickname;
    var access_token = req.body.accessToken;
    var datas = [nickname, access_token];

    if(!access_token){
        res.json({"Result":"fail", "ResultMsg":"accesstokenNull"});
    }else if(!nickname){
        res.json({"Result":"fail", "ResultMsg":"nicknameNull"});
    }else {
        db_user.fbjoin(datas, function (flag, success) {
            if (success) {
                res.json({"Result": "ok"});
            } else {
                if(flag==0){
                    logger.info('잘못된 엑세스 토큰');
                    res.json({"Result": "wrongAccessToken"});
                }else if(flag==1) {
                    logger.info('pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                }else if(flag==2){
                    logger.info('facebook id 중복');
                    res.json({"Result": "fbIdDuplicated"});
                }else if(flag==3){
                    logger.info('nickname 중복');
                    res.json({"Result": "nickDuplicated"});
                }else{
                    logger.info('conn.query Error');
                    res.json({"Result": "conn.queryError"});
                }
            }
        });
    }
});

router.post('/login', function(req, res, next) {
    res.json({"Result":"ok"});
});

router.post('/update', function(req, res, next) {
    res.json({"Result":"ok"});
});

router.post('/update/password', function(req, res, next) {
    res.json({"Result":"ok"});
});

router.post('/profile/add', function(req, res, next) {
    res.json({"Result":"ok"});
});

router.post('/update/notice', function(req, res, next) {
    res.json({"Result":"ok"});
});

router.post('/withdraw', function(req, res, next) {
    res.json({"Result":"ok"});
});

router.post('/search', function(req, res, next) {
    res.json({"nickname":"tester",
        "profile_url":"http://52.68.143.198:3000/user/img/profile",
        "item_num":"100",
        "coordi_num":"150",
        "follow":"0"});
});

router.post('/personal', function(req, res, next) {
    res.json({
        "on_off":"1",
        "main_notice":"1",
        "today_coordi":"1",
        "time":"2",
        "good_reply_follow":"1"
    });
});

router.post('/personal/submit', function(req, res, next) {
    res.json({"result": "success"});
});

router.post('/alarm', function(req, res, next) {
    res.json([
        {
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "content":"nam님이 회원님의 옷장을 팔로우 했습니다."
        },{
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "content":"수선이 완료되었습니다."
        },{
            "img_url": "http://52.68.143.198:3000/coordi/img/coordi",
            "content":"수선이 중입니다."
        }
    ]);
});

module.exports = router;