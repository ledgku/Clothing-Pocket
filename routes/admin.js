var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var logger = require('../logger');
var multer = require('multer');
var db_admin = require('../models/db_admin.js');
var sendPush = require('../sendPush');
var easyimg = require('easyimage');

router.use(multer({
    dest: './public/images/items',
    rename: function (fieldname, filename) {
        return filename;
    }
}));

router.post('/item/add', function (req, res, next) {
    logger.info('req.files', req.files);

    var item = req.files;
    var filename = item.file.name;
    var filePath = 'http://52.68.143.198/item/img/' + filename;
    var imgPath = './public/images/items/';

    if (JSON.stringify(item) == '{}') {
        logger.info('modifiedItemUploadFileNull');
        res.json({"result": 'itemUploadFileNull'});
    } else {
        logger.info('modifiedItemUploadOK');
        db_admin.add(filePath, function (success, flag, contents, pushKey) {
            if (success) {
                logger.info('/admin/add success');
                if(flag==1){
                    sendPush.send(contents, pushKey);
                }
                easyimg.thumbnail({
                    src:imgPath+filename , dst:imgPath+'thumb_'+filename,
                    width:360, height:360
                }).then(
                    function(image) {
                        logger.info('Item Thumbnail Created : ' + image.width + ' x ' + image.height);
                        res.json({"Result": "ok"});
                    },
                    function (err) {
                        logger.error(err);
                        res.json({"Result":"fail"})
                    }
                );
            } else {
                logger.info('/admin/add fail');
                res.json({"Result": "fail"});
            }
        });
    }
});

module.exports = router;