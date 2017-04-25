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
        var htmlStr = [
            '<div class="module-consult-bar">',
                '<div class="module-consult-bar-main">',
                    '<div class="module-consult-bar-item module-consult-bar-item-telephone">',
                        '<a href="#" class="">',
                            '电话<span class="telephone">：400-850-8368</span><span class="icon-phone"></span>',
                        '</a>',
                    '</div>',
                    '<div class="module-consult-bar-item module-consult-bar-item-consult">',
                        '<a href="#" class="">在线咨询</a>',
                    '</div>',
                    '<div class="module-consult-bar-item module-consult-bar-item-register">',
                        '<a href="#" class="">冷静报名</a>',
                    '</div>',
                    '<div class="module-consult-bar-close"></div>',
                '</div>',
            '</div>'
        ].join('');
        $('body').append(htmlStr);
        $('.module-consult-bar-close').on('click', function () {
            $('.module-consult-bar').remove();
        });
    })();
});
