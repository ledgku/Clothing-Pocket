var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.json({"result":"success"});
});

module.exports = router;