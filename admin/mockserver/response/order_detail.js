module.exports = function (req, res) {
    function rand(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    // state: 订单状态，－1 全部，0 未支付，1 已支付
    var response = {
        code: 0,
        message: '',
        data: {
            total: rand(500, 2000),
            sub_course_orders: [
                {
                    username: '用户1',
                    student_name: '真实姓名1',
                    student_phone_num: '手机号1',
                    student_email: '邮箱1',
                    time: '报名时间1',
                    total_price: 1000,
                    enter_num: 50,
                    state: 0,
                    pay_channel: 0
                },
                {
                    username: '用户2',
                    student_name: '真实姓名2',
                    student_phone_num: '手机号2',
                    student_email: '邮箱2',
                    time: '报名时间2',
                    total_price: 2000,
                    enter_num: 60,
                    state: 1,
                    pay_channel: 1
                },
                {
                    username: '用户3',
                    student_name: '真实姓名3',
                    student_phone_num: '手机号3',
                    student_email: '邮箱3',
                    time: '报名时间3',
                    total_price: 3000,
                    enter_num: 70,
                    state: -1,
                    pay_channel: 0
                },
                {
                    username: '用户4',
                    student_name: '真实姓名4',
                    student_phone_num: '手机号4',
                    student_email: '邮箱4',
                    time: '报名时间4',
                    total_price: 4000,
                    enter_num: 80,
                    state: 2,
                    pay_channel: 2
                }
            ]
        }
    };
    return response;
};
