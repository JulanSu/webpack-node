var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); //处理收藏夹图标的
var logger = require('morgan'); //写日志
var cookieParser = require('cookie-parser'); //解析cookie，req.cookie属性存放着客户端提交过来的cookie，// req.cookie（key.value）向客户端写cookie
var bodyParser = require('body-parser');// 处理请求体的req.body 属性存放着请求体对象
var session = require('express-session');
// var redis = require('redis');
var redisStore = require('connect-redis')(session);


// 把使用的路由文件引进来
var index = require('./routes/index');
var users = require('./routes/users');


var app = express();
var config = require('./config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'static','images', '01.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());  //用于解析 JSON格式的数据
app.use(bodyParser.urlencoded({ extended: true })); // 用于解析application/x-www-form-urlencoded
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));

// var redisClient = redis.createClient(6379,config.options.host,{});
// // var redisClient = redis.createClient(6379,config.options.host,{auth_pass:config.options.pass});
// //redis需要密码有底下两种写法
// redisClient.auth(config.options.pass,function () {
//   console.log('认证通过');
// })
//
// redisClient.on('ready',function(err){
//   if(err){
//     console.error(err);
//     return;
//   }
//   console.log('ready:Redis链接成功');
// });


// 访问session的话，通过 req.session 来访问，
// session与发送到客户端浏览器的生命周期是一致的。而我们在挂载session的时候，通过option选项的cookie.maxAge成员，
// 我们可以设置session的过期时间，以ms为单位（但是，如果session存储在mongodb中的话，任何低于60s(60000ms)的设置是没有用的）。
// 如果maxAge不设置，默认为null，这样的expire的时间就是浏览器的关闭时间，即每次关闭浏览器的时候，session都会失效。
app.use(session({
  name:"session.sid",  //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  // store: new redisStore(config.options), // session存储实例的地方，这里是将session存储在redis中
  secret: 'wmyan@0809', // 作为服务器端生成session cookie的签名，防止被篡改。
  cookie:{httpOnly:true}, // session cookie的设置，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
  proxy: true, // 当设置了secure cookies（通过”x-forwarded-proto” header ）时信任反向代理。当设定为true时，”x-forwarded-proto” header 将被使用。当设定为false时，所有headers将被忽略。当该属性没有被设定时，将使用Express的trust proxy。
  resave: true, //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
  //强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）
  saveUninitialized: true //初始化session时是否保存到内存当中去。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}));

// 项目全局需要一些什么组件，全局引入的
// app.locals.moment = require('moment');

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('您要的页面不存在');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
