/**
 * @file component 『首页-底部图文区』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 *
 * tinymce实现文件上传功能：
 *     1. http://stackoverflow.com/questions/32142099/tinymce-image-upload
 *     2. https://www.tinymce.com/docs/configure/file-image-upload/
 *
 * 如何在webpack中结合tinyMCE可以参考下面两篇文章，等后面熟练webpack后一定要实践：
 * http://stackoverflow.com/questions/30522896/how-to-shim-tinymce-in-webpack
 * https://github.com/tinymce/tinymce/issues/2836
 * https://shellmonger.com/2016/01/22/working-with-fonts-with-webpack/
 */

import React, {Component} from 'react';
import style from './style.css';
import service from '../../../service';
import SubHeader from '../../SubHeader';

const antd = require('antd');
const Button = antd.Button;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 拉取下的原始数据
            latestSavedContent: null
        };
    }

    componentDidMount() {
        this.initEditor();

        this.caches = {};
        this.loadData();
    }

    componentWillUnmount() {
        this.caches.loadDataRequest
        && this.caches.loadDataRequest.abort
        && this.caches.loadDataRequest.abort();

        this.destroyEditor();
    }

    render() {
        return (
            <div>
                <SubHeader>首页底部配置</SubHeader>
                <div className={style['wrapper-editor']}>
                    <textarea id='my-tinymce-eidtor'></textarea>
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

    initEditor() {
        /* eslint-disable */
        window.tinymce.init({
            selector: '#my-tinymce-eidtor',
            width: 640,
            height: 960,
            file_browser_callback(field_name, url, type, win) {
                // win.document.getElementById(field_name).value = 'my browser value';
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

            // images_upload_handler(blobInfo, success, failure) {
            //     let xhr;
            //     let formData;

            //     xhr = new window.XMLHttpRequest();
            //     xhr.withCredentials = false;
            //     xhr.open('POST', '/file/upload');
            //     xhr.onload = function () {
            //         let json;

            //         if (xhr.status !== 200) {
            //             failure('HTTP Error: ' + xhr.status);
            //             return;
            //         }

            //         json = JSON.parse(xhr.responseText);

            //         if (!json || typeof json.file_path !== 'string') {
            //             failure('Invalid JSON: ' + xhr.responseText);
            //             return;
            //         }

            //         success(json.file_path);
            //     };

            //     formData = new FormData();
            //     formData.append('user_file', blobInfo.blob(), blobInfo.filename());

            //     xhr.send(formData);
            // },

            plugins: 'link image code textcolor colorpicker',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code '
                + '| image | forecolor backcolor'
        });
    }

    destroyEditor() {
        let editor = window.tinymce.EditorManager.get('my-tinymce-eidtor');
        editor.destroy();
    }

    loadData() {
        let me = this;
        this.caches.loadDataRequest = service.getHomeButton().then(function (response) {
            let editor = window.tinymce.EditorManager.get('my-tinymce-eidtor');
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
        let editor = window.tinymce.EditorManager.get('my-tinymce-eidtor');
        let content = editor.getContent();

        service.updateHomeButton(content).then(function (res) {
            me.setState({
                latestSavedContent: content
            });
        });
    }

    onCancel() {
        let editor = window.tinymce.EditorManager.get('my-tinymce-eidtor');
        editor.setContent(this.state.latestSavedContent);
    }
}
