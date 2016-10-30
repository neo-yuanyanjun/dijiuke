/**
 * @file component 订单详情页面
 * @author Yuan Yanjun
 * @date 2010.10.30
 */

// TODO
//  1. 订单分页
//  2. 状态筛选功能
//  3. 导出为表格功能

import React, {Component} from 'react';
import style from './style.css';
import Loading from '../Loading';
import service from '../../service';
import SubHeader from '../SubHeader';

const antd = require('antd');
const {Button, Table, Select, Pagination} = antd;
const Option = Select.Option;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
            isLoading: true,
            orderDetails: null,
            condition: {
                // 订单状态
                state: '-1'
            },
            pagination: {
                total: 0,
                pageNo: 1,
                pageSize: 10
            }
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
            dataSource: this.state.orderDetails,
            columns: this.getColumnsConfig(),
            bordered: true
        };
        let paginationProps = {
            total: this.state.pagination.total,
            current: this.state.pagination.pageNo,
            pageSize: this.state.pagination.pageSize,
            showTotal(total) {
                return `共 ${total} 个订单`;
            },
            onChange: this.onPageNoChange.bind(this)
        };
        return (
            <div>
                <SubHeader>课程订单详情</SubHeader>
                <div className={style['operation-bar']}>
                    选择订单状态：
                    <Select
                        value={this.state.condition.state}
                        style={{width: 120}}
                        onChange={this.onSelectChange.bind(this)}
                    >
                        <Option value='-1'>全部</Option>
                        <Option value='0'>未支付</Option>
                        <Option value='1'>已支付</Option>
                    </Select>
                    <Button
                        type='primary'
                        onClick={this.downloadTable.bind(this)}
                        style={{
                            'float': 'right'
                        }}
                    >
                        导出为表格
                    </Button>
                </div>
                {
                    this.state.isLoading
                    ? <Loading />
                    : <div className={style['wrapper-detail-table']}>
                        <Table {...tableProps} />
                    </div>
                }
                <div className={style['wrapper-pagination']}>
                    <Pagination {...paginationProps} />
                </div>
            </div>
        );
    }

    onPageNoChange(pageNo) {
        let pagination = this.state.pagination;
        pagination.pageNo = pageNo;
        this.setState({
            pagination
        });
        this.loadData();
    }

    getColumnsConfig() {
        return [
            {
                width: 50,
                title: '序号',
                render(text, record, index) {
                    return index + 1;
                }
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
                title: '登录账号昵称',
                dataIndex: 'username',
                key: 'username'
            },
            {
                width: 100,
                title: '姓名',
                dataIndex: 'student_name',
                key: 'student_name'
            },
            {
                width: 100,
                title: '手机号',
                dataIndex: 'student_phone_num',
                key: 'student_phone_num'
            },
            {
                width: 100,
                title: '电子邮箱',
                dataIndex: 'student_email',
                key: 'student_email'
            },
            {
                width: 100,
                title: '报名时间',
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
                title: '报名人数',
                dataIndex: 'enter_num',
                key: 'enter_num'
            },
            {
                width: 100,
                title: '报名金额',
                dataIndex: 'total_price',
                key: 'total_price'
            },
            {
                width: 100,
                title: '订单状态',
                dataIndex: 'state',
                key: 'state',
                render(text, record, index) {
                    switch (text) {
                        case -1:
                            return '全部';
                        case 0:
                            return '未支付';
                        case 1:
                            return '已支付';
                        default:
                            return '未知';
                    }
                }
            },
            {
                width: 100,
                title: '支付方式',
                dataIndex: 'pay_channel',
                key: 'pay_channel',
                render(text, record, index) {
                    // 如果是"未支付"状态，返回'-'字符
                    if (record.state === 0) {
                        return '-';
                    }
                    switch (text) {
                        case 0:
                            return '支付宝';
                        case 1:
                            return '微信';
                        default:
                            return '未知';
                    }
                }
            }
        ];
    }

    loadData() {
        let me = this;
        this.setState({
            isLoading: true
        });

        let pagination = this.state.pagination;
        let params = {
            id: this.state.id,
            offset: pagination.pageSize * (pagination.pageNo - 1),
            num: pagination.pageSize,
            state: +this.state.condition.state
        };
        service.getOrderDetail(params).then(function (response) {
            let pagination = me.state.pagination;
            pagination.total = response.data.total;
            me.setState({
                isLoading: false,
                orderDetails: response.data.sub_course_orders,
                pagination
            });
        });
    }

    onSelectChange(value) {
        let condition = this.state.condition;
        condition.state = value;

        let pagination = this.state.pagination;
        pagination.pageNo = 1;

        this.setState({
            condition,
            pagination
        });
        this.loadData();
    }

    downloadTable() {
        let linkEle = document.createElement('a');
        let path = 'order/excel';
        path += '?id=' + this.state.id + '&state=' + this.state.condition.state;
        linkEle.setAttribute('href', path);
        linkEle.setAttribute('target', '_blank');
        window.document.body.appendChild(linkEle);
        linkEle.click();
        setTimeout(function () {
            window.document.body.removeChild(linkEle);
        }, 500);
    }
}
