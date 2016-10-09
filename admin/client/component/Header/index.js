/**
 * @file component header
 * @author Yuan Yanjun
 * @date 2010.10.09
 */
import React, {Component} from 'react';
import styleHeader from './header.css';
import {Link} from 'react-router';

export default class App extends Component {
    render() {
        return (
            <div className={styleHeader.header}>
                <h1>
                    <Link to="/">第九课堂后台管理系统</Link>
                </h1>
            </div>
        );
    }
}
