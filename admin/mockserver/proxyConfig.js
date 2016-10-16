/**
 * @file webpack-dev-server的proxy配置
 * @author Yuan Yanjun
 * @date 20161016
 */

module.exports = {
    // '/file/upload': {
    //     target: 'http://127.0.0.1:3001',
    //     secure: false,
    //     bypass: function(req, res, proxyOptions) {
    //         return '/file/upload';
    //     }
    // }
    
    '/file/upload': {
        target: 'http://127.0.0.1:3001'
    },

    '/banner/get': {
        target: 'http://127.0.0.1:3001'
    },

    '/banner/add': {
        target: 'http://127.0.0.1:3001'
    },

    '/banner/update': {
        target: 'http://127.0.0.1:3001'
    },

    '/banner/delete': {
        target: 'http://127.0.0.1:3001'
    },

    '/company/get': {
        target: 'http://127.0.0.1:3001'
    },

    '/company/update': {
        target: 'http://127.0.0.1:3001'
    }
};
