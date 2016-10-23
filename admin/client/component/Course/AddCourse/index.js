/**
 * @file 新增课程
 * @author Yuan Yanjun
 * @date 20161023
 */

import React, {Component} from 'react';
import style from './style.css';
import AddSubCourse from '../AddSubCourse';

const antd = require('antd');
const {Button, Input, Table, Form, Modal} = antd;
const FormItem = Form.Item;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType: null,
            modifySubCourse: null,
            addSubCourseModalVisible: false,
            course: this.props.course || {}
        };
    }

    componentDidMount() {
        this.initEditor();
    }

    componentWillUnmount() {
        this.destroyEditor();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.course) {
            this.setState({
                course: nextProps.course
            });
        }
    }

    componentWillUpdate() {}

    componentDidUpdate() {
        // 更新编辑器内容
        let editor = window.tinymce.EditorManager.get('course-content-editor');
        let content = this.state.course.course_page_info || '';
        editor.setContent(content);
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 13}
        };

        let subCourseTableProps = {
            pagination: false,
            dataSource: this.state.course.sub_courses,
            columns: this.getColumnsConfig(),
            bordered: true
        };

        let addSubCourseModalProps = {
            width: 600,
            closable: true,
            maskClosable: false,
            title: (
                    <div>
                        {this.state.actionType === 'add' ? '新建课程排期' : '修改课程排期'}
                    </div>
                ),
            visible: this.state.addSubCourseModalVisible,
            onOk: this.onModalOk.bind(this),
            onCancel: this.onModalCancel.bind(this),
            okText: '保存',
            cancelText: '关闭'
        };
        let addSubCourseProps = {
            ref: 'add-sub-course-component',
            subCourse: this.state.actionType === 'modify' ? Object.assign({}, this.state.modifySubCourse) : {}
        };

        return (
            <div>
                <FormItem {...formItemLayout} label="课程名称:">
                    <Input
                        name='name'
                        placeholder="课程名称"
                        value={this.state.course.name}
                        onChange={this.onNameChange.bind(this)}
                    />
                </FormItem>

                <div className={style['section-header']}>
                    课程页面内容配置
                </div>
                <div className={style['wrapper-editor']}>
                    <textarea id='course-content-editor'></textarea>
                </div>

                <div className={style['section-header']}>
                    课程开课排期配置
                </div>
                <div className={style['wrapper-add-sub-course']}>
                    <Button
                        type='primary'
                        onClick={this.onAddSubCourse.bind(this)}
                    >
                        新增展示课程排期
                    </Button>
                </div>
                <div className={style['wrapper-sub-course-table']}>
                    <Table {...subCourseTableProps}></Table>
                </div>

                <div className={style['section-header']}>
                    咨询tab配置
                </div>
                <FormItem {...formItemLayout} label="按钮名称:">
                    <Input
                        name='consult_word'
                        placeholder="按钮名称"
                        value={this.state.course.consult_word}
                        onChange={this.onConsultWordChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="跳转链接:">
                    <Input
                        name='consult_link_url'
                        placeholder="跳转链接"
                        value={this.state.course.consult_link_url}
                        onChange={this.onConsultLinkUrlChange.bind(this)}
                    />
                </FormItem>
                <Modal {...addSubCourseModalProps}>
                    <AddSubCourse {...addSubCourseProps}/>
                </Modal>
            </div>
        );
    }

    initEditor() {
        /* eslint-disable */
        window.tinymce.init({
            selector: '#course-content-editor',
            width: 640,
            height: 960,
            file_browser_callback(field_name, url, type, win) {
                let inputEle = document.createElement('input');
                inputEle.setAttribute('type', 'file');
                inputEle.style.display = 'none';
                window.document.body.appendChild(inputEle);

                inputEle.addEventListener('change', function () {
                    let file = this.files[0];
                    let path = 'file/upload';
                    let name = 'user_file';

                    let formData = new window.FormData();
                    formData.append(name, file);

                    let xhr = new window.XMLHttpRequest();
                    xhr.open('post', path, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === window.XMLHttpRequest.DONE && xhr.status === 200) {
                            let response = JSON.parse(xhr.responseText);
                            win.document.getElementById(field_name).value = response.data.file_path;
                        }
                    };

                    xhr.send(formData);
                    window.document.body.removeChild(inputEle);
                });
                inputEle.click();
            },
            file_browser_callback_types: 'image',
            plugins: 'link image code textcolor colorpicker',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code '
                + '| image | forecolor backcolor'
        });

        let editor = window.tinymce.EditorManager.get('course-content-editor');
        let content = this.state.course.course_page_info || '';
        editor.setContent(content);
    }

    destroyEditor() {
        let editor = window.tinymce.EditorManager.get('course-content-editor');
        editor.destroy();
    }

    onNameChange(e) {
        let name = e.target.value;
        let course = this.state.course;
        course.name = name;
        this.setState({
            course
        });
    }

    onConsultWordChange(e) {
        let consultWord = e.target.value;
        let course = this.state.course;
        course.consult_word = consultWord;
        this.setState({
            course
        });
    }

    onConsultLinkUrlChange(e) {
        let consultLinkUrl = e.target.value;
        let course = this.state.course;
        course.consult_link_url = consultLinkUrl;
        this.setState({
            course
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
                title: '头图',
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
                title: '开课城市',
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
                                onClick={me.onModifySubCourse.bind(me, record)}
                            >
                                修改
                            </Button>
                            <Button>
                                删除
                            </Button>
                        </div>
                    );
                }
            }
        ];
    }

    getCourseDetail() {
        let course = Object.assign({}, this.state.course);
        let editor = window.tinymce.EditorManager.get('course-content-editor');
        course.course_page_info = editor.getContent() || '';

        let subCourses = course.sub_courses || [];
        subCourses = subCourses.map(subCourse => subCourse.id);
        course.sub_courses = subCourses;

        return course;
    }

    // 以下是修改子课程的逻辑

    onAddSubCourse() {
        this.setState({
            actionType: 'add',
            modifySubCourse: null,
            addSubCourseModalVisible: true
        });
    }

    onModifySubCourse(subCourse) {
        this.setState({
            actionType: 'modify',
            modifySubCourse: subCourse,
            addSubCourseModalVisible: true
        });
    }

    onModalOk() {
        this.setState({
            actionType: null,
            modifySubCourse: null,
            addSubCourseModalVisible: false
        });
    }

    onModalCancel() {
        this.setState({
            actionType: null,
            modifySubCourse: null,
            addSubCourseModalVisible: false
        });
    }
}
