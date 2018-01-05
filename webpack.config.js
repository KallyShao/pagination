/*
* @Author: Administrator
* @Date:   2017-11-15 15:37:16
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-05 17:06:35
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置，dev / online
var WEBPACK_ENV        = process.env.WEBPACK_ENV || 'dev';

//获取HtmlWebpackPlugin参数的方法
var getHtmlPlugin = function(name, title){
    return {
        template: './src/view/'+ name +'.html',    //html原始的模板
        filename: 'view/'+ name +'.html',    //目标文件的位置，以output中的path作为相对路径,也就是打包之后存放的路径和文件名
        title: title,
        inject: true,   //自动添加js和css
        hash: true, //给css加版本号
        chunks: ['common', name] //需要打包的模块，对应的是entry中的js模块
    };
};

//webpack config
var config =  {
     entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'fileupload': ['./src/page/fileupload/index.js'],
        'fileupload-FormData': ['./src/page/fileupload-FormData/index.js'],
     },
     output: {
         path: './dist',    //存放文件的路径，最终生成文件的目录
         publicPath: '/dist',    //访问文件所用的路径
         filename: 'js/[name].js'
     },
     externals: {
        'jquery': 'window.jQuery'
     },
     plugins: [
         //打包css到单独文件
         new ExtractTextPlugin("css/[name].css"),
        //处理html模板
        new HtmlWebpackPlugin(getHtmlPlugin('index', '首页')),
        new HtmlWebpackPlugin(getHtmlPlugin('fileupload', '文件上传测试')),
        new HtmlWebpackPlugin(getHtmlPlugin('fileupload-FormData', '多文件上传测试'))
     ],
    module: {
        loaders: [  
            {  
                test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader")  //样式的处理
            },
            {
                test: /\.string$/, 
                loader: 'html-loader'
            }

        ]  
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            service: __dirname + '/src/service'
        }
    } 
 };

 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8086/');
 }
 module.exports = config;