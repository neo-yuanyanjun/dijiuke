/**
 * @file mock server
 * @author Yuan Yanjun
 * @date 2016.10.16
 */

var express = require('express');
var path = require('path');

var config = require('./mock-server.config');

var app = express();

app.use(express.static(__dirname));

app.use(function (req, res, next) {
    // console.log('*******************************');
    // console.log('request path: ', req.path);
    // console.log('*******************************');
    var reqPath = req.path;
    if (reqPath[0] === '/') {
        reqPath = reqPath.substr(1);
    }
    var fileName = reqPath.replace(/\//, '_') + '.js';
    var filePath = path.join(__dirname, config.responseBase, fileName);
    try {
        if (require.cache[filePath]) {
            delete require.cache[filePath];
        }
        var responseFun = require(filePath);
    }
    catch (error) {
        console.log('#########################################');
        console.log(filePath + ' not exist');
    }

    if (responseFun) {
        var response = responseFun(req, res);
        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        // console.log('response: ', response);
        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        // res.json(response);
        res.end(JSON.stringify(response));
    }
    else {
        next();
    }
});

app.listen(config.port || 3001, function() {
    console.log('mock server listening on port ' + (config.port || 3001));
});
