/**
 * @file component 『首页-轮播图』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';

// 不要用import的方式，会报错，请用require
// import Button from 'antd';
const Button = require('antd').Button;

export default class Banners extends Component {
    render() {
        return (
            <div>
                <header>『首页-轮播图』配置页面</header>
                <Button type='primary'>新建</Button>
            </div>
        );
    }
}
