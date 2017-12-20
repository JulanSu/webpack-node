# node-express-redis

## 描述

> 本人做的一个使用node的Express框架，结合redis的一个小项目，后面会不断的更新和完善。

- 项目相关文件夹
  - bin：node启动
  - client：js和sass文件
  - config：各个不同环境的配置文件（beta：测试环境；prod：生产环境）
  - node_modules：node依赖的包
  - public：外部访问的文件夹，如js、css、images。这里的js和css是由client中的文件编译而成的。
  - routes：路由文件夹（用来处理浏览器请求，并返回相关数据给浏览器）
  - requests：用来请求Java服务器的数据
  - utils：工具
  - views：存放jade文件（由node用数据渲染生成HTML）
  - webpack_config：webpack的配置文件  
  - output.js: 用于生成webpack打包时的js路径
  - webpack.config.js: webpack打包时的配置
  - webpack.config.dev.js: webpack启动服务的配置


## webapck功能部分
 功能  
- css压缩，scss编译
- js压缩，ES6转码
- 动态读取入口配置文件
- 动态设置HtmlWebpackPlugin实现多页打包配置
- 启动webpack-dev-server（自动刷新js/html/css）

## 静态目录结构（用于webpack打包的解构）
```
│  .gitignore
│  app.js
│  config.js 
│  output.js
│  package.json 
│  README.md
│  webpack.config.dev.js
│  webpack.config.js
│  
└─views
    ├─includes    //可能引用的jade模版
    │  │ footer.jade
    │  │ header.jade
    │
    ├─pageA       //A页面
    │  │  index.jade
    │
    ├─pageB       //B页面
    │  │  index.jade
    │
    index.jade    //公用的部分，主页等
    layout.jade
    error.jade
└─static      //放一些公共的静态文件
    ├─css     //公共css
    │  │ reset.css
    │
    ├─js       //公共js
    │  │ jquery.js
    │  │ echart.js
    │
    ├─images
    │  │  w4.png
    │
    ├─fonts
    │  │  iconfont.ttf
    │ 
└─client      //页面对应的sass，js
    ├─js
       │
       ├─pageA
       │  │  a.js
       │
       ├─pageB
          │  b.js
    └─sass
       │
       ├─pageA
       │  │  a.sass
       │
       ├─pageB
          │  b.sass
```
## 编译后目录结构（只多了一个public目录）
```
│  .gitignore
│  app.js
│  config.js 
│  output.js
│  package.json 
│  README.md
│  webpack.config.dev.js
│  webpack.config.js
│  
└─public    //打包过后的文件
    ├─css   //编译之后的css
       ├─pageA
         │   a.min.css
         │   a.min.css.map
         │
       └─pageB
         │   b.min.css
         │   b.min.css.map
         │
    └─js    //编译之后的js
       ├─pageA
         │   a.min.js
         │   a.min.js.map
         │
       └─pageB
         │   b.min.js
         │   b.min.js.map
         │
    └─views  //编译之后的html
       ├─pageA
         │   index.html
         │
       └─pageB
         │   b.min.js
         │   index.html
         │
    └─static    //输出的静态文件
       ├─css
         │   reset.css
         │
       └─fonts
         │   iconfont.ttf
         │
       └─images
         │   w4.png
         │
       └─js
         │   jquery.js
         │   echart.js
```

## Build Setup


``` bash
# 安装依赖
npm install 或者 cnpm install

# 本地开发调试（localhost:9000）
npm run dev
注：npm run dev时，启动的devserve不会生成public文件夹，只是将打包出来的文件缓存到内存中
    在目录下是看不到的，在浏览器中是可以打开的，例：http://localhost:9000/public/views/pageA
    具体请看demo

# 打包文件（生成public文件夹）
npm run build

#node服务渲染
npm run start


