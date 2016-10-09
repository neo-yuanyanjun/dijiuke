/**
 * @file 入口文件
 * @author Yuan Yanjun
 * @date 2016.10.09
 */

import {Router, Route, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './component/App';

// 首页相关配置页面
import Banners from './component/mainpage/Banners';
import Company from './component/mainpage/Company';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/mainpage/banners" component={Banners} />
            <Route path="/mainpage/Company" component={Company} />
        </Route>
    </Router>,
    document.getElementById('root')
);
