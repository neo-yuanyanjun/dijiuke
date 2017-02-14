/**
 * @file 一些公js： 全局tab
 * @date 2017-02-14
 * @author Yuan Yanjun
 */

$(document).ready(function () {
    // 全局tab
    $('.header .btn-show-menu').on('tap', function () {
        $.get('/tab', function (response) {
            // response = JSON.parse(response);
            var templateStr = [
                '<div class="module-global-tabs">',
                    '<div class="wrapper-global-tabs-body">',
                        '<div class="btn-show-menu"></div>',
                        '<ul class="tab-list">',
                            '<% for (var i = 0; i < menus.length; i++) { %>',
                            '<li>',
                                '<% console.log(menus[i]); %>',
                                '<a href="<%= menus[i].link %>">',
                                    '<img class="tab-icon" src="<%= menus[i].icon %>" />',
                                    '<span class="tab-name"><%= menus[i].name %></span>',
                                '</a>',
                            '</li>',
                            '<% } %>',
                        '</ul>',
                    '</div>',
                    '<div class="arrows"></div>',
                '</div>'
            ].join('');
            var htmlStr = window._.template(templateStr)(response.data);
            var $moduleTabs = $(htmlStr);
            $moduleTabs.appendTo('body').find('.btn-show-menu').on('tap', function (evt) {
                $moduleTabs.remove();
            });
            $moduleTabs.on('swipeLeft', function () {
                $moduleTabs.remove();
            });
        });
    });
});
