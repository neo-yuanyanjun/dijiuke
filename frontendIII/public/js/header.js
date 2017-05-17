/**
 * @file 第九课堂 - 公用js - 头部导航栏
 * @date 2017-04-11
 * @author Yuan Yanjun
 */

$('body').on('ready', function () {
    var $btn = $('.header .btn-show-navs');
    var $navs = $('.header .navs');
    $btn.on('touchend', function (e) {
        e.preventDefault();
        e.stopPropagation();
        // $navs.show();
        $navs.toggle();
    });

    $('body').on('touchend', function () {
        $navs.hide();
    });

    $navs.on('touchend', function (e) {
        e.stopPropagation();
    });

    // 咨询栏
    (function () {
        var omit = ['train.html', 'pay-success.html', 'home.html', 'marry.html', 'pay.html', '/enter'];
        var ret = false;
        for (var i = 0; i < omit.length; i++) {
            if (window.location.pathname.indexOf(omit[i]) > -1) {
                ret = true;
                break;
            }
        }
        if (ret) {
            return;
        }
        var htmlStr = [
            '<div class="module-consult-bar">',
                '<div class="module-consult-bar-main">',
                    '<div class="module-consult-bar-item module-consult-bar-item-telephone">',
                        '<a href="tel:400-850-8368" class="">',
                            '电话<span class="telephone">：400-850-8368</span><span class="icon-phone"></span>',
                        '</a>',
                    '</div>',
                    '<div class="module-consult-bar-item module-consult-bar-item-consult">',
                        '<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1730717213&site=qq&menu=yes" class="">在线咨询</a>',
                    '</div>',
                    '<div class="module-consult-bar-item module-consult-bar-item-register">',
                        '<a href="/enter" class="">冷静报名</a>',
                    '</div>',
                    '<div class="module-consult-bar-close"></div>',
                '</div>',
            '</div>',
            '<div class="show-consult-bar"></div>'
        ].join('');
        $('body').append(htmlStr);
        $('.module-consult-bar-close').on('click', function () {
            // $('.module-consult-bar').remove();
            $('.module-consult-bar').hide();
            $('.show-consult-bar').show();
        });
        $('.show-consult-bar').on('click', function () {
            $('.module-consult-bar').show();
            $('.show-consult-bar').hide();
        });
    })();
});
