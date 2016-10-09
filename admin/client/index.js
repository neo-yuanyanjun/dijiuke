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

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/mainpage/banners" component={Banners} />
            <Route path="/mainpage/company" component={Company} />
            <Route path="/mainpage/courses" component={Courses} />
            <Route path="/mainpage/bottom" component={MainpageBottom} />
        </Route>
    </Router>,
    document.getElementById('root')
);
