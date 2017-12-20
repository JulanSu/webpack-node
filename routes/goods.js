var express = require('express');
var router = express.Router();

router.get('/list',function(req,res,next){
  res.render('list/goods',{
    title:'商品列表',
    description:'这里是商品列表'
  })
})