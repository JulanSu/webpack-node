const webpack = require('webpack'); //
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import');

//获取所有入口文件配置
const output = require('./output');
//获取插件配置
const dev_plugin = require('./webpack_config/dev.plugin');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = {
    devtool: '#source-map',
    entry: output.entryStr(),
    output: {
        filename: 'public/js/[name].min.js',
        path: path.join(__dirname, 'public'),
        //publicPath 上线替换真实的http,如果设置为/则需把dist下的文件放在项目的根目录
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: (loader) => [
                                    postcssImport({         //增加import兼容
                                        addDependencyTo: webpack
                                    }),
                                    require('autoprefixer')(), //CSS浏览器兼容
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                            }
                        },
                        {
                            loader: "sass-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: (loader) => [
                                    postcssImport({
                                        addDependencyTo: webpack
                                    }),
                                    require('autoprefixer')(), //CSS浏览器兼容
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.jade$/,
                loader: "pug-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'public/static/images/[name].[ext]',
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'public/static/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: dev_plugin,
    devServer: {
        contentBase: './',
        host: 'localhost',
        compress: true,
        port: 9000,
        inline: true,
        hot: true
    }
};