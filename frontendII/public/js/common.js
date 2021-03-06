/**
 * @file 第九课堂 - 公用js - 头部导航栏
 * @date 2017-03-27
 * @author Yuan Yanjun
 */

$('body').on('ready', function () {
    var $btn = $('.header .btn-register');
    var $navs = $('.header .navs');
    $btn.on('touchend', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $navs.show();
    });

    $('body').on('touchend', function () {
        $navs.hide();
    });

    $navs.on('touchend', function (e) {
        e.stopPropagation();
    });
});
