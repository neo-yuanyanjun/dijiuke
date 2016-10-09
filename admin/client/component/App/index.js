/**
 * @file main
 * @author Yuan Yanjun
 * @date 2016.10.09
 */

import React, {Component} from 'react';


import Header from '../Header';
import Footer from '../Footer';
import Navigator from '../Navigator';
import style from './style.css';

// 引入"ant-design"的样式
import 'antd/dist/antd.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className={style.wrapper}>
                    <Navigator></Navigator>
                    <div className={style.main}>{ this.props.children }</div>
                </div>
                <Footer/>
            </div>
        );
    }
}
