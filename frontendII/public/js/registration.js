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
        var channel =  $('input[type="radio"][name="pay"]').val();
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
            }
        })
        .done(function (res) {
            var charge = res.data.charge;
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
        });
    }
});
