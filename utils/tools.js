//判断浏览器版本
exports.browser = function (req) {
    // var deviceAgent = req.headers['user-agent'].toLowerCase();
    var deviceAgent = req.headers['user-agent'];
    // console.log("deviceAgent:",deviceAgent);
    // var agent = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    // if(agent){
    //     console.log('指到手机、pad的网页')
    // }else{
    //     console.log('指到pc网页')
    // }
    var u = deviceAgent;
    var browser = {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        ie: u.indexOf('MSIE') > -1 //
    };
    return browser
}

//获取当前日期
exports.getNowFormatDate = function (date) {
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}

// 将一个对象转化成一个 字符串
exports.obj2String = function(_obj) {
  var t = typeof (_obj)
  if (t != 'object' || _obj === null) {
    // simple data type
    if (t == 'string') {
      _obj = '"' + _obj + '"'
    }
    return String(_obj)
  } else {
    if (_obj instanceof Date) {
      return _obj.toLocaleString()
    }
    // recurse array or object
    var n, v, json = [],
      arr = (_obj && _obj.constructor == Array)
    for (n in _obj) {
      v = _obj[n]
      t = typeof (v)
      if (t == 'string') {
        v = '"' + v + '"'
      } else if (t == 'object' && v !== null) {
        v = obj2String(v)
      }
      json.push((arr ? '' : '"' + n + '":') + String(v))
    }
    return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}')
  }
}