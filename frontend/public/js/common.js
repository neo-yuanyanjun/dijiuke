/**
 * @file 一些公js： 全局tab
 * @date 2017-02-14
 * @author Yuan Yanjun
 */

$(document).ready(function () {
    // 全局tab
    $('.header .btn-show-menu').on('tap', function () {
        var xhr = $.ajax({
            type: 'GET',
            url: '/tab'
        });
        // debugger;
        xhr.onload = function (response) {
            debugger;
            response = window.JSON.parse(response);

            response = {
                code: 0,
                message: null,
                data: {
                    menus: [{
                        position: 1,
                        name: '首页',
                        link: '/',
                        icon: ''
                    }, {
                        position: 2,
                        name: '广告文案',
                        link: '/',
                        icon: ''
                    }, {
                        position: 3,
                        name: '品牌策划',
                        link: '/',
                        icon: ''
                    }, {
                        position: 4,
                        name: '我的课程',
                        link: '/myCourses',
                        icon: ''
                    }]
                }
            };

            var templateStr = [
                '<div class="module-global-tabs">',
                '<div class="wrapper-global-tabs-body">',
                '<ul class="tab-list">',
                '<% for (var i = 0; i < menus.length; i++) { %>',
                '<li>',
                '<%= menus[i].name %>',
                '</li>',
                '<% } %>',
                '</ul>',
                '</div>',
                '<div class="arrows"></div>',
                '</div>'
            ].join('');
            var htmlStr = window._.template(templateStr)(response.data);
            $(htmlStr).appendTo('body');
        };
    });
});
