/**
 * @file 生成环境数据请求接口
 * @author Yuan Yanjun
 * @date 2016.10.15
 */

import $ from 'jquery';

export default {
    // 首页配置 - 获取Banner列表
    getBannerList() {
        return $.get('/path/to/be/determilate').then(function (res) {
            let response = JSON.stringify(res);
            return response;
        });
    },
    // 首页配置 - 删除Banner图片
    deleteBanner(item) {
        return $.get('/path/to/be/determilate').then(function (res) {
            let response = JSON.stringify(res);
            return response;
        });
    }
};
