/**
 * @file webpack dev sever proxy 上传文件又好使了，这个文件暂时不需要了。
 *
 * @author Yuan Yanjun
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
app.use(express.static('uploads'));
app.use(webpackDevMiddleware(compiler, {}));
app.use(webpackHotMiddleware(compiler));


// 文件上传服务
// 这个服务写在mock-server里会有问题，响应一直处于pending状态
// 用“advanced restful client” 测试能转发到mock-server那边
// 但是在页面上有问题
// 好像又没有这个bug了
// 找到问题原因了：
// 1. 我本地开了green vpn的问题(好像不是)
// 2. 有可能是文件上传的时候，需要把上传的二进制数据也转发过去，
// mock服务还有接受完二进制数据就直接res.end了，导致出错

// app.use('/file/upload', function (req, res) {
//     var response = {
//         code: 0,
//         message: null,
//         data: 'http://img6.bdstatic.com/img/image/smallpic/chongwu1014.jpg'
//     };

//     // ant-design的upload插件对相应数据格式有特殊要求，请参考jquery-file-upload的文档
//     // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup
//     // var response = {
//     //   files: [{
//     //     "name": "picture2.jpg",
//     //     "size": 841946,
//     //     "url": "http:\/\/example.org\/files\/picture2.jpg",
//     //     "thumbnailUrl": "http:\/\/example.org\/files\/thumbnail\/picture2.jpg",
//     //     "deleteUrl": "http:\/\/example.org\/files\/picture2.jpg",
//     //     "deleteType": "DELETE"
//     //   }]
//     // };
//     res.end(JSON.stringify(response));
// });


var multer = require('multer');
var upload = multer({dest: 'uploads/'});
app.post('/file/upload', upload.single('user_file'), function (req, res, next) {
    /* eslint-disable */
    var extension = '';
    var lastIndex = req.file.originalname.lastIndexOf('.');
    if (lastIndex !== -1) {
        extension = req.file.originalname.substr(lastIndex);
    }
    res.end(JSON.stringify({
        code: 0,
        message: null,
        data: {
            // file_path: req.file.path + extension
            file_path: req.file.filename
        }
    }));
});



// Set up the proxy.
if (devConfig.proxy) {
    Object.keys(devConfig.proxy).forEach(function (context) {
        app.use(proxyMiddleware(context, devConfig.proxy[context]));
    });
}

if (devConfig.historyApiFallback) {
    // console.log('404 responses will be forwarded to /index.html');

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(devConfig.contentBase, 'index.html'));
    });
}

app.listen(devConfig.port || 8080, function () {
    /* eslint-disable */
    console.log('Development server listening on port ' + devConfig.port);
});
