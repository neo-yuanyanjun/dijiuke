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
        return $.post('/banner/delete', {
            id: item.id
        }).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页配置 - 新增Banner图片
    addBanner(item) {
        return $.post('/banner/add', item).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },
    // 首页配置 - 编辑Banner图片
    updateBanner(item) {
        return $.post('/banner/update', item).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页配置 - 公司介绍图片获取
    getCompany() {
        return $.get('/company/get').then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页配置 - 公司介绍图片更新
    updateCompany(pic) {
        return $.post('/company/update', {pic}).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页 - 课程 - 获取
    getHomeCourses() {
        return $.get('/home_courses/get').then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页 - 课程 - 新增
    addHomeCourses(course) {
        return $.post('/home_courses/add', course).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页 - 课程 - 修改
    updateHomeCourses(course) {
        return $.post('/home_courses/update', course).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页 - 课程 - 删除
    deleteHomeCourses(course) {
        return $.post('/home_courses/delete', {id: course.id}).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页 - 底部图文混排  - 获取
    getHomeButton() {
        return $.get('/bottom/get').then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 首页 - 底部图文混排 - 更新
    updateHomeButton(content) {
        return $.post('/bottom/update', {content}).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 课程 - 获取
    getCourses() {
        return $.get('course/get').then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 课程 - 新增
    addCourse(course) {
        return $.post('course/add', course).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 课程 - 更新
    updateCourse(course) {
        return $.post('course/update', course).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 课程 - 删除
    deleteCourse(courseId) {
        return $.post('course/delete', {id: courseId}).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 子课程 - 获取
    getSubCourses(courseId) {
        return $.get('sub_course/get', {id: courseId}).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 子课程 - 新增
    addSubCourse(subCourse) {
        return $.post('sub_course/add', subCourse).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 子课程 - 获取
    updateSubCourse() {
        return $.post('sub_course/update').then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    },

    // 课程中心 - 子课程 - 删除
    deleteSubCourse(subCourseId) {
        return $.post('sub_course/delete', {id: subCourseId}).then(function (res) {
            let response = JSON.parse(res);
            return response;
        });
    }
};
