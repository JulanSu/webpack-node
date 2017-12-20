var axios = require('axios');
var config = require('./../config.js');

//创建一个axios对象
const newAxios = axios.create({
  baseURL:config.apiHost,
  timeout:1500,
  headers: { 'X-Requested-With': 'ajax' },
  responseType: 'json',
  maxContentLength: 5000,
});

/**
 * 向[JAVA]服务器发起请求的公共方法
 * **************************************************************************************************************************
 * 2017.12.20 eg: 未来可预测的报错信息有两种，第一种是JAVA服务器返回来的错误，这种处理需协调,引导对应的错误信息到浏览器界面，返回404状态
 * 第二种报错信息，是axios内部的报错信息，可能是参数的配置不正确等等之类的，这种错误整理，引导对应的错误信息到浏览器界面，返回500状态
 * ****************************************************************************************************************************
 * 如果出现错误,该方法默认直接处理。如不需处理,则把客户端请求req的属性autoHandleError设为false
 * 默认处理错误需设置客户端请求req的属性resType:'html'或'json'。默认为json
 * @param method http方法:DELETE、PUT、GET、POST
 * @param apiName 接口名称
 * @param browserReq 客户端请求
 * @param browserRes 客户端响应
 * @param bizParam 业务参数
 * @param callback 请求后的回调方法
 */
module.exports.ajax = function (method,apiName,bizParam,callback) {
    var method = method.toLowerCase();
    // 打印相关的日志信息相关到控制台
    console.log('method:'+method);
    console.log('apiName:'+apiName);
    console.log('bizParam:'+JSON.stringify(bizParam));
    if( method === 'get'){
      newAxios({
        method:method,
        url:apiName,
        // `params` 是即将与请求一起发送的 URL 参数
        // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
        params: bizParam
      }).then(res => {
        // 第一种错误处理办理
        if(!res.data.success){
          var err = new Error(res.data);
          console.error(err);
          return Promise.reject(err);
        }else{
          callback && callback(res.data);
          console.log(JSON.stringify(res.data));
        }
      }).catch( error => {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
    }else {
      newAxios({
        method:method,
        url:apiName,
        // `transformRequest` 允许在向服务器发送前，修改请求数据
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return data;
        }],
        // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
        transformResponse: [function (data) {
          // 对 data 进行任意转换处理

          return data;
        }],
        // `data` 是作为请求主体被发送的数据
        // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        // 在没有设置 `transformRequest` 时，必须是以下类型之一：
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - 浏览器专属：FormData, File, Blob
        // - Node 专属： Stream
        data: bizParam

      }).then( res => {
        // 第一种错误处理办理
        if(!res.data.success){
          var err = new Error(res.data);
          console.error(err);
          return Promise.reject(err);
        }else{
          callback && callback(res.data);
          console.log(JSON.stringify(res.data));
        }
      }).catch( error => {
        // 第二种错误处理办理
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
    };
};



