module.exports = function (req, res) {
    var response = {
        code: 0,
        message: '',
        data: {
            banners: [
                {
                    position: 1,
                    pic: 'http://img2.imgtn.bdimg.com/it/u=3957258154,4279301996&fm=21&gp=0.jpg',
                    link: 'http://www.baidu.com',
                    id: 1
                },
                {
                    position: 2,
                    pic: 'http://img0.imgtn.bdimg.com/it/u=1186915812,538485030&fm=21&gp=0.jpg',
                    link: 'http://www.alibaba.com',
                    id: 2
                },
                {
                    position: 3,
                    pic: 'http://h.hiphotos.baidu.com/zhidao/pic/item/0df431adcbef7609bca7d58a2adda3cc7cd99e73.jpg',
                    link: 'http://www.qq.com',
                    id: 3
                }
            ]
        }
    };
    return response;
};
