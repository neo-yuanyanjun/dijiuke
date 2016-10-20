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
        this.state = {
            pic: this.props.pic || '',
            modalVisible: false
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pic) {
            this.setState({
                pic: nextProps.pic
            });
        }
    }

    render() {
        let formItemLayout = {
            labelCol: { span:4 },
            wrapperCol: { span: 16 }
        };

        // upload
        let uploadProps = {
            action: '/file/upload',
            name: 'user_file',
            method: 'post',
            uploadCallback: this.imgUploadCallback.bind(this)
        };

        return (
            <div>
                <FormItem {...formItemLayout} label="位置:">
                    <Upload {...uploadProps} ></Upload>
                    {
                        this.state.pic
                        ? <div className={style['image-preview-wrapper']}>
                            <img src={this.state.pic} />
                        </div>
                        : <div className={style['image-preview-placeholder']}></div>
                    }
                </FormItem>
            </div>
        );
    }

    imgUploadCallback(response) {
        let res = JSON.parse(response);
        this.setState({
            pic: res.data
        });
    }

    getNewCompanyPic() {
        return this.state.pic;
    }
}