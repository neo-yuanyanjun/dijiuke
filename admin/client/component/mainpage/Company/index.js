/**
 * @file component 『首页-公司信息』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';
import service from '../../../service';
import SubHeader from '../../SubHeader';
import Update from './Update';

const antd = require('antd');
// const Button = antd.Button;
// const Table = antd.Table;
// const Modal = antd.Modal;
const {Button, Table, Modal} = antd;

export default class Banners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pic: '',
            modalVisible: false
        };
    }

    componentDidMount() {
        this.caches = {};
        this.loadData();
    }

    componentWillUnmount() {
        this.caches.loadDataRequest
        && this.caches.loadDataRequest.abort
        && this.caches.loadDataRequest.abort();
    }

    render() {
        let dataSource = [{
            pic: this.state.pic
        }];
        let tableProps = {
            pagination: false,
            dataSource: dataSource,
            columns: this.getColumnsConfig(),
            bordered: true
        };

        let modalProps = {
            width: 900,
            closable: true,
            maskClosable: false,
            title: (
                    <div>
                        修改公司介绍图片
                    </div>
                ),
            visible: this.state.modalVisible,
            onOk: this.onModalOk.bind(this),
            onCancel: this.onModalCancel.bind(this),
            okText: '保存',
            cancelText: '关闭'
        };
        return (
            <div>
                <SubHeader>公司介绍区域图片介绍</SubHeader>
                <div className={style['table-wrapper']}>
                    <Table {...tableProps} />
                </div>
                <Modal {...modalProps}>
                    <Update pic={this.state.pic} ref='update-company-img-component'></Update>
                </Modal>
            </div>
        );
    }

    loadData() {
        let me = this;
        this.caches.loadDataRequest = service.getCompany().then(function (response) {
            me.setState({
                pic: response.data.pic
            });
        });
    }

    getColumnsConfig() {
        let me = this;
        return [
            {
                width: 200,
                title: '公司介绍图片',
                dataIndex: 'pic',
                key: 'pic',
                render(text, record, index) {
                    return (
                        <div>
                            <img src={record.pic} />
                        </div>
                    );
                }
            },
            {
                width: 200,
                title: '操作',
                render(text, record, index) {
                    return (
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <Button onClick={me.onModify.bind(me, record)}>
                                修改
                            </Button>
                        </div>
                    );
                }
            }
        ];
    }

    onModify() {
        this.setState({
            modalVisible: true
        });
    }

    onModalOk() {
        let pic = this.refs['update-company-img-component'].getNewCompanyPic();
        service.updateCompany(pic).then(this.loadData.bind(this));
        this.setState({
            modalVisible: false
        });
    }

    onModalCancel() {
        this.setState({
            modalVisible: false
        });
    }
}
