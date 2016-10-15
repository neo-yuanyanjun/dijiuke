/**
 * @file webpack-dev-server的proxy配置
 * @author Yuan Yanjun
 * @date 20161016
 */

module.exports = {
    'file/upload': {
        target: 'https://other-server.example.com',
        secure: false,
        bypass: function(req, res, proxyOptions) {
            return 'mockserver/file_upload.json';
        }
    }
};
