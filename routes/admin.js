var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var logger = require('../logger');
var multer = require('multer');
var db_item = require('../models/db_admin.js');

router.use(multer({
    dest: './public/images/items',
    rename: function (fieldname, filename) {
        return filename;
    }
}));

router.post('/item/add', function(req, res, next) {
    logger.info('req.files', req.files);

    var item = req.files;
    var filename = req.files.file.name;
    var filePath = 'http://localhost/item/img/'+filename;

    if (JSON.stringify(item) == '{}') {
        logger.info('modifiedItemUploadFileNull');
        res.json({"result": 'itemUploadFileNull'});
    }else{
        logger.info('modifiedItemUploadOK');
        db_item.add(filePath, function(flag, success){
            if(success){
                res.json({"Result":"ok"});
            }else{
                if(flag==0){
                    logger.info('db_item.modiadd pool.getConnection Error');
                    res.json({"Result": "getConnectionError"});
                }else if(flag==1){
                    logger.info('db_item.modiadd conn.query Error');
                    res.json({"Result": "connQueryError"});
                }
            }
        });
    }
});

module.exports = router;