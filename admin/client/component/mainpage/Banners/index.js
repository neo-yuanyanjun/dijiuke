/**
 * @file component 『首页-轮播图』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';
import Loading from '../../Loading';
import service from './service';
import columns from './column.config';

// 不要用import的方式，会报错，请用require
// import Button from 'antd';
const Button = require('antd').Button;
const Table = require('antd').Table;

export default class Banners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: null
        };
    }

    // getInitialState() {
    //     return {
    //         banners: null
    //     };
    // }
    
    componentDidMount() {
        let me = this;
        service.getBannerList().then(function (response) {
            me.setState({
                banners: response.data.banners
            });
        });
    }

    render() {
        let tableProps = {
            dataSource: this.state.banners,
            columns: columns,
            bordered: true
        };

        return (
            <div>
                <header className={style.header}>首页-头部banner图配置</header>
                <div className={style['wrapper-btn']}>
                    <Button type='primary'>新建</Button>
                </div>
                {
                    this.state.banners
                    ? <div className={style['wrapper-table']}>
                        <Table {...tableProps}/>
                    </div>
                    : <Loading/>
                }
                
            </div>
        );
    }
}
