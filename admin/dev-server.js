/**
 * webpack dev sever proxy 上传文件又好使了，这个文件暂时不需要了。
 *
 * @file dev server
 */


var express = require('express');
var path = require('path');
var webpackConfig = require('./webpack.config');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxyMiddleware = require('http-proxy-middleware');

// var bodyParser = require('body-parser');

var devConfig = webpackConfig.devServer;
var app = express();
var compiler = webpack(webpackConfig);

// app.use(bodyParser());
app.use(express.static(devConfig.contentBase || __dirname));
app.use(webpackDevMiddleware(compiler, {}));
app.use(webpackHotMiddleware(compiler));


// 文件上传服务
// 这个服务写在mock-server里会有问题，响应一直处于pending状态
// 用“advanced restful client” 测试能转发到mock-server那边
// 但是在页面上有问题
// 好像又没有这个bug了
// app.use('/file/upload', function (req, res) {
//     var response = {
//         code: 0,
//         message: null,
//         data: 'http://img6.bdstatic.com/img/image/smallpic/chongwu1014.jpg'
//     };
//     res.end(JSON.stringify(response));
// });

// Set up the proxy.
if(devConfig.proxy) {
  Object.keys(devConfig.proxy).forEach(function(context) {
    app.use(proxyMiddleware(context, devConfig.proxy[context]));
  });
}

if(devConfig.historyApiFallback) {
  console.log('404 responses will be forwarded to /index.html');

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(devConfig.contentBase, 'index.html'));
  });
}

app.listen(devConfig.port || 8080, function() {
  console.log('Development server listening on port ' + devConfig.port);
});