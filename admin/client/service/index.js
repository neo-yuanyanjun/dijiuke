/**
 * @file 服务入口文件
 * @author Yuan Yanjun
 */

// import servicePro from './service.pro';
// import serviceDev from './service.dev';

// let service = process.env.NODE_ENV === 'production' ? servicePro : serviceDev;

// export default service;



// TODO 已经引入了 webpack-dev-server 的proxy
// 是不是可以不用 Promise 和 setTimeout 来模拟数据了？
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./service.pro');
}
else {
    module.exports = require('./service.dev');
}
