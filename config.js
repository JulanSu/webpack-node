var path = require('path');
var env = process.env.NODE_ENV || 'development';
env = env.toLocaleLowerCase();

console.log('__dirname::',__dirname);
console.log('env',env);

//载入配置文件
var file = path.resolve(__dirname,'config',env);
console.log('file::',file);

try{
  if (env == 'beta'){
    console.log('beta环境配置');
    var config = require('./config/beta');
  } else if(env == 'development'){
    console.log('开发环境配置');
    var config = require('./config/development');
  } else if(env == 'production'){
    console.log('生产环境配置');
    var config = require('./config/production');
  }
}catch (err){
  console.error('Cannot load config: [%s] %s', env);
  throw err;
}

module.exports = config;