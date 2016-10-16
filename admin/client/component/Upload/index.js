import React, {Component} from 'react';
// import style from './style.css';

const antd = require('antd');
const Button = antd.Button;
const Icon = antd.Icon;

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    btnClickHander() {
        this.refs['upload-plugin-input'].click();
    }

    inputChangehandler() {
        this.refs['upload-plugin-form'].submit();
    }

    iframeLoadHandler() {
        var response = this.refs['upload-plugin-iframe'].contentDocument.body.innerText;
        if (!response) {
            return;
        }
        this.props.uploadCallback(response);
    }

    componentDidMount() {
        // React iframe 不支持 onLoad 事件，
        // 只能按照这种原生的方式来添加事件
        var iframeDOMNode = this.refs['upload-plugin-iframe'];
        iframeDOMNode.onload = this.iframeLoadHandler.bind(this);
    }

    render() {
        let iframeId = 'upload-plugin-iframe-' + Date.now();
        let formProps = {
            ref: 'upload-plugin-form',
            action: this.props.action,
            method: this.props.method,
            encType: 'multipart/form-data',
            target: iframeId
        };

        let inputPorps = {
            ref: 'upload-plugin-input',
            name: this.props.name,
            style: {
                display: 'none'
            },
            onChange: this.inputChangehandler.bind(this)
        };

        let buttonProps = {
            onClick: this.btnClickHander.bind(this)
        };

        let iframeProps = {
            ref: 'upload-plugin-iframe',
            id: iframeId,
            name: iframeId,
            src: '',
            style: {
                display: 'none'
            }
        };
        return (
            <div>
                <form {...formProps}>
                    <input type='file' {...inputPorps} />
                    <Button {...buttonProps}>
                        <Icon type="upload" /> 上传
                    </Button>
                </form>
                <iframe {...iframeProps} />
            </div>
        );
    }
}
