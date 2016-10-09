import React, {Component} from 'react';
import style from './style.css';

const antd = require('antd');
const Button = antd.Button;

export default class Banners extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let record = this.props.record;
        debugger;
        return (
            <div>
                {this.props.record ? '修改banner' : '新建banner'}
            </div>
        );
    }
}
