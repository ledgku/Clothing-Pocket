var express = require('express');
var router = express.Router();
var fs = require('fs');
var db_user = require('../models/db_user.js');
var async = require('async');
var logger = require('../logger');

router.get('/img/:IMG_NAME', function (req, res) {
    var imgName = req.params.IMG_NAME;
    var img = fs.readFileSync('./public/images/profile/'+imgName);
    res.writeHead(200, {'Content-Type': 'image/jpg'});
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

    async.waterfall([
        function(callback){
            if(!id){
                logger.error('/user/join idNull');
                callback(null, 0);
            }else if(!passwd){
                logger.error('/user/join passwdNull');
                callback(null, 1);
            }else if(!nickname){
                logger.error('/user/join nickNull');
                callback(null, 2);
            }else if(!gender){
                logger.error('/user/join passwdNull');
                callback(null, 3);
            }else{
                callback(null, 4);
            }
        },function(errNum, callback){
            if(errNum==0) {
                callback(null, "idNull");
            }else if(errNum==1){
                callback(null, "passwdNull");
            }else if(errNum==2){
                callback(null, "nickNull");
            }else if(errNum==3){
                callback(null, "genderNull");
            }else if(errNum==4){
                db_user.join(datas, function (flag, success) {
                    if (success) {
                        callback(null, "ok");
                    } else {
                        //flag=0
                        if(flag==0) {
                            logger.error('회원가입 실패(아이디 중복)');
                            callback(null, "idDuplicated");
                        }else if(flag==1){
                            logger.error('회원가입 실패(닉네임 중복)');
                            callback(null, "nickDuplicated");
                        }else if(flag==2){
                            logger.error('회원가입 실패(커넥션 에러)');
                            callback(null, "connError");
                        }else if(flag==3){
                            logger.error('회원가입 실패(커넥션 쿼리 에러)');
                            callback(null, "connQueryError");
                        }
                    }
                });
            }
        }
    ],function(err, Msg){
        if(Msg=="ok"){
            logger.info('회원가입 성공');
            res.json({"Result": "ok"});
        }else{
            res.json({"Result": Msg});
        }
    });
});

//페이스북 회원가입
router.post('/fbjoin', function(req, res, next) {
    logger.info('req.body', req.body);

    var nickname = req.body.nickname;
    var access_token = req.body.accessToken;
    var datas = [nickname, access_token];

    async.waterfall([
        function(callback){
            if(!access_token){
                logger.error('/user/fbjoin accessTokenNull');
                callback(null, 0);
            }else if(!nickname){
                logger.error('/user/fbjoin nicknameNull');
                callback(null, 1);
            }else{
                callback(null, 2);
            }
        }, function(errNum, callback){
            if(errNum==0){
                callback(null, "accessTokenNull");
            }else if(errNum==1){
                callback(null, "nicknameNull");
            }else if(errNum==2){
                db_user.fbjoin(datas, function (flag, success) {
                    if (success) {
                        res.json({"Result": "ok"});
                    } else {
                        if(flag==0){
                            logger.error('잘못된 엑세스 토큰');
                            callback(null, "wrongAccessToken");
                        }else if(flag==1) {
                            logger.error('pool.getConnection Error');
                            callback(null, "getConnectionError");
                        }else if(flag==2){
                            logger.error('facebook id 중복');
                            callback(null, "fbIdDuplicated");
                        }else if(flag==3){
                            logger.error('nickname 중복');
                            callback(null, "nickDuplicated");
                        }else{
                            logger.error('conn.query Error');
                            callback(null, "conn.queryError");
                        }
                    }
                });
            }
        }
    ], function(err, Msg){
        if(Msg=="ok"){
            logger.info('페이스북 회원가입 성공');
            res.json({"Result": "ok"});
        }else{
            res.json({"Result": Msg});
        }
    });
});

router.post('/login', function(req, res, next) {
    logger.info('req.body', req.body);
    var id = req.body.id;
    var passwd = req.body.passwd;
    var datas = [id, passwd];
    db_user.login(datas, function(success){
        if(success){
            logger.info('/user/login success');
            req.session.user_id = id;
            res.json({"Result":"ok"});
        }else{
            logger.info('/user/login fail');
            res.json({"Result":"fail"});
        }
    })
});

router.post('/logout', function(req, res, next) {
    req.session.destroy(function(err){
        if(err) {
            logger.error('/user/logout error ', err);
            res.json({"Result": "fail"});
        }else{
            logger.info('/user/logout success');
            res.json({"Result":"ok"});
        }
    })
});

router.post('/update', function(req, res, next) {
    logger.info('/user/update req.session.user_id ', req.session.user_id);
    var id = req.session.user_id;
    db_user.update(id, function(success, row){
        if(success){
            logger.error('/user/update success');
            res.json({"id":id, "nickname":row[0].USER_NICKNAME});
        }else{
            logger.error('/user/update error');
            res.json({"Result": "fail"});
        }
    });
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