/**
 * 这个文件不需要了，已经配置了mock-server
 * @file 开发环境的虚拟数据接口
 * @author Yuan Yanjun
 * @date 2016.10.15
 */

export default {
    // 首页配置 - 获取Banner列表
    getBannerList() {
        console.log('service.dev.js getBannerList');
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let response = {
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
                resolve(response);
            }, 1000);
        });
    },
    // 首页配置 - 删除Banner图片
    deleteBanner(item) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                let response = {
                    code: 0,
                    message: '',
                    data: null
                };
                resolve(response);
            }, 50);
        });
    }
};
