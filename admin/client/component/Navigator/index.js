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
                        <Link to='/mainpage/company' className={style['menu-link']} activeClassName={style.active}>公司介绍图片</Link>
                    </li>
                    <li>
                        <Link to='/mainpage/courses' className={style['menu-link']} activeClassName={style.active}>课程列表</Link>
                    </li>
                    <li>
                        <Link to='/mainpage/bottom' className={style['menu-link']} activeClassName={style.active}>底部图文区</Link>
                    </li>
                    <li>
                        <span className={style['menu-group-label']}>课程中心</span>
                    </li>
                    <li>
                        <Link to='/course/list' className={style['menu-link']} activeClassName={style.active}>课程列表</Link>
                    </li>
                    <li>
                        <span className={style['menu-group-label']}>菜单tab</span>
                    </li>
                    <li>
                        <Link to='/menu' className={style['menu-link']} activeClassName={style.active}>菜单tab</Link>
                    </li>
                    <li>
                        <span className={style['menu-group-label']}>订单中心</span>
                    </li>
                    <li>
                        <Link to='/order' className={style['menu-link']} activeClassName={style.active}>所有课程订单</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
