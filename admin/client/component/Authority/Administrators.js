/**
 * @file component 订单列表页面
 * @author Yuan Yanjun
 * @date 2010.10.30
 */

import React, {Component} from 'react';
import style from './style.css';
import Loading from '../Loading';
import service from '../../service';
import SubHeader from '../SubHeader';

const antd = require('antd');
const {Button, Table} = antd;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <SubHeader>
                    管理员列表
                </SubHeader>
                <h1>
                    TODOs:
                </h1>
                <div>
                    1. 管理员管理：列表+新增+修改；
                    <br/>
                    2. 所有表单的提交验证；
                    <br/>
                    3. 所有接口返回的错误处理。
                </div>
            </div>
        );
    }
}
