/**
 * @file 新增子课程
 * @author Yuan Yanjun
 * @date 20161023
 */

import React, {Component} from 'react';

import style from './style.css';
import service from '../../../service';
import Upload from '../../Upload';

const antd = require('antd');
const {Input, InputNumber, Form} = antd;
const FormItem = Form.Item;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: this.props.courseId,
            courseCode: this.props.courseCode,
            isEditSubCourse: this.props.isEditSubCourse,
            subCourse: this.props.subCourse || {}
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        // 如果隐藏Modal，清空
        if (!nextProps.addSubCourseModalVisible) {
            this.setState({
                courseId: null,
                courseCode: null,
                isEditSubCourse: false,
                subCourse: {}
            });
            return;
        }
        // 如果是修改子课程
        if (nextProps.isEditSubCourse) {
            this.setState({
                courseId: nextProps.courseId,
                courseCode: nextProps.courseCode,
                isEditSubCourse: true,
                subCourse: nextProps.subCourse
            });
        }
        // 如果新建子课程
        else {
            this.setState({
                courseId: nextProps.courseId,
                courseCode: nextProps.courseCode,
                isEditSubCourse: false,
                subCourse: {}
            });
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 21}
        };


        let uploadProps = {
            action: '/file/upload',
            name: 'user_file',
            method: 'post',
            uploadCallback: this.imgUploadCallback.bind(this)
        };
        return (
            <div>
                <FormItem {...formItemLayout} label="位置:">
                    <InputNumber
                        name='position'
                        min={1}
                        max={10}
                        defaultValue={1}
                        value={this.state.subCourse.position}
                        onChange={this.onPositionChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="banner图:">
                    <Upload {...uploadProps} ></Upload>
                    {
                        this.state.subCourse.banner
                        ? <div className={style['image-preview-wrapper']}>
                            <img src={this.state.subCourse.banner} />
                        </div>
                        : <div className={style['image-preview-placeholder']}></div>
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="课程代码:">
                    <div>{this.props.courseCode}</div>
                </FormItem>
                <FormItem {...formItemLayout} label="开课时间:">
                    <Input
                        name='time'
                        placeholder="开课时间"
                        value={this.state.subCourse.time}
                        onChange={this.onTimeChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="开课城市:">
                    <Input
                        name='city'
                        placeholder="开课城市"
                        value={this.state.subCourse.city}
                        onChange={this.onCityChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="本期导师:">
                    <Input
                        name='teachers'
                        placeholder="本期导师"
                        value={this.state.subCourse.teachers}
                        onChange={this.onTeachersChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="课程介绍:">
                    <Input
                        name='describe'
                        placeholder="课程介绍"
                        value={this.state.subCourse.describe}
                        onChange={this.onDescribeChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="课程价格:">
                    <Input
                        name='price'
                        placeholder="课程价格"
                        value={this.state.subCourse.price}
                        onChange={this.onPriceChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="报名人数:">
                    <Input
                        name='max_enter_num'
                        placeholder="报名人数"
                        value={this.state.subCourse.max_enter_num}
                        onChange={this.onMaxEnterNumChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="按钮文案:">
                    <Input
                        name='button_word'
                        placeholder="按钮文案"
                        value={this.state.subCourse.button_word}
                        onChange={this.onButtonWordChange.bind(this)}
                    />
                </FormItem>
            </div>
        );
    }

    onPositionChange(value) {
        let subCourse = this.state.subCourse;
        subCourse.position = value;
        this.setState({
            subCourse
        });
    }

    imgUploadCallback(response) {
        let res = JSON.parse(response);
        let subCourse = this.state.subCourse;
        subCourse.banner = res.data.file_path;
        this.setState({
            subCourse
        });
    }

    onTimeChange(e) {
        let time = e.target.value;
        let subCourse = this.state.subCourse;
        subCourse.time = time;
        this.setState({
            subCourse
        });
    }

    onCityChange(e) {
        let city = e.target.value;
        let subCourse = this.state.subCourse;
        subCourse.city = city;
        this.setState({
            subCourse
        });
    }

    onTeachersChange(e) {
        let teachers = e.target.value;
        let subCourse = this.state.subCourse;
        subCourse.teachers = teachers;
        this.setState({
            subCourse
        });
    }

    onDescribeChange(e) {
        let describe = e.target.value;
        let subCourse = this.state.subCourse;
        subCourse.describe = describe;
        this.setState({
            subCourse
        });
    }

    onPriceChange(e) {
        let price = e.target.value;
        let subCourse = this.state.subCourse;
        subCourse.price = price;
        this.setState({
            subCourse
        });
    }

    onMaxEnterNumChange(e) {
        /* eslint-disable */
        let maxEnterNum = e.target.value;
        let subCourse = this.state.subCourse;
        subCourse.max_enter_num = maxEnterNum;
        this.setState({
            subCourse
        });
    }

    onButtonWordChange(e) {
        /* eslint-disable */
        let word = e.target.value;
        let subCourse = this.state.subCourse;
        subCourse.button_word = word;
        this.setState({
            subCourse
        });
    }

    getSubCourseDetail() {
        let subCourse = Object.assign({}, this.state.subCourse);
        // 如果是新建子课程，需要传入主课程的id
        if (!this.state.isEditSubCourse) {
            subCourse.id = this.state.courseId;
        }
        return subCourse;
    }
}
