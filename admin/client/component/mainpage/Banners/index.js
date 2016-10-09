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
const antd = require('antd');
const Button = antd.Button;
const Table = antd.Table;
const Modal = antd.Modal;


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
        this.loadData();
    }

    render() {
        let tableProps = {
            dataSource: this.state.banners,
            columns: this.getColumnsConfig(),
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

    loadData() {
        console.log('load data');
        let me = this;
        service.getBannerList().then(function (response) {
            me.setState({
                banners: response.data.banners
            });
        });
    }

    getColumnsConfig() {
        let me = this;
        return [
            {
                width: 50,
                title: '位置',
                dataIndex: 'position',
                key: 'position'
            },
            {
                width: 200,
                title: 'banner图',
                dataIndex: 'pic',
                key: 'pic',
                render: function (text, record, index) {
                    return (
                        <div>
                            <img src={text}/>
                        </div>
                    );
                }
            },
            {
                width: 200,
                title: '跳转链接',
                dataIndex: 'link',
                key: 'link'
            },
            {
                width: 200,
                title: '操作',
                render: function (text, record, index) {
                    return (
                        <div style={{
                            textAlign: 'right'
                        }}>
                            <Button
                                style={{marginRight: '10px'}}
                                onClick={me.onModify.bind(me, record)}
                            >
                                修改
                            </Button>
                            <Button onClick={me.onDelete.bind(me, record)}>删除</Button>
                        </div>
                    );
                }
            }
        ];
    }

    onDelete(record) {
        let me = this;
        Modal.confirm({
            title: '确认',
            content: '确定删除该数据？',
            onOk: function () {
                service.deleteBanner(record).then(function (response) {
                    me.loadData();
                });
            },
            onCancel: function () {
                // do nothing
            }
        });
    }

    onModify() {

    }
}
