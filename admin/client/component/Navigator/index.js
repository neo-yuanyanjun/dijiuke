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
                <ul>
                    <li>
                        <span className={style['menu-group-label']}>首页配置</span>
                    </li>
                    <li>
                        <Link to='/mainpage/banners' className={style['menu-link']} activeClassName={style.active}>轮播图</Link>
                    </li>
                    <li>
                        <Link to='/mainpage/company' className={style['menu-link']} activeClassName={style.active}>公司信息</Link>
                    </li>
                    <li>
                        <Link to='/mainpage/courses' className={style['menu-link']} activeClassName={style.active}>课程列表</Link>
                    </li>
                    <li>
                        <Link to='/mainpage/bottom' className={style['menu-link']} activeClassName={style.active}>底部图文区</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
