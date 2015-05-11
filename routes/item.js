var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var logger = require('../logger');
var multer = require('multer');
var db_item = require('../models/db_item.js');

router.get('/img/download/:IMG_NAME', function (req, res) {
    var imgName = req.params.IMG_NAME;
    var imgPath = path.join(__dirname, '\\..', '\\public\\images\\items\\', imgName);
    logger.info('imgPath ', imgPath);
    res.download(imgPath);
});

router.get('/img/:IMG_NAME', function (req, res) {
    var imgName = req.params.IMG_NAME;
    var img = fs.readFileSync('./public/images/items/' + imgName);
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(img, 'binary');
});

router.use(multer({
    dest: './public/images/items',
    rename: function (fieldname, filename) {
        return filename.toLowerCase() + Date.now();
    }
}));

router.post('/add', function (req, res, next) {
    logger.info('req.body', req.body);
    logger.info('req.files', req.files);

    var item = req.files;
    var filename = req.files.file.name;
    logger.info('filename ', filename);
    var filePath = 'http://localhost/item/img/' + filename;
    var nickname = req.body.nickname;
    var datas = [nickname, filePath];
    logger.info('datas ', datas);

    if (JSON.stringify(item) == '{}') {
        logger.info('itemUploadFileNull');
        res.json({"result": 'itemUploadFileNull'});
    } else {
        logger.info('itemUploadOK');
        db_item.add(datas, function (flag, success) {
            if (success) {
                res.json({"Result": "ok"});
            } else {
                if (flag == 0) {
                    logger.info('db_item.add pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                } else if (flag == 1) {
                    logger.info('db_item.add conn.query Error');
                    res.json({"Result": "connQueryError"});
                }
            }
        });
    }
});


router.post('/modify', function (req, res, next) {
    logger.info('req.body ', req.body);

    var item_num = req.body.itemNum;
    var datas = [item_num];

    if (req.body.description) {
        var description = req.body.description;
        datas.push(description);
        db_item.modifyDesc(datas, function (flag, success) {
            if (success) {
                logger.info('db_item.modifyDesc success');
                datas.pop();

                if(req.body.categoryProp){
                    datas.push(req.body.categoryProp);
                }
                if(req.body.seasonProp){
                    datas.push(req.body.seasonProp)
                }
                if(req.body.colorProp){
                    datas.push(req.body.colorProp);
                }
                if (datas.length == 1) {
                    res.json({"Result": "ok"});
                }else if(datas.length != 4){
                    logger.error("itemPropNumIsNot3");
                    res.json({"Result":"itemPropNumIsNot3"});
                }else {
                    db_item.modify(datas, function (flag, success) {
                        if (success) {
                            res.json({"Result": "ok"});
                        } else {
                            if (flag == 0) {
                                logger.error('db_item.modify pool.getConnection Error');
                                res.json({"Result": "getConnectionError"});
                            } else if (flag == 1) {
                                logger.error('db_item.modify conn.query Error');
                                res.json({"Result": "connQueryError"});
                            }
                        }
                    });
                }
            } else {
                if (flag == 0) {
                    logger.error('db_item.modifyDesc pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                } else if (flag == 1) {
                    logger.error('db_item.modifyDesc conn.query Error');
                    res.json({"Result": "connQueryError"});
                }
            }
        });
    }
});

router.post('/download', function (req, res, next) {
    res.json({
        "img_url": "http://52.68.143.198:3000/item/img/shirts"
    });
});

router.post('/delete', function (req, res, next) {
    logger.info('req.body ', req.body);

    var item_num = req.body.itemNum;

    if(!item_num){
        logger.error('/item/delete itemNumNull');
        res.json({"Result":"itemNumNull"});
    }else{
        db_item.delete(item_num, function(flag, success){
            if(success){
                res.json({"Result": "ok"});
            }else{
                if(flag==0){
                    logger.error('db_item.delete pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                }else if (flag == 1) {
                    logger.error('db_item.delete rollback error');
                    res.json({"Result": "rollbackError"});
                }else if (flag ==2) {
                    logger.error('db_item.delete rollback');
                    res.json({"Result": "rollback"});
                }
            }
        })
    }
});

router.post('/good', function (req, res, next) {
    logger.info('req.body ', req.body);

    var item_num = req.body.itemNum;
    var nickname = req.body.nickname;
    var datas = [item_num, nickname];

    if(!item_num){
        logger.error('/item/good itemNumNull');
        res.json({"Result":"itemNumNull"});
    }else if(!nickname){
        logger.error('/item/good nicknameNull');
        res.json({"Result":"nicknameNull"});
    }else{
        db_item.good(datas, function(flag, success){
            if(success){
                res.json({"Result": "ok"});
            }else{
                if(flag==0){
                    logger.error('db_item.good pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                }else if(flag==1){
                    logger.error('db_item.good conn.query Error');
                    res.json({"Result": "connQueryError"});
                }else if(flag==2){
                    logger.error('db_item.good Fail');
                    res.json({"Result": "Fail"});
                }
            }
        });
    }
});

router.post('/detail', function (req, res, next) {
    logger.info('req.body', req.body);
    var item_num = req.body.itemNum;

    if (!item_num) {
        logger.info('itemNumNull');
        res.json({"result": 'itemNumNull'});
    } else {
        db_item.detail(item_num, function (flag, success) {
            if (success) {
                res.json({"Result": "ok"});
            } else {
                if (flag == 0) {
                    logger.error('db_item.detail pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                } else if (flag == 1) {
                    logger.error('db_item.detail conn.query Error');
                    res.json({"Result": "connQueryError"});
                }
            }
        });
    }
});

module.exports = router;