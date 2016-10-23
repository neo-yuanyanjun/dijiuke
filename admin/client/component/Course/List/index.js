/**
 * @file 课程列表
 * @author Yuan Yanjun
 * @date 2016.10.19
 */

import React, {Component} from 'react';
import style from './style.css';
import service from '../../../service';
import SubHeader from '../../SubHeader';
import Loading from '../../Loading';
import AddCourse from '../AddCourse';

const antd = require('antd');
const {Button, Table, Modal} = antd;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: null,
            actionType: null,
            modifyCourse: null,
            addCourseModalVisible: false
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
        let coursesTableProps = {
            pagination: false,
            dataSource: this.state.courses,
            columns: this.getCoursesTableColumnsConfig(),
            bordered: true
        };

        let modalProps = {
            // width: '100%',
            width: 1024,
            closable: true,
            maskClosable: false,
            title: (
                    <div>
                        {this.state.actionType === 'add' ? '新建课程' : '修改课程'}
                    </div>
                ),
            visible: this.state.addCourseModalVisible,
            onOk: this.onModalOk.bind(this),
            onCancel: this.onModalCancel.bind(this),
            okText: '保存',
            cancelText: '关闭'
        };

        let addCourseProps = {
            ref: 'add-course-component',
            course: this.state.actionType === 'modify' ? Object.assign({}, this.state.modifyCourse) : {}
        };
        return (
            <div>
                <SubHeader>课程列表</SubHeader>
                <div className={style['wrapper-btn']}>
                    <Button type='primary' onClick={this.onAddCourse.bind(this)}>新增课程</Button>
                </div>

                {
                    this.state.courses
                    ? <div className={style['wrapper-table']}>
                        <Table {...coursesTableProps}/>
                    </div>
                    : <Loading/>
                }

                <Modal {...modalProps}>
                    <AddCourse {...addCourseProps}></AddCourse>
                </Modal>
            </div>
        );
    }

    getCoursesTableColumnsConfig() {
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
                width: 200,
                title: '课程名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                width: 200,
                title: '创建时间',
                dataIndex: 'edit_time',
                key: 'edit_time'
            },
            {
                width: 400,
                title: '操作',
                render(text, record, index) {
                    return (
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <Button
                                type='primary'
                                style={{marginRight: '10px'}}
                            >
                                查看页面
                            </Button>
                            <Button
                                type='primary'
                                style={{marginRight: '10px'}}
                                onClick={me.onModifyCourse.bind(me, record)}
                            >
                                课程配置
                            </Button>
                            <Button
                                type='primary'
                                onClick={me.onDeleteCourse.bind(me, record)}
                            >
                                删除
                            </Button>
                        </div>
                    );
                }
            }
        ];
    }

    loadData() {
        let me = this;
        this.caches.loadDataRequest = service.getCourses().then(function (response) {
            me.setState({
                courses: response.data.courses || []
            });
        });
    }

    onDeleteCourse(course) {
        let me = this;
        Modal.confirm({
            title: '确认',
            content: '此操作将会删除此课程的所有内容，请慎重！',
            okText: '确定删除',
            cancelText: '取消',
            onOk() {
                service.deleteCourse(course.id).then(function (response) {
                    me.loadData();
                });
            },
            onCancel() {
                // do nothing
            }
        });
    }

    onAddCourse() {
        this.setState({
            actionType: 'add',
            modifyCourse: null,
            addCourseModalVisible: true
        });
    }

    onModifyCourse(course) {
        this.setState({
            actionType: 'modify',
            modifyCourse: course,
            addCourseModalVisible: true
        });
    }

    onModalOk() {
        let course = this.refs['add-course-component'].getCourseDetail();
        if (this.state.actionType === 'add') {
            service.addCourse(course).then(this.loadData.bind(this));
        }
        else {
            service.updateCourse(course).then(this.loadData.bind(this));
        }

        this.setState({
            actionType: null,
            modifyCourse: null,
            addCourseModalVisible: false
        });
    }

    onModalCancel() {
        this.setState({
            actionType: null,
            modifyCourse: null,
            addCourseModalVisible: false
        });
    }
}
