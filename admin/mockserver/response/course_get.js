

var subCourses = [
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
        max_enter_num: 50,
        button_word: '去看看'
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
        price: 1000,
        max_enter_num: 50,
        button_word: '去看看'
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
        price: 1000,
        max_enter_num: 50,
        button_word: '去看看'
    }
];

module.exports = function (req, res) {
    var response = {
        code: 0,
        message: '',
        data: {
            courses: [
                {
                    id: 1,
                    position: 1,
                    code: '1',
                    name: '广告文案',
                    edit_time: '2016-10-01',
                    course_url: 'http://www.dijiuketang.com',
                    course_page_info: '广告文案培训系列课程',
                    sub_courses: subCourses,
                    consult_word: '咨询一下',
                    consult_link_url: 'http://www.dijiuketang.com'
                },
                {
                    id: 2,
                    position: 2,
                    code: '2',
                    name: '创意',
                    edit_time: '2016-10-21',
                    course_url: 'http://www.dijiuketang.com',
                    course_page_info: '创意-培训系列课程',
                    sub_courses: subCourses,
                    consult_word: '咨询2下',
                    consult_link_url: 'http://www.dijiuketang.com'
                },
                {
                    id: 3,
                    position: 3,
                    code: '3',
                    name: '互动',
                    edit_time: '2016-10-31',
                    course_url: 'http://www.dijiuketang.com',
                    course_page_info: '互动-培训系列课程',
                    sub_courses: subCourses,
                    consult_word: '咨询3下',
                    consult_link_url: 'http://www.dijiuketang.com'
                }
            ]
        }
    };
    return response;
};
