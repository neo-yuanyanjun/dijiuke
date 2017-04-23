/**
 * @file 第九课堂 - 报名页面
 * @date 2017-03-26
 * @author Yuan Yanjun
 */

$('body').on('ready', function () {
    var $numOfPerson = $('.field-num input[type="number"]');
    var $sumCost = $('.sum span');
    var $result = $('.result');

    updateSummary();

    $('input[name="course"][type="radio"]').on('change', updateSummary);
    $numOfPerson.on('change', updateSummary);

    function updateSummary() {
        var numOfPerson = $numOfPerson.val();
        numOfPerson = parseFloat(numOfPerson) || 0;

        var $checkedRadio = $('input[name="course"][type="radio"]:checked');
        var $label = $checkedRadio.parent('label');
        var courseName = $label.data('course-name');
        var coursePrice = $label.data('course-price');
        coursePrice = parseFloat(coursePrice) || 0;
        var courseCity = $label.data('course-city');
        var courseTime = $label.data('course-time');
        $result.html(
            courseTime + '的'
            + courseCity
            + '《' + courseName + '》' + '课程'
            + numOfPerson + '个名额'
        );

        $sumCost.html(numOfPerson * coursePrice);
    }

    $('.btn-pay').on('click', pay);
    $('.btn-pay').on('tap', pay);

    function pay(e) {
        var $checkedRadio = $('input[name="course"][type="radio"]:checked');
        var $label = $checkedRadio.parent('label');
        var courseId = $label.data('course-id');
        var name = $('input[type="text"][name="username"]').val();
        var tel = $('input[type="tel"][name="tel"]').val();
        var email = $('input[type="email"][name="email"]').val();
        var num = $('input[type="number"][name="num"]').val();
        var channel =  $('input[type="radio"][name="pay_channel"]:checked').val();
        $.ajax({
            type: 'POST',
            url: '/pay',
            data: {
                courseId: courseId,
                name: name,
                tel: tel,
                email: email,
                num: num,
                channel: channel
            },
            success: paySucess
        });

        function paySucess(res) {
            res = JSON.parse(res);
            var charge = res.data.charge;
            if (shouldShowPayQRcode()) {
                showPayQRcode(charge.credential.wx_pub_qr);
                return;
            }
            window.pingpp.createPayment(charge, function (result, err) {
                // console.log(result);
                // console.log(err.msg);
                // console.log(err.extra);
                if (result === 'success') {
                    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                }
                else if (result === 'fail') {
                    // charge 不正确或者微信公众账号支付失败时会在此处返回
                }
                else if (result === 'cancel') {
                    // 微信公众账号支付取消支付
                }
            });
        }
    }

    // 微信支付以二维码的方式支付
    function shouldShowPayQRcode() {
        var parChannel = $('input[type="radio"][name="pay_channel"]:checked').val();
        return parChannel === '1';
    }

    // showPayQRcode('https://img6.bdstatic.com/img/image/smallpic/h2.jpg');
    function showPayQRcode(url) {
        var htmlStr = [
            '<div class="wrapper-modal">',
                '<div class="wrapper-modal-content">',
                    '<div class="wrapper-QRcode" id="wrapper-QRcode"></div>',
                    '<div class="wrapper-guide">',
                        '操作流程如下：<br />',
                        '1. 保存当前页面截图；<br />',
                        '2. 打开微信app，扫一扫，选择相册里保存的截图。',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
        $(htmlStr).appendTo('body');
        new window.QRCode(document.getElementById('wrapper-QRcode'), {
            text: url,
            width: 128,
            height: 128,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: window.QRCode.CorrectLevel.H
        });
    }
});
