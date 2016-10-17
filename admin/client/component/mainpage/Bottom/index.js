/**
 * @file component 『首页-底部图文区』配置页面
 * @author Yuan Yanjun
 * @date 2010.10.09
 */

import React, {Component} from 'react';
import style from './style.css';
// import Loading from '../../Loading';
import service from '../../../service';
import SubHeader from '../../SubHeader';

const antd = require('antd');
const Button = antd.Button;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    render() {
        return (
            <div>
                <SubHeader>首页底部配置</SubHeader>
                <div className={style['wrapper-editor']}>
                    这里是编辑区域
                </div>
                <div className={style['wrapper-btns']}>
                    <Button
                        type='primary'
                        style={{
                            marginRight: '20px'
                        }}
                    >
                        保存
                    </Button>
                    <Button>
                        取消
                    </Button>
                </div>
            </div>
        );
    }

    loadData() {
        let me = this;
        this.caches.loadDataRequest = service.getHomeButton().then(function (response) {
            me.setState({
                content: response.data.content
            });
        });
    }
}
