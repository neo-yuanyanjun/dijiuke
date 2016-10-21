/**
 * @file 首页 - banner - 添加+修改
 * @author Yuan Yanjun
 */
import React, {Component} from 'react';
import style from './style.css';
import Upload from '../../Upload';

const antd = require('antd');
// const Form = antd.Form;
// const Input = antd.Input;
// const InputNumber = antd.InputNumber;
const {Form, Input, InputNumber} = antd;
const FormItem = Form.Item;


export default class extends Component {
    constructor(props) {
        super(props);
        let defaultRecord = {
            position: null,
            pic: '',
            link: '',
            id: null
        };
        this.state = {
            record: props.record || defaultRecord
        };
    }

    imgUploadCallback(response) {
        let res = JSON.parse(response);
        let record = this.state.record;
        record.pic = res.data.file_path;
        this.setState({
            record
        });
    }

    onPositionChange(value) {
        let record = this.state.record;
        record.position = value;
        this.setState({
            record
        });
    }

    onLinkChange(e) {
        let record = this.state.record;
        record.link = e.target.value;
        this.setState({
            record
        });
    }

    getRecord() {
        return Object.assign({}, this.state.record);
    }

    componentDidMount() {}


    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                record: nextProps.record
            });
        }
    }

    componentWillUpdate() {

    }

    componentWillUnmount() {
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16}
        };

        // upload
        const uploadProps = {
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
                        value={this.state.record.position}
                        onChange={this.onPositionChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="banner图:">
                    <Upload {...uploadProps} ></Upload>
                    {
                        this.state.record.pic
                        ? <div className={style['image-preview-wrapper']}>
                            <img src={this.state.record.pic} />
                        </div>
                        : <div className={style['image-preview-placeholder']}></div>
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="跳转链接:">
                    <Input
                        name='link'
                        placeholder="跳转链接"
                        value={this.state.record.link}
                        onChange={this.onLinkChange.bind(this)}
                    />
                </FormItem>
            </div>
        );
    }
}
