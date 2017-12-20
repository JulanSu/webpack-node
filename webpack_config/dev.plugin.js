const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const output = require('../output');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const base_plugin = [
    new ExtractTextPlugin({                             //css处理，dev环境不压缩js
        filename: 'public/css/[name].min.css'
    }),
    new CopyWebpackPlugin([{                            //静态文件处理
        from: './static',
        to: './public/static'
    }]),
    new webpack.HotModuleReplacementPlugin(),           //热更新模块
    new webpack.DefinePlugin({                          //设置变量，打包移除jade
        'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    new OpenBrowserPlugin({                             //打开浏览器
        url: 'http://localhost:9000' 
    })
]
/*遍历页面，添加配置*/
output.htmlsPluginStr().forEach((page) => {
    page.template = page.template.split('.')[1];
    const htmlPlugin = new HtmlWebpackPlugin({
        template: page.filepath,
        jade: page.filepath,
        filename: `public${page.template}/${page.fileleft}.html`,
        chunks: ['vendors', page.chuckName],
        minify: false,
        inject: 'body'
    });

    base_plugin.push(htmlPlugin)
})

module.exports = base_plugin;