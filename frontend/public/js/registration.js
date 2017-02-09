/**
 * @file 报名页面
 * @author Yuan Yanjun
 * @date 2017.02.10
 */
;
(function (window) {
    $(document).ready(function () {
        initUiNumber();
    });

    function initUiNumber() {
        $('.ui-number').each(function (idx, ele) {
            var $this = $(this);
            var min = parseInt($this.data('min'), 10) || 0;
            var max = parseInt($this.data('max'), 10) || 10000;
            var initialValue = parseInt($this.data('value'), 10) || min;

            var $input = $this.find('.number-input input');

            setValue(initialValue);

            $this.find('.btn-plus').on('tap', function (e) {
                var value = parseInt($input.val(), 10) || 0;
                value = Math.min(max, Math.max(min, value - 1));
                $this.find('.number-input input').val(value);
            });

            $this.find('.btn-add').on('tap', function (e) {
                var value = parseInt($input.val(), 10) || 0;
                value = Math.min(max, Math.max(min, value + 1));
                $this.find('.number-input input').val(value);
            });

            $input.on('input', function (e) {
                var value = $(this).val();
                if (value === '' || value === '-') {
                    return;
                }
                value = parseInt($(this).val(), 10) || 0;

                value = Math.min(max, Math.max(min, value));
                setValue(value);
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
