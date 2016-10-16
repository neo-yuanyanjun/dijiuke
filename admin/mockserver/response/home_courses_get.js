module.exports = function (req, res) {
    return {
        code: 0,
        message: null,
        data: {
            courses: [
                {
                    position: 1,
                    banner: 'http://img6.bdstatic.com/img/image/smallpic/xiaoqingxin1014.jpg',
                    time: '2016/11/01',
                    city: '北京',
                    describe: '这是一门关于产品狗的培训课程',
                    price: 100,
                    button_word: '查看课程详情',
                    button_link: 'http://www.baidu.com',
                    name: '如何成为一名合格的产品',
                    id: 1
                },
                {
                    position: 2,
                    banner: 'http://img6.bdstatic.com/img/image/smallpic/xiaoqingxin1014.jpg',
                    time: '2016/12/12',
                    city: '上海',
                    describe: '这是一门关于技术大咖的培训课程',
                    price: 200,
                    button_word: '查看课程详情',
                    button_link: 'http://www.baidu.com',
                    name: '如何成为一名艺术家',
                    id: 2
                },
                {
                    position: 3,
                    banner: 'http://img6.bdstatic.com/img/image/smallpic/xiaoqingxin1014.jpg',
                    time: '2017/01/01',
                    city: '深圳',
                    describe: '这是一门关于营销的培训课程',
                    price: 300,
                    button_word: '查看课程详情',
                    button_link: 'http://www.baidu.com',
                    name: '网络营销专题',
                    id: 3
                }
            ]
        }
    }
}