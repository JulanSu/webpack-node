const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const output = require('../output');
const base_plugin = [
    new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
            wranings: false,
            output: {
                comments: false,
                beautify: false
            }
        }
    }),
    new ExtractTextPlugin({
         filename: 'css/[name].min.css'
    }),
    new CopyWebpackPlugin([{
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../public/static'),
        force: true
    }]),
    new webpack.DefinePlugin({                          //设置变量，打包移除jade
        'process.env.NODE_ENV': JSON.stringify('production')
    })
]
/*遍历页面，添加配置*/
output.htmlsPluginStr().forEach((page)=>{
    const htmlPlugin = new HtmlWebpackPlugin({
        template: page.filepath,
        jade: page.filepath,
        filename: `${page.template}/${page.fileleft}.html`,
        chunks: ['vendors', page.chuckName],
        minify: false,
        inject: 'body'
    });

    base_plugin.push(htmlPlugin)
})

module.exports = base_plugin;