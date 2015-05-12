var express = require('express');
var router = express.Router();
var logger = require('../logger');
var db_report = require('../models/db_report.js');

router.post('/', function (req, res, next) {
    res.json({"result": "success"});
});

module.exports = router;