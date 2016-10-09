import $ from 'jquery';

export default {
    getBannerList() {
        // return $.get().then(function (res){
        //     let response = JSON.stringify(res);
        //     return response;
        // });
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
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
                resolve(response);
            }, 1000);
        });
    },
    deleteBanner(item) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var response = {
                    code: 0,
                    message: '',
                    data: null
                };
                resolve(response);
            }, 50);
        });
    }
};
