var express = require('express');
var router = express.Router();
var handler = require('./../handlers/user.handlers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.fresh);
  res.send('respond with a resource');
});

router.get('/detail/:a', function(req,res,next){
  console.log('------------------------');
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.ips);
  console.log(req.originalUrl);
  console.log(req.params);
  console.log(req.path);
  console.log(req.protocol);
  console.log(req.secure);
  console.log(req.signedCookies);
  next();
},handler.get_user_detail);

router.get('/show', function(req,res,next){
  console.log('------------------------');
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.ips);
  console.log(req.originalUrl);
  console.log(req.query);
  console.log(req.path);
  console.log(req.protocol);
  console.log(req.secure);
  console.log(req.signedCookies);
  console.log(req.xhr);
  next();
},handler.get_user_detail);


module.exports = router;
