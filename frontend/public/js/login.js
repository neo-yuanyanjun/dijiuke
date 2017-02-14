/**
 * @file 第九课堂 - 登录页面
 * @author Yuan Yanjun
 * @date 2017.02.08
 */

;(function (window) {
    $('#btn-get-verification-code').on('tap', function () {
        $.post('/sms', {
            mobile: $('#telephone').val()
        }, function (response) {

        });
    });
})(window);
