/**
 * @file component header
 * @author Yuan Yanjun
 * @date 2010.10.09
 */
import React, {Component} from 'react';
import styleHeader from './header.css';

export default class App extends Component {
    render() {
        return (
            <div className={styleHeader.header}>
                <h1>第九课堂后台管理系统</h1>
            </div>
        );
    }
}
