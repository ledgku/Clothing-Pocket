var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var logger = require('../logger');
var multer = require('multer');
var db_admin = require('../models/db_admin.js');
var sendPush = require('../sendPush');

router.use(multer({
    dest: './public/images/items',
    rename: function (fieldname, filename) {
        return filename;
    }
}));

router.post('/item/add', function (req, res, next) {
    logger.info('req.files', req.files);

    var item = req.files;
    var filename = req.files.file.name;
    var filePath = 'http://52.68.143.198/item/img/' + filename;
    var nickname = req.body.nickname;
    var datas = [filePath, nickname];

    if (JSON.stringify(item) == '{}') {
        logger.info('modifiedItemUploadFileNull');
        res.json({"result": 'itemUploadFileNull'});
    } else {
        logger.info('modifiedItemUploadOK');
        db_admin.add(datas, function (success, contents, pushKey) {
            if (success) {
                logger.info('/admin/add success');
                sendPush.send(contents, pushKey);
                res.json({"Result": "ok"});
            } else {
                logger.info('/admin/add fail');
                res.json({"Result": "fail"});
            }
        });
    }
});

module.exports = router;