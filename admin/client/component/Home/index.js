/**
 * @file component 管理后台主页
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';

export default class Banners extends Component {
    render() {
        return (
            <div>
                <h2 className={style.welcome}>欢迎进入『第九课堂』后台管理系统</h2>
                <div style={ {
                    textAlign: 'center',
                    color: 'red'
                } }>此处应有鲜花和掌声</div>
            </div>
        );
    }
}
