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

router.post('/fb', function(req, res, next) {
    logger.info('req.body', req.body);
    var access_token = req.body.accessToken;

    if(!access_token){
        logger.error('/user/fb accessTokenNull');
        res.json({"Result":"accessTokenNull"});
    }else{
        db_user.fb(access_token, function(flag, success, data){
            if(success){
                logger.info('페이스북 로그인');
                req.session.nickname = data;
                res.json({"Result":"ok"});
            }else{
                if(flag==0){
                    logger.info('/user/fb error');
                    res.json({"Result":"fail"});
                }else{
                    logger.info('/user/fb ->fbjoin');
                    req.session.datas = data;
                    res.json({"Result":"fbjoin"});
                    logger.info('data ', req.session.datas);
                }
            }
        });
    }
});

//페이스북 회원가입
router.post('/fbjoin', function(req, res, next) {
    var nickname = req.body.nickname;
    var datas = req.session.datas;
    datas.push(nickname);
    logger.info('req.session.datas ', datas);
    // datas = [facebook_id, join_path, gender, nickname];

    if(!nickname){
        logger.error('/user/fbjoin nicknameNull');
        res.json({"Result":"nicknameNull"});
    }else if(!datas){
        logger.error('/user/fbjoin sessionDataNull');
        res.json({"Result":"sessionDataNull"});
    }else{
        db_user.fbjoin(datas, function(success, flag){
            if(success){
                logger.info('/user/fbjoin success');
                res.json({"Result":"ok"});
            }else{
                if(flag==0){
                    logger.info('/user/fbjoin error');
                    res.json({"Result":"conn.queryError"});
                }else if(flag==1){
                    logger.info('/user/fbjoin idDuplicated');
                    res.json({"Result":"idDuplicated"});
                }else if(flag==2){
                    logger.info('/user/fbjoin conn.queryError');
                    res.json({"Result":"conn.queryError"});
                } else{
                    logger.info('/user/fbjoin nickDuplicated');
                    res.json({"Result":"nickDuplicated"});
                }
            }
        });
    }
});

router.post('/login', function(req, res, next) {
    logger.info('req.body', req.body);
    var id = req.body.id;
    var passwd = req.body.passwd;
    var datas = [id, passwd];
    db_user.login(datas, function(success, nickname){
        if(success){
            logger.info('/user/login success');
            req.session.nickname = nickname;
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
    logger.info('/user/update req.session.nickname ', req.session.nickname);
    var nickname = req.session.nickname;
    db_user.update(nickname, function(success, rows){
        if(success){
            logger.error('/user/update success');
            res.json({"id":rows[0].USER_ID, "nickname":rows[0].USER_NICKNAME});
        }else{
            logger.error('/user/update error');
            res.json({"Result": "fail"});
        }
    });
});

router.post('/update/password', function(req, res, next) {
    logger.info('req.session.nickname ', req.session.nickname);
    logger.info('req.body ', req.body);
    var nickname = req.session.nickname;
    var current_passwd = req.body.currentPasswd;
    var new_passwd = req.body.newPasswd;
    var new_passwd2 = req.body.newPasswd2;

    if(new_passwd!=new_passwd2){
        logger.error('/update/passwd new_passwd!=new_passwd2');
        res.json({"Result":"newPasswdMatchError"});
    }else{
        logger.info('/update/passwd new_passwd==new_passwd2');
        var datas = [nickname, current_passwd, new_passwd];
        db_user.changepasswd(datas, function(success){
            if(success){
                logger.info('/update/passwd success');
                res.json({"Result":"ok"});
            }else{
                logger.info('/update/passwd fail');
                res.json({"Result":"fail"});
            }
        });
    }
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