/**
 * @file 课程页面
 * @date 2017-04-23
 * @author Yuan Yanjun
 */

(function (window) {
    window.$(document).ready(function () {
        // 获取最新课程列表
        var templateStr = [
            '<% _.each(courses, function (course, idx) { %>',
                '<tr>',
                    '<td><%= course.name %></td>',
                    '<td><%= course.city %></td>',
                    '<td><%= course.teachers %></td>',
                    '<td><%= course.time %></td>',
                '</tr>',
            '<% }); %>'
        ].join('');
        var templateFn = window._.template(templateStr);
        $.get('/course', function (response) {
            response = JSON.parse(response);
            $('.module-plan table tbody').html(templateFn({
                courses: response.data.sub_courses
            }));
        });
    });
})(window);
