module.exports = function (req, res) {
    var response = {
        code: 0,
        message: '',
        data: {
            sub_courses_orders: [
                {
                    position: 1,
                    code: 'code 1',
                    time: '20161010',
                    city: '北京',
                    enter_num: 10,
                    id: 1
                },
                {
                    position: 2,
                    code: 'code 2',
                    time: '20161020',
                    city: '上海',
                    enter_num: 20,
                    id: 2
                },
                {
                    position: 3,
                    code: 'code 3',
                    time: '20161030',
                    city: '深圳',
                    enter_num: 30,
                    id: 3
                }
            ]
        }
    };
    return response;
};
