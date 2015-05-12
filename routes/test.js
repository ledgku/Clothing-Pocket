var express = require('express');
var router = express.Router();
var fs = require('fs');

var url = "http://localhost/item/img/shirts1431321926548.png";
var urlArr = url.split('/');

console.log(urlArr[urlArr.length-1]);

fs.unlink('../public/images/items/'+urlArr[urlArr.length-1], function(err){
   if(err) throw err;
});