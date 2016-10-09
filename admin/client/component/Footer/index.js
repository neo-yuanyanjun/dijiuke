/**
 * @file component footer
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className={style.footer}>
                版权所有@第九课堂
            </div>
        );
    }
}
