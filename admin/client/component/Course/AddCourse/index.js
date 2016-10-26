/**
 * @file 新增课程
 * @author Yuan Yanjun
 * @date 20161023
 */

import React, {Component} from 'react';
import style from './style.css';
import service from '../../../service';
import AddSubCourse from '../AddSubCourse';

const antd = require('antd');
const {Button, Input, Table, Form, Modal} = antd;
const FormItem = Form.Item;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 区分添加/修改主课程
            isAddCourse: false,
            actionType: null,
            modifySubCourse: null,
            addSubCourseModalVisible: false,
            course: this.props.course || {},
            subCourses: null
        };
    }

    componentDidMount() {
        this.initEditor();

        this.caches = {};
        this.loadSubCourses();
    }

    componentWillUnmount() {
        this.destroyEditor();

        this.caches.loadSubCoursesRequest
        && this.caches.loadSubCoursesRequest.abort
        && this.caches.loadSubCoursesRequest.abort();
    }

    // 在"新建课程" + "课程配置" 两个按钮会触发这个函数
    componentWillReceiveProps(nextProps) {
        // 更新编辑器内容
        let editor = window.tinymce.EditorManager.get('course-content-editor');

        // 如果隐藏Modal，清空
        if (!nextProps.addCourseModalVisible) {
            this.setState({
                isAddCourse: false,
                course: {},
                subCourses: null
            });
            editor.setContent('');
            return;
        }
        // 如果是显示Modal，并修改课程
        if (nextProps.actionType === 'modify') {
            // this.setState({
            //     course: nextProps.course,
            //     subCourses: null
            // });
            // this.loadSubCourses();

            // MARK !important
            // 由于 setState是异步，上面的写法是有问题的，会获取不到最新的course状态
            // 需要用回调的方式来调用
            // 详细:
            // http://stackoverflow.com/questions/36085726/setstate-in-reactjs-is-async-or-sync
            // http://thereignn.ghost.io/on-the-async-nature-of-setstate-in-react/
            this.setState({
                isAddCourse: false,
                course: nextProps.course,
                subCourses: null
            }, () => this.loadSubCourses());
            editor.setContent(nextProps.course.course_page_info || '');
        }
        // 如果显示Modal，并新建课程
        else {
            this.setState({
                isAddCourse: true,
                course: {},
                subCourses: null
            });
            editor.setContent('');
        }
    }

    componentWillUpdate() {}

    componentDidUpdate() {}

    render() {
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 13}
        };

        let subCourseTableProps = {
            pagination: false,
            dataSource: this.state.subCourses,
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

        let enableAddSubCourseBtn = this.props.course && this.props.course.id !== undefined;
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
                        disabled={!enableAddSubCourseBtn}
                    >
                        新增展示课程排期
                    </Button>
                    {
                        !enableAddSubCourseBtn
                        ? (
                            <span className={style.error}>只有新建了主课程，才能新建子课程</span>
                        )
                        : null
                    }
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
            // height: 960,
            height: 100,
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
                            <Button
                                onClick={me.onDeleteSubCourse.bind(me, record)}
                            >
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

        let subCourses = this.state.subCourses || [];
        subCourses = subCourses.map(subCourse => subCourse.id);

        // 新建的主课程是没有子课程概念的。
        // 只有新建好主课程，然后去修改。
        if (!this.state.isAddCourse) {
            course.sub_courses = subCourses;
        }
    
        return course;
    }

    loadSubCourses() {
        let me = this;
        // 新建主课程，不拉取子课程 
        if (!this.state.course || this.state.course.id === undefined) {
            return;
        }

        this.caches.loadSubCoursesRequest
        && this.caches.loadSubCoursesRequest.abort
        && this.caches.loadSubCoursesRequest.abort();

        let courseId = this.state.course.id;
        this.caches.loadSubCoursesRequest = service.getSubCourses(courseId).then(function (response) {
            me.setState({
                subCourses: response.data.sub_courses || []
            });
        });
    }

    // 以下是修改子课程的逻辑

    onDeleteSubCourse(subCourse) {
        let me = this;
        Modal.confirm({
            title: '确认',
            content: '确定删除此课程排期么？',
            okText: '确定删除',
            cancelText: '取消',
            onOk() {
                service.deleteSubCourse(subCourse.id).then(function (response) {
                    me.loadSubCourses();                    
                });
            },
            onCancel() {
                // do nothing
            }
        });
    }

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
