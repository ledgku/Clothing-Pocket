var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var logger = require('../logger');
var multer = require('multer');
var merge = require('merge');
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
    logger.info('req.session', req.session);
    logger.info('req.files', req.files);

    var item = req.files;
    var filename = req.files.file.name;
    var filePath = 'http://52.68.143.198/coordi/img/'+filename;
    var nickname = req.session.nickname;
    var datas = [nickname, filePath];
    logger.info('datas ', datas);

    if (JSON.stringify(item) == '{}') {
        logger.info('coordiUploadFileNull');
        res.json({"result": 'coordiUploadFileNull'});
    }else{
        logger.info('coordiUploadOK');
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
    logger.info('req.body ', req.body);

    var coordi_num = req.body.coordiNum;

    if(!coordi_num){
        logger.error('/coordi/delete coordiNumNull');
        res.json({"Result":"coordiNumNull"});
    }else{
        db_coordi.delete(coordi_num, function(flag, success){
            if(success){
                res.json({"Result": "ok"});
            }else{
                if(flag==0){
                    logger.error('db_coordi.delete pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                }else if (flag == 1) {
                    logger.error('db_coordi.delete rollback error');
                    res.json({"Result": "rollbackError"});
                }else if (flag ==2) {
                    logger.error('db_coordi.delete rollback');
                    res.json({"Result": "rollback"});
                }
            }
        })
    }
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
                }else if (flag ==2) {
                    logger.error('db_item.delete rollback');
                    res.json({"Result": "rollback"});
                }else if (flag == 3){
                    logger.error('db_item.delete unlink error');
                    res.json({"Result": "unlinkError"});
                }
            }
        });
    }
});

router.post('/good', function (req, res, next) {
    logger.info('req.body ', req.body);

    var coordi_num = req.body.coordiNum;
    var nickname = req.session.nickname;
    var datas = [coordi_num, nickname];

    if(!coordi_num){
        logger.error('/coordi/good coordiNumNull');
        res.json({"Result":"coordiNumNull"});
    }else if(!nickname){
        logger.error('/item/good nicknameNull');
        res.json({"Result":"nicknameNull"});
    }else{
        db_coordi.good(datas, function(flag, success){
            if(success){
                res.json({"Result": "ok"});
            }else{
                if(flag==0){
                    logger.error('db_coordi.good pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                }else if(flag==1){
                    logger.error('db_coordi.good conn.query Error');
                    res.json({"Result": "connQueryError"});
                }else if(flag==2){
                    logger.error('db_coordi.good Fail');
                    res.json({"Result": "Fail"});
                }
            }
        });
    }
});

router.post('/detail', function (req, res, next) {
    logger.info('req.body', req.body);
    var coordi_num = req.body.coordiNum;

    if (!coordi_num) {
        logger.info('coordiNumNull');
        res.json({"result": 'coordiNumNull'});
    } else {
        db_coordi.detail(coordi_num, function (success, results) {
            if (success) {
                logger.info("/coordi/detail success");
                logger.info('results', results);
                var datas = results[0].concat(results[1]).concat(results[2]);
                var data = merge(datas[0], datas[1], datas[2]);
                res.json({"Info": data, "CoordiProp":results[3], "CoordiItems":results[4], "CoordiList":results[5]});
            } else {
                logger.error('/coordi/detail fail');
                res.json({"Result": "Fail"});
            }
        });
    }
});

router.post('/modify/info', function(req, res, next){
    logger.info('req.body', req.body);
    var coordi_num = req.body.coordiNum;

    if(!coordi_num){
        logger.info('coordiNumNull');
        res.json({"Result":"coordiNumNull"});
    }else{
        db_coordi.modifyInfo(coordi_num, function(success, results){
            if(success){
                logger.info('success, results', success, results);
                if(results=='null'){
                    logger.info('/coordi/modify/info prop not exist');
                    res.json({"Results":"none"});
                }else{
                    logger.info('/coordi/modify/info prop exist');
                    res.json({"Results":[results[0], results[1], results[2]]});
                }
            }else{
                logger.info('/coordi/modify/info fail');
                res.json({"Results":"fail"});
            }
        });
    }
});

router.post('/reply', function(req, res, next){
    logger.info('/reply coordi.CD_NUM ', req.body.coordiNum);
    var coordi_num = req.body.coordiNum;

    if(!coordi_num){
        logger.info('coordiNumNull');
        res.json({"Result":"coordiNumNull"});
    }else{
        db_coordi.reply(coordi_num, function(success, results){
            if(success){
                if(results!='null'){
                    logger.info('/coordi/reply success');
                    res.json({"Result":results});
                }else{
                    logger.info('/coordi/reply cnt 0');
                    res.json({"Result":"replyCnt0"});
                }
            }else{
                logger.error('/coordi/reply error');
                res.json({"Result":"fail"});
            }
        });
    }
});

router.post('/reply/reg', function (req, res, next) {
    logger.info('/reply req.session', req.session);
    logger.info('/reply req.body ', req.body);

    var coordi_num = req.body.coordiNum;
    var nickname = req.session.nickname;
    var re_contents = req.body.contents;
    var datas = [coordi_num, nickname, re_contents];

    if(!(coordi_num&&nickname&&re_contents)){
        logger.info('nullInputExist');
        res.json({"Result":"nullInputExist"});
    }else{
        db_coordi.replyReg(datas, function(success){
            if(success){
                logger.info('/reply/reg success');
                res.json({"Result":"ok"});
            }else{
                logger.error('/reply/reg fail');
                res.json({"Result":"fail"});
            }
        });
    }
});

router.post('/reply/del', function (req, res, next) {
    logger.info('/reply req.session', req.session);
    logger.info('/reply req.body ', req.body);

    var coordi_num = req.body.coordiNum;
    var nickname = req.session.nickname;
    var regdate = req.body.regdate;
    var datas = [coordi_num, nickname, regdate];

    if(!(coordi_num&&nickname&&regdate)){
        logger.info('nullInputExist');
        res.json({"Result":"nullInputExist"});
    }else{
        db_coordi.replyDel(datas, function(success){
            if(success){
                logger.info('/reply/del success');
                res.json({"Result":"ok"});
            }else{
                logger.error('/reply/del fail');
                res.json({"Result":"fail"});
            }
        });
    }
});

router.post('/prop/search', function (req, res, next) {
    logger.info('/reply req.body ', req.body);

    var search_prop = req.body.searchProp;

    if(!search_prop){
        logger.info('searchPropNull');
        res.json({"Result":"searchPropNull"});
    }else{
        db_coordi.propSearch(search_prop, function(success, coordis){
            if(success){
                if (success) {
                    logger.info('/coordi/prop/search success');
                    res.json({"searchPropCoordis": coordis});
                } else {
                    logger.info('/coordi/prop/search fail');
                    res.json({"Result": "fail"});
                }
            }
        });
    }
});

module.exports = router;