import React, {Component} from 'react';

const Button = require('antd').Button;

export default [
    {
        width: 50,
        title: '位置',
        dataIndex: 'position',
        key: 'position'
    },
    {
        width: 200,
        title: 'banner图',
        dataIndex: 'pic',
        key: 'pic',
        render: function (text, record, index) {
            return (
                <div>
                    <img src={text}/>
                </div>
            );
        }
    },
    {
        width: 200,
        title: '跳转链接',
        dataIndex: 'link',
        key: 'link'
    },
    {
        width: 200,
        title: '操作',
        render: function (text, record, index) {
            return (
                <div style={{
                    textAlign: 'right'
                }}>
                    <Button style={{marginRight: '10px'}}>修改</Button>
                    <Button>删除</Button>
                </div>
            );
        }
    }
];
