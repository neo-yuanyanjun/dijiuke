/**
 * @file 服务入口文件
 * @author Yuan Yanjun
 */

// import servicePro from './service.pro';
// import serviceDev from './service.dev';

// let service = process.env.NODE_ENV === 'production' ? servicePro : serviceDev;

// export default service;


if (process.env.NODE_ENV === 'production') {
    module.exports = require('./service.pro');
}
else {
    module.exports = require('./service.dev');
}
