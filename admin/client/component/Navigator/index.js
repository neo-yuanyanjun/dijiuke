/**
 * @file component navigator
 * @author Yuan Yanjun
 * @date 2010.10.09
 */
import React, {Component} from 'react';
import style from './navigator.css';
import {Link} from 'react-router';

export default class App extends Component {
    render() {
        return (
            <div className={style.navigator}>
                <div className={style.section}>
                    <div className={style.title}>首页管理</div>
                    <ul>
                        <li>
                            <Link to='/mainpage/banners' activeClassName='active'>轮播图</Link>
                        </li>
                        <li>
                            <Link to='/mainpage/company' activeClassName='active'>公司信息</Link>
                        </li>
                        <li>
                            <Link to='/mainpage/courses' activeClassName='active'>课程列表</Link>
                        </li>
                        <li>
                            <Link to='/mainpage/bottom' activeClassName='active'>底部图文区</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
