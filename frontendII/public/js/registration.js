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
});
