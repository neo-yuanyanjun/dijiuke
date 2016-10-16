/**
 * @file 新增和修改首页课程配置
 * @author Yuan Yanjun
 * @date 2016.10.16
 */

import React, {Component} from 'react';
import style from './style.css';
import Upload from '../../Upload';

const antd = require('antd');
const Button = antd.Button;
const Form = antd.Form;
const Input = antd.Input;
const Icon = antd.Icon;
const InputNumber = antd.InputNumber;
const FormItem = Form.Item;

export default class extends Component {
    constructor(props) {
        super(props);
        /* eslint-disable */
        let defaultCouserInfo = {
            position: null,
            banner: '',
            time: '',
            city: '',
            describe: '',
            price: 0,
            button_word: '',
            button_link: '',
            name: ''
        };

        this.state = {
            course: props.course || defaultCouserInfo
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.course) {
            this.setState({
                course: nextProps.course
            });
        }
    }

    render() {
        let formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16}
        };

        // upload
        let uploadProps = {
            action: '/file/upload',
            name: 'userfile',
            method: 'post',
            uploadCallback: this.imgUploadCallback.bind(this)
        };

        return (
            <div>
                <FormItem {...formItemLayout} label="课程名称:">
                    <Input
                        size='default'
                        name='name'
                        placeholder="课程名称"
                        value={this.state.course.name}
                        onChange={this.onNameChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="位置:">
                    <InputNumber
                        name='position'
                        min={1}
                        max={10}
                        defaultValue={1}
                        value={this.state.course.position}
                        onChange={this.onPositionChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="banner图">
                    <Upload {...uploadProps} ></Upload>
                    {
                        this.state.course && this.state.course.banner
                        ? <div className={style['image-preview-wrapper']}>
                            <img src={this.state.course.banner} />
                        </div>
                        : <div className={style['image-preview-placeholder']}></div>
                    }
                </FormItem>
            </div>
        );
    }

    onNameChange(e) {
        let course = this.state.course;
        course.name = e.target.value;
        this.setState({
            course
        });
    }

    onPositionChange(value) {
        let course = this.state.course;
        course.position = value;
        this.setState({
            course
        });
    }

    imgUploadCallback(response) {
        let res = JSON.parse(response);
        let course = this.state.course;
        course.banner = res.data;
        this.setState({
            course
        });
    }

    getCourseInfo() {
        return this.state.course;
    }
}
