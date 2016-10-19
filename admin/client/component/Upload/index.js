/**
 * @file file upload component
 * @author  Yuan Yanjun
 * 有多种方式何以实现文件上传
 *     1. form + iframe方式，在chrome下兼容性不太好
 *     2. ajax + file API，可以参考
 *         http://www.ibm.com/developerworks/cn/web/1101_hanbf_fileupload/index.html
 *     3. XMLHttpRequest + file + FormData
 * 本文件采用第三种方式
 */

import React, {Component} from 'react';

const antd = require('antd');
const Button = antd.Button;
const Icon = antd.Icon;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    btnClickHander() {
        this.refs['file-upload-input'].click();
    }

    inputChangehandler() {
        let file = this.refs['file-upload-input'].files[0];
        let path = this.props.action;
        let name = this.props.name;
        let uploadCallback = this.props.uploadCallback;

        let form = new window.FormData();
        form.append(name, file);

        let xhr = new window.XMLHttpRequest();
        xhr.open('post', path, true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === window.XMLHttpRequest.DONE && xhr.status === 200) {
                uploadCallback(xhr.responseText);
            }
        };

        xhr.send(form);
    }

    componentDidMount() {

    }

    render() {

        let buttonProps = {
            onClick: this.btnClickHander.bind(this)
        };

        let inputPorps = {
            ref: 'file-upload-input',
            style: {
                display: 'none'
            },
            onChange: this.inputChangehandler.bind(this)
        };
        return (
            <div>
                <input type='file' {...inputPorps} />
                <Button {...buttonProps}>
                    <Icon type="upload" /> 上传
                </Button>
            </div>
        );
    }
}
