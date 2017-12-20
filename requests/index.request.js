var config = require('../config.js');
var utils = require('./../utils/axios.js');
var api = require('./../utils/Api/index_api.js');

const base = config.apiHost;

exports.get_goods_list = function (req,res,next) {
  var bizParam = {
    Id:'10049',
    productStatus:'2',
    pageNum:'1',
    pageSize:'2'
  };

  utils.ajax('GET', api.productList, bizParam, function (data) {
      req.data = data;
      next();
  })
}