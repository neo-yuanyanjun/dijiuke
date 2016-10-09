/**
 * @file component loading
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';

export default class Loading extends Component {
    render() {
        return (
            <div className={style.loading}>
                加载中...
            </div>
        );
    }
}