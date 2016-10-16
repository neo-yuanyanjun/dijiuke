module.exports = function (req, res) {
    var response = {
        code: 0,
        message: '',
        data: {
            banners: [
                {
                    position: 1,
                    pic: 'http://img0.bdstatic.com/img/image/shouye/xinshouye/weimei111.jpg',
                    link: 'http://www.baidu.com',
                    id: 1
                },
                {
                    position: 2,
                    pic: 'http://img0.bdstatic.com/img/image/shouye/xinshouye/weimei111.jpg',
                    link: 'http://www.baidu.com',
                    id: 2
                },
                {
                    position: 3,
                    pic: 'http://img0.bdstatic.com/img/image/shouye/xinshouye/weimei111.jpg',
                    link: 'http://www.baidu.com',
                    id: 3
                }
            ]
        }
    };
    return response;
};
