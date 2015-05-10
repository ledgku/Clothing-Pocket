var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var logger = require('../logger');
var multer = require('multer');
var db_coordi = require('../models/db_coordi.js');

router.get('/img/:IMG_NAME', function (req, res) {
    var imgName = req.params.IMG_NAME;
    var img = fs.readFileSync('./public/images/coordi/' + imgName);
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(img, 'binary');
});

router.use(multer({
    dest: './public/images/coordi',
    rename: function (fieldname, filename) {
        return filename.toLowerCase() + Date.now();
    }
}));

router.post('/add', function (req, res, next) {
    logger.info('req.body', req.body);
    logger.info('req.files', req.files);

    var item = req.files;
    var filename = req.files.item.name;
    var filePath = 'http://localhost/coordi/img/'+filename;
    var nickname = req.body.nickname;
    var datas = [nickname, filePath];
    logger.info('datas ', datas);

    if (JSON.stringify(item) == '{}') {
        logger.info('coordiUploadFileNull');
        res.json({"result": 'coordiUploadFileNull'});
    }else{
        logger.info('coordiUploadOK');
        res.json({"result": 'UploadOK'});
        db_coordi.add(datas, function(flag, success){
            if(success){
                res.json({"Result":"ok"});
            }else{
                if(flag==0){
                    logger.info('db_coordi.add pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                }else if(flag==1){
                    logger.info('db_coordi.add conn.query Error');
                    res.json({"Result": "connQueryError"});
                }
            }
        });
    }
});

router.post('/delete', function (req, res, next) {
    res.json({"result": "success"});
});

router.post('/modify', function (req, res, next) {
    logger.info('req.body ', req.body);

    var coordi_num = req.body.coordiNum;
    var datas = [coordi_num];

    if (req.body.description) {
        var description = req.body.description;
        datas.push(description);
        db_coordi.modifyDesc(datas, function (flag, success) {
            if (success) {
                logger.info('db_coorci.modifyDesc success');
                datas.pop();

                if(req.body.situationProp){
                    datas.push(req.body.situationProp);
                }
                if(req.body.seasonProp){
                    datas.push(req.body.seasonProp)
                }
                if(req.body.tempProp){
                    datas.push(req.body.tempProp);
                }
                if (datas.length == 1) {
                    res.json({"Result": "ok"});
                }else if(datas.length != 4){
                    logger.error("coordiPropNumIsNot3");
                    res.json({"Result":"coordiPropNumIsNot3"});
                }else {
                    db_coordi.modify(datas, function (flag, success) {
                        if (success) {
                            res.json({"Result": "ok"});
                        } else {
                            if (flag == 0) {
                                logger.error('db_coordi.modify pool.getConnection Error');
                                res.json({"Result": "getConnectionError"});
                            } else if (flag == 1) {
                                logger.error('db_coordi.modify conn.query Error');
                                res.json({"Result": "connQueryError"});
                            }
                        }
                    });
                }
            } else {
                if (flag == 0) {
                    logger.error('db_coordi.modifyDesc pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                } else if (flag == 1) {
                    logger.error('db_coordi.modifyDesc conn.query Error');
                    res.json({"Result": "connQueryError"});
                }
            }
        });
    }
});

router.post('/good', function (req, res, next) {
    res.json({"result": "success"});
});

router.post('/detail', function (req, res, next) {
    res.json(
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
        }, [{
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "date": "2015-05-03 11:21:54",
            "content": "예뻐요."
        }, {
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "date": "2015-05-03 11:21:54",
            "content": "예뻐요."
        }, {
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "date": "2015-05-03 11:21:54",
            "content": "예뻐요."
        }, {
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "date": "2015-05-03 11:21:54",
            "content": "예뻐요."
        }, {
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "date": "2015-05-03 11:21:54",
            "content": "예뻐요."
        }, {
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "date": "2015-05-03 11:21:54",
            "content": "예뻐요."
        }, {
            "profile_url": "http://52.68.143.198:3000/user/img/profile",
            "nickname": "tester",
            "date": "2015-05-03 11:21:54",
            "content": "예뻐요."
        }],
        [{
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
        }],
        [{
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

router.post('/reply/reg', function (req, res, next) {
    res.json({"result": "success"});
});

router.post('/reply/del', function (req, res, next) {
    res.json({"result": "success"});
});

module.exports = router;