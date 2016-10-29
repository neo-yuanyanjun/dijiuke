module.exports = function (req, res) {
    var response = {
        code: 0,
        message: '',
        data: {
            menus: [
                {
                    position: 1,
                    name: '主页',
                    link: 'menu item links 1',
                    id: 1
                },
                {
                    position: 2,
                    name: '广告文案',
                    link: 'menu item links 2',
                    id: 2
                },
                {
                    position: 3,
                    name: '我的订单',
                    link: 'menu item links 3',
                    id: 3
                }
            ]
        }
    };
    return response;
};
