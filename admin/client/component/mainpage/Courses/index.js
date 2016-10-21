/**
 * @file component 『首页-课程列表』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';
import Loading from '../../Loading';
import service from '../../../service';
import SubHeader from '../../SubHeader';
import AddCourse from './AddCourse';

const antd = require('antd');
// const Button = antd.Button;
// const Table = antd.Table;
// const Modal = antd.Modal;
const {Button, Table, Modal} = antd;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: null,
            modalVisible: false,
            actionType: null,
            modifyCourse: null
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
            dataSource: this.state.courses,
            columns: this.getColumnsConfig(),
            bordered: true
        };

        let modalProps = {
            width: 900,
            closable: true,
            maskClosable: false,
            title: (
                    <div>
                        {this.state.actionType === 'add' ? '新增配置' : '修改配置'}
                    </div>
                ),
            visible: this.state.modalVisible,
            onOk: this.onModalOk.bind(this),
            onCancel: this.onModalCancel.bind(this),
            okText: '保存',
            cancelText: '取消'
        };

        let addCourseProps = {
            ref: 'add-course-component',
            course: this.state.actionType === 'modify' ? Object.assign({}, this.state.modifyCourse) : {}
        };

        return (
            <div>
                <SubHeader>首页-展示课程配置</SubHeader>
                <div className={style['wrapper-btn']}>
                    <Button type='primary' onClick={this.onAdd.bind(this)}>新增展示课程</Button>
                </div>
                {
                    this.state.courses
                    ? <div className={style['wrapper-table']}>
                        <Table {...tableProps}/>
                    </div>
                    : <Loading/>
                }
                <Modal {...modalProps}>
                    <AddCourse {...addCourseProps}></AddCourse>
                </Modal>
            </div>
        );
    }

    loadData() {
        let me = this;
        this.caches.loadDataRequest = service.getHomeCourses().then(function (response) {
            me.setState({
                courses: response.data.courses || []
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
                title: '课程头图',
                dataIndex: 'banner',
                key: 'banner',
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
                title: '开课时间',
                dataIndex: 'time',
                key: 'time'
            },
            {
                width: 200,
                title: '开课地点',
                dataIndex: 'city',
                key: 'city'
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
                            <Button
                                onClick={me.onDelete.bind(me, record)}
                            >
                                删除
                            </Button>
                        </div>
                    );
                }
            }
        ];
    }

    onAdd() {
        this.setState({
            actionType: 'add',
            modalVisible: true,
            modifyCourse: null
        });
    }

    onModify(course) {
        this.setState({
            actionType: 'modify',
            modalVisible: true,
            modifyCourse: course
        });
    }

    onDelete(course) {
        let me = this;
        Modal.confirm({
            title: '确认',
            content: '确定删除该数据？',
            onOk() {
                service.deleteHomeCourses(course).then(function (response) {
                    me.loadData();
                });
            },
            onCancel() {
                // do nothing
            }
        });
    }

    onModalOk() {
        let couserInfo = this.refs['add-course-component'].getCourseInfo();
        if (this.state.actionType === 'add') {
            service.addHomeCourses(couserInfo).then(this.loadData.bind(this));
        }
        else {
            service.updateHomeCourses(couserInfo).then(this.loadData.bind(this));
        }

        this.setState({
            actionType: null,
            modalVisible: false,
            modifyRecord: null
        });
    }

    onModalCancel() {
        this.setState({
            actionType: null,
            modalVisible: false,
            modifyRecord: null
        });
    }
}
