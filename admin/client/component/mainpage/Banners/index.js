/**
 * @file component 『首页-轮播图』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';
import Loading from '../../Loading';
import service from '../../../service';
import AddBanner from './AddBanner';

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
            banners: null,
            addModalVisible: false,
            actionType: null,
            modifyRecord: null
        };
    }

    componentDidMount() {
        // 管理本地需要缓存的内容
        this.caches = {};
        this.loadData();
    }

    componentWillUnmount() {
        this.caches.loadDataRequest
        && this.caches.loadDataRequest.abort
        && this.caches.loadDataRequest.abort();
    }

    render() {
        let tableProps = {
            dataSource: this.state.banners,
            columns: this.getColumnsConfig(),
            bordered: true
        };

        let modalProps = {
            width: 900,
            closable: true,
            maskClosable: false,
            title: (
                    <div>
                        {this.state.actionType === 'add' ? '新建Banner' : '修改Banner'}
                    </div>
                ),
            visible: this.state.addModalVisible,
            onOk: this.onModalOk.bind(this),
            onCancel: this.onModalCancel.bind(this),
            okText: '保存',
            cancelText: '关闭'
        };

        let addBannerProps = {
            ref: 'add-banner-component',
            record: this.state.actionType === 'modify' ? Object.assign({}, this.state.modifyRecord) : {}
        };

        return (
            <div>
                <header className={style.header}>首页-头部banner图配置</header>
                <div className={style['wrapper-btn']}>
                    <Button type='primary' onClick={this.onAdd.bind(this)}>新建</Button>
                </div>
                {
                    this.state.banners
                    ? <div className={style['wrapper-table']}>
                        <Table {...tableProps}/>
                    </div>
                    : <Loading/>
                }
                <Modal {...modalProps}>
                    <AddBanner {...addBannerProps}></AddBanner>
                </Modal>
            </div>
        );
    }

    loadData() {
        // console.log('load data');
        let me = this;
        this.caches.loadDataRequest = service.getBannerList().then(function (response) {
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
                render(text, record, index) {
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
                render(text, record, index) {
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
            onOk() {
                service.deleteBanner(record).then(function (response) {
                    me.loadData();
                });
            },
            onCancel() {
                // do nothing
            }
        });
    }

    onModify(record) {
        this.setState({
            actionType: 'modify',
            addModalVisible: true,
            modifyRecord: record
        });
    }

    onAdd() {
        this.setState({
            actionType: 'add',
            addModalVisible: true,
            modifyRecord: null
        });
    }

    onModalCancel() {
        this.setState({
            actionType: null,
            addModalVisible: false,
            modifyRecord: null
        });
    }

    onModalOk() {
        var t = this.refs['add-banner-component'];
        debugger;
        // var record = this.refs['add-banner-component'].getRecord();
        var valuses = this.refs['add-banner-component'].getFieldsValue();
        debugger;
        if (this.state.actionType === 'add') {
            service.addBanner(record).then(this.loadData.bind(this));
        }
        else {
            service.updateBanner(record).then(this.loadData.bind(this));
        }

        // TODO 做验证

        this.setState({
            actionType: null,
            addModalVisible: false,
            modifyRecord: null
        });
    }
}
