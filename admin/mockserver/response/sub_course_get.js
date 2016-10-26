
module.exports = function (req, res) {
    var response = {
        code: 0,
        message: '',
        data: {
            sub_courses: [
                {
                    id: 1,
                    position: 1,
                    banner: 'http://img6.bdstatic.com/img/image/smallpic/dongman1020.jpg',
                    code: '111111',
                    time: '2010-10-11',
                    city: '北京',
                    teachers: '大成',
                    describe: '课程描述1',
                    price: 1000,
                    max_enter_num: 10,
                    button_word: '去1看看'
                },
                {
                    id: 2,
                    position: 2,
                    banner: 'http://img6.bdstatic.com/img/image/smallpic/touxiang1020.jpg',
                    code: '2222222',
                    time: '2010-10-21',
                    city: '北京',
                    teachers: '大成',
                    describe: '课程描述2',
                    price: 2000,
                    max_enter_num: 20,
                    button_word: '去2看看'
                },
                {
                    id: 3,
                    position: 3,
                    banner: 'http://img6.bdstatic.com/img/image/smallpic/PPT1020.jpg',
                    code: '333333',
                    time: '2010-10-31',
                    city: '北京',
                    teachers: '大成',
                    describe: '课程描述3',
                    price: 3000,
                    max_enter_num: 30,
                    button_word: '去2看看'
                }
            ]
        }
    };

    var length = response.data.sub_courses.length;
    var l = Math.floor(Math.random() * (length + 1));

    response.data.sub_courses = response.data.sub_courses.slice(0, l);

    return response;
};
