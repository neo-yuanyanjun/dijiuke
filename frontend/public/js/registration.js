/**
 * @file 报名页面
 * @author Yuan Yanjun
 * @date 2017.02.10
 */
;
(function (window) {
    $(document).ready(function () {
        initUiNumber();

        $('.form-row select[name="course"]').on('change', function (evt) {
            var course = $(this).find('option:checked').text();
            $('.summary .course-name').text(course);
        });

        $('.form-row select[name="city"]').on('change', function (evt) {
            var city = $(this).find('option:checked').text();
            $('.summary .city').text(city);
        });

        $('.form-row select[name="time"]').on('change', function (evt) {
            var time = $(this).find('option:checked').text();
            $('.summary .time').text(time);
        });

        window.UI['registration-num'].onChange = function (evt) {
            var num = evt.data.value;
            $('.summary .num').text(evt.data.value);
            var $radio = $('.form-row input[name="cost"]:checked');
            var reg = /[0-9\.]+/ig;
            var priceText = $radio.parent().text();
            var price = parseFloat(priceText.match(reg)[0]);
            $('.summary .cost').text(
                $radio.val() === 1
                ? '全款费用金额为：' + num * price
                : '预约费用金额伟：' + num * price
            );
        };

        $('.form-row input[name="cost"][type="radio"]').on('change', function (evt) {
            var reg = /[0-9\.]+/ig;
            var priceText = $(this).parent().text();
            var price = parseFloat(priceText.match(reg)[0]);
            var num = window.UI['registration-num'].getValue();
            $('.summary .cost').text(
                $(this).val() === 1
                ? '全款费用金额为：' + num * price
                : '预约费用金额伟：' + num * price
            );
        });
    });

    function initUiNumber() {
        window.UI = window.UI || {};
        $('.ui-number').each(function (idx, ele) {
            var $this = $(this);
            var $input = $this.find('.number-input input');
            var uiInstance = {};
            window.UI[$this.data('ui-id')] = uiInstance;

            uiInstance.getValue = function () {
                return $input.val();
            };

            var min = parseInt($this.data('min'), 10) || 0;
            var max = parseInt($this.data('max'), 10) || 10000;
            var initialValue = parseInt($this.data('value'), 10) || min;

            setValue(initialValue);

            $this.find('.btn-plus').on('tap', function (e) {
                var value = parseInt($input.val(), 10) || 0;
                value = Math.min(max, Math.max(min, value - 1));
                $this.find('.number-input input').val(value);
                uiInstance.onChange && uiInstance.onChange.call(uiInstance, {
                    data: {
                        value: value
                    }
                });
            });

            $this.find('.btn-add').on('tap', function (e) {
                var value = parseInt($input.val(), 10) || 0;
                value = Math.min(max, Math.max(min, value + 1));
                $this.find('.number-input input').val(value);
                uiInstance.onChange && uiInstance.onChange.call(uiInstance, {
                    data: {
                        value: value
                    }
                });
            });

            $input.on('input', function (e) {
                var value = $(this).val();
                if (value === '' || value === '-') {
                    return;
                }
                value = parseInt($(this).val(), 10) || 0;

                value = Math.min(max, Math.max(min, value));
                setValue(value);
                uiInstance.onChange && uiInstance.onChange.call(uiInstance, {
                    data: {
                        value: value
                    }
                });
            });

            function setValue(val) {
                $input.val(val);
            }
        });


        var validators = {
            'int': function (value) {
                return Math.floor(value) === value;
            }
        };
    }
})(window);
