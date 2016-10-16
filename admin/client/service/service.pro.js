/**
 * @file 生成环境数据请求接口
 * @author Yuan Yanjun
 * @date 2016.10.15
 */

import $ from 'jquery';

export default {
    // 首页配置 - 获取Banner列表
    getBannerList() {
        return $.get('/banner/get').then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },
    // 首页配置 - 删除Banner图片
    deleteBanner(item) {
        debugger;
        return $.post('/banner/delete', {
            id: item.id
        }).then(function (res) {
            let response = JSON.stringify(res);
            return response;
        });
    },

    // 首页配置 - 新增Banner图片
    addBanner(item) {
        return $.post("/banner/add", item).then(function (res) {
            let response = JSON.stringify(res);
            return response;
        });
    },
    // 首页配置 - 编辑Banner图片
    updateBanner(item) {
        return $.post("/banner/update", item).then(function (res) {
            let response = JSON.stringify(res);
            return response;
        });
    }
};
