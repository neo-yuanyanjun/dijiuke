/**
 * @file webpack-dev-server的proxy配置
 * @author Yuan Yanjun
 * @date 20161016
 */

// rd 开发机ip
// const host = 'http://139.224.55.29';

// 本地开发机ip
const host = 'http://127.0.0.1:3001';

module.exports = {
    // '/file/upload': {
    //     target: 'http://127.0.0.1:3001',
    //     secure: false,
    //     bypass: function(req, res, proxyOptions) {
    //         return '/file/upload';
    //     }
    // }

    '/file/upload': {
        target: host
    },

    '/banner/get': {
        target: host
    },

    '/banner/add': {
        target: host
    },

    '/banner/update': {
        target: host
    },

    '/banner/delete': {
        target: host
    },

    '/company/get': {
        target: host
    },

    '/company/update': {
        target: host
    },

    '/home_courses/get': {
        target: host
    },

    '/home_courses/add': {
        target: host
    },

    '/home_courses/update': {
        target: host
    },

    '/home_courses/delete': {
        target: host
    },

    '/bottom/get': {
        target: host
    },

    '/bottom/update': {
        target: host
    },

    '/course/get': {
        target: host
    },

    '/course/add': {
        target: host
    },

    '/course/update': {
        target: host
    },

    '/course/delete': {
        target: host
    },

    '/sub_course/get': {
        target: host
    },

    '/sub_course/add': {
        target: host
    },

    '/sub_course/update': {
        target: host
    },

    '/sub_course/delete': {
        target: host
    },

    '/tab/get': {
        target: host
    },

    '/tab/add': {
        target: host
    },

    '/tab/update': {
        target: host
    },

    '/tab/delete': {
        target: host
    },

    '/order/get': {
        target: host
    },

    '/order/detail': {
        target: host
    }
};
