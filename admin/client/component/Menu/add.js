/**
 * @file 新增菜单配置
 * @author Yuan Yanjun
 * @date 20161029
 */

import React, {Component} from 'react';
import Upload from '../Upload';
import style from './style.css';

const antd = require('antd');
const {Input, InputNumber, Form} = antd;
const FormItem = Form.Item;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType: this.props.actionType,
            menuItem: this.props.actionType === 'modify'
                ? this.props.modifyMenuItem
                : {}
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        this.state = {
            actionType: nextProps.actionType,
            menuItem: nextProps.actionType === 'modify'
                ? nextProps.modifyMenuItem
                : {}
        };
    }

    imgUploadCallback(response) {
        response = JSON.parse(response);
        let menuItem = this.state.menuItem;
        menuItem.icon = response.data.file_path;
        this.setState({
            menuItem
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

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
                        max={20}
                        defaultValue={1}
                        value={this.state.menuItem.position}
                        onChange={this.onPositionChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="图标:">
                    <Upload {...uploadProps} ></Upload>
                    {
                        this.state.menuItem.icon
                        ? <div className={style['image-preview-wrapper']}>
                            <img src={this.state.menuItem.icon} />
                        </div>
                        : <div className={style['image-preview-placeholder']}></div>
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="选项名称:">
                    <Input
                        name='name'
                        placeholder="选项名称"
                        value={this.state.menuItem.name}
                        onChange={this.onNameChange.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="跳转链接:">
                    <Input
                        name='link'
                        placeholder="跳转链接"
                        value={this.state.menuItem.link}
                        onChange={this.onLinkChange.bind(this)}
                    />
                </FormItem>
            </div>
        );
    }

    onPositionChange(value) {
        let menuItem = this.state.menuItem;
        menuItem.position = value;
        this.setState({
            menuItem
        });
    }

    onNameChange(e) {
        let menuItem = this.state.menuItem;
        menuItem.name = e.target.value;
        this.setState({
            menuItem
        });
    }

    onLinkChange(e) {
        let menuItem = this.state.menuItem;
        menuItem.link = e.target.value;
        this.setState({
            menuItem
        });
    }

    getMenuItemDetail() {
        return Object.assign({}, this.state.menuItem);
    }
}
