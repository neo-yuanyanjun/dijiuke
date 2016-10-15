import React, {Component} from 'react';
import style from './style.css';

const antd = require('antd');
const Button = antd.Button;
const Form = antd.Form;
const Input = antd.Input;
const Upload = antd.Upload;
const Icon = antd.Icon;
const InputNumber = antd.InputNumber;
const FormItem = Form.Item;


class AddBannerForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span:4 },
            wrapperCol: { span: 16 }
        };

        // upload
        const uploadProps = {
            action: '/file/upload',
            name: 'userfile',
            // onChange: this.handleChange,
            multiple: false,
            fileList: []
        };
        return (
            <Form horizontal>
                <FormItem {...formItemLayout} label="位置:">
                    <InputNumber min={1} max={10} defaultValue={1} />
                </FormItem>
                <FormItem {...formItemLayout} label="banner图:">
                    <Upload {...uploadProps} >
                        <Button type="ghost">
                            <Icon type="upload" /> 上传
                        </Button>
                    </Upload>
                    <div className={style['image-preview-wrapper']}>图片预览区域</div>
                </FormItem>
                <FormItem {...formItemLayout} label="跳转链接:">
                    <Input placeholder="跳转链接" />
                </FormItem>
            </Form>
        );
    }
}
AddBannerForm = Form.create()(AddBannerForm);

class AddBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let record = this.props.record;
        return (
            <div>
                {this.props.record ? '修改banner' : '新建banner'}
            </div>
        );
    }
}

export default AddBannerForm;
