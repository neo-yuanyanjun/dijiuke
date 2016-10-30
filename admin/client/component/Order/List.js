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
        this.state = {
            isLoading: true,
            orders: null
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
        let tableProps = {
            pagination: false,
            dataSource: this.state.orders,
            columns: this.getColumnsConfig(),
            bordered: true
        };
        return (
            <div>
                <SubHeader>课程订单列表</SubHeader>
                {
                    this.state.isLoading
                    ? <Loading />
                    : <div className={style['wrapper-list-table']}>
                        <Table {...tableProps} />
                    </div>
                }
            </div>
        );
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
                width: 100,
                title: '课程代码',
                dataIndex: 'code',
                key: 'code'
            },
            {
                width: 100,
                title: '课程名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                width: 100,
                title: '开课时间',
                dataIndex: 'time',
                key: 'time'
            },
            {
                width: 100,
                title: '开课城市',
                dataIndex: 'city',
                key: 'city'
            },
            {
                width: 100,
                title: '已报名人数',
                dataIndex: 'enter_num',
                key: 'enter_num'
            },
            {
                width: 300,
                title: '操作',
                render(text, record, index) {
                    return (
                        <div>
                            <Button
                                type='primary'
                                style={{
                                    marginRight: '20px'
                                }}
                                onClick={me.navToOrderDetail.bind(me, record)}
                            >
                                查看订单详情
                            </Button>
                            <Button
                                type='primary'
                                onClick={me.downloadTable.bind(me, record)}
                            >
                                导出表格
                            </Button>
                        </div>
                    );
                }
            }
        ];
    }

    loadData() {
        this.setState({
            isLoading: true
        });
        service.getOrders().then(function (response) {
            this.setState({
                isLoading: false,
                orders: response.data.sub_courses_orders
            });
        }.bind(this));
    }

    navToOrderDetail(record) {
        window.location.hash = '#order/' + record.id;
    }

    downloadTable(record) {
        let path = 'order/excel';
        path += '?id=' + record.id + '&state=-1';

        let linkEle = document.createElement('a');
        linkEle.setAttribute('href', path);
        linkEle.setAttribute('target', '_blank');

        window.document.body.appendChild(linkEle);
        linkEle.click();

        setTimeout(function () {
            window.document.body.removeChild(linkEle);
        }, 500);
    }
}
