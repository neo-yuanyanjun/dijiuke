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

export default class App extends Component {
    render() {
        return (
            <div className={style.wrapper}>
                <Header/>
                <div className={style.main}>
                    <Navigator></Navigator>
                    <div className={style.content}>{ this.props.children }</div>
                </div>
                <Footer/>
            </div>
        );
    }
}
