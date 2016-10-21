/**
 * @file component 『首页-底部图文区』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 *
 * tinymce实现文件上传功能：
 *     1. http://stackoverflow.com/questions/32142099/tinymce-image-upload
 *     2. https://www.tinymce.com/docs/configure/file-image-upload/
 */

import React, {Component} from 'react';
import style from './style.css';
// import Loading from '../../Loading';
import service from '../../../service';
import SubHeader from '../../SubHeader';
import TinyMCE from 'react-tinymce';

const antd = require('antd');
const Button = antd.Button;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 拉取下的原始数据
            latestSavedContent: null,
            editorId: 'my-editor'
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

    // componentWillReceiveProps(nextProps) {
    //     let editor = tinymce.EditorManager.get(this.id);
    //     if (editor && !isEqual(editor.getContent(), nextProps.content)) {
    //         tinymce.EditorManager.get(this.id).setContent(nextProps.content)
    //     }
    // }

    // shouldComponentUpdate() {

    // }

    render() {
        let editorProps = {
            id: 'my-editor',
            // 这个有bug，不会刷新editor 的内容
            // https://github.com/instructure-react/react-tinymce/issues/21
            content: this.state.content,
            config: {
                width: 640,
                height: 960,
                plugins: 'link image code textcolor colorpicker',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code '
                    + '| image | forecolor backcolor'
            },
            onChange: this.handleEditorChange.bind(this)
        };
        return (
            <div>
                <SubHeader>首页底部配置</SubHeader>
                <div className={style['wrapper-editor']}>
                    <TinyMCE {...editorProps} />
                </div>
                <div className={style['wrapper-btns']}>
                    <Button
                        type='primary'
                        style={{
                            marginRight: '20px'
                        }}
                        onClick={this.onSave.bind(this)}
                    >
                        保存
                    </Button>
                    <Button onClick={this.onCancel.bind(this)}>
                        取消
                    </Button>
                </div>
            </div>
        );
    }

    loadData() {
        let me = this;
        this.caches.loadDataRequest = service.getHomeButton().then(function (response) {
            let editor = window.tinymce.EditorManager.get(me.state.editorId);
            editor.setContent(response.data.content);
            me.setState({
                latestSavedContent: response.data.content
            });
        });
    }

    handleEditorChange(e) {
    }

    onSave() {
        let me = this;
        let editor = window.tinymce.EditorManager.get(this.state.editorId);
        let content = editor.getContent();

        service.updateHomeButton(content).then(function (res) {
            me.setState({
                latestSavedContent: content
            });
        });
    }

    onCancel() {
        let editor = window.tinymce.EditorManager.get(this.state.editorId);
        editor.setContent(this.state.latestSavedContent);
    }
}
