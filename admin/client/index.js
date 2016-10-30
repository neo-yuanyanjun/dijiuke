/**
 * @file 入口文件
 * @author Yuan Yanjun
 * @date 2016.10.09
 */

import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './component/App';
import Home from './component/Home/index.js';

// 首页相关配置页面
import Banners from './component/mainpage/Banners';
import Company from './component/mainpage/Company';
import Courses from './component/mainpage/Courses';
import MainpageBottom from './component/mainpage/Bottom';
import Menu from './component/Menu';
import OrderList from './component/Order/List';
import OrderDetail from './component/Order/detail';
import Administrators from './component/Authority/Administrators';

// 课程列表
import CourseList from './component/Course/List';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/mainpage/banners" component={Banners} />
            <Route path="/mainpage/company" component={Company} />
            <Route path="/mainpage/courses" component={Courses} />
            <Route path="/mainpage/bottom" component={MainpageBottom} />
            <Route path="/course/list" component={CourseList} />
            <Route path="/menu" component={Menu} />
            <Route path="/order" component={OrderList} />
            <Route path="/order/:id" component={OrderDetail} />
            <Route path="/authority" component={Administrators} />
        </Route>
    </Router>,
    document.getElementById('root')
);
