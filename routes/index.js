var express = require('express');
var router = express.Router();
var Tools = require('./../utils/tools'); // 判断浏览器版本
var requests = require('./../requests/index.request.js');

router.use(function (req,res,next) {
  console.log('now---->'+ Tools.getNowFormatDate(new Date()));
  console.log('req.url', req.url);
  console.log('req.host', req.host);

  res.cookie('why',{'name':'wuhanyuan'});

  var browser = Tools.browser(req)
  global.browser = browser;
  // res.locals.browser = browser; // 判断浏览器版本，模板调用
  next()
})

/* GET home page. */
router.get('/', requests.get_goods_list, function(req, res, next) {
  res.render('index', {
    title: '111111',
    description:'这是我的个人网站',
    list:req.data.data.list
  });
});

module.exports = router;
