/**
 * @file 配置tab菜单
 * @author Yuan Yanjun
 * @date 2016.10.27
 */
import React, {Component} from 'react';

import style from './style.css';
import service from '../../service';
import SubHeader from '../SubHeader';
import Loading from '../Loading';
import AddMenuItem from './add';

const antd = require('antd');
const {Button, Table, Modal} = antd;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 正在加载数据
            isLoading: true,
            // 数据列表
            menus: null,
            // 弹出框是否可见
            modalVisible: false,
            // 操作类型
            actionType: null,
            // 修改的物料
            modifyMenuItem: null
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

    render() {
        let tableProps = {
            pagination: false,
            dataSource: this.state.menus,
            columns: this.getTableColumnsConfig(),
            bordered: true
        };

        let modalProps = {
            width: 600,
            closable: true,
            maskClosable: false,
            title: (
                    <div>
                        {this.state.actionType === 'add' ? '新建配置' : '修改配置'}
                    </div>
                ),
            visible: this.state.modalVisible,
            onOk: this.onModalOk.bind(this),
            onCancel: this.onModalCancel.bind(this),
            okText: '保存',
            cancelText: '关闭'
        };

        let addMenuItemProps = {
            ref: 'add-menu-item-component',
            modifyMenuItem: this.state.actionType === 'modify' ? Object.assign({}, this.state.modifyMenuItem) : null,
            actionType: this.state.actionType
        };

        return (
            <div>
                <SubHeader>菜单Tab配置</SubHeader>
                <div className={style['wrapper-add-btn']}>
                    <Button
                        type='primary'
                        onClick={this.onAddMenuItem.bind(this)}
                    >
                        新增配置
                    </Button>
                </div>
                {
                    this.state.isLoading
                    ? <Loading></Loading>
                    : <div className={style['wrapper-table']}>
                        <Table {...tableProps}></Table>
                    </div>
                }
                <Modal {...modalProps}>
                    <AddMenuItem {...addMenuItemProps}></AddMenuItem>
                </Modal>
            </div>
        );
    }

    getTableColumnsConfig() {
        let me = this;
        return [
            {
                width: 50,
                title: '位置',
                dataIndex: 'position',
                key: 'position'
            },
            {
                width: 200,
                title: '图标',
                dataIndex: 'icon',
                render(text, record, index) {
                    return (
                        <div>
                            <img src={text} />
                        </div>
                    );
                }
            },
            {
                width: 200,
                title: '选项名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                width: 300,
                title: '跳转链接',
                dataIndex: 'link',
                key: 'link'
            },
            {
                // width: 200,
                title: '操作',
                render(text, record, index) {
                    return (
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <Button
                                type='primary'
                                style={{marginRight: '10px'}}
                                onClick={me.onModifyMenuItem.bind(me, record)}
                            >
                                修改
                            </Button>
                            <Button
                                type='primary'
                                onClick={me.onDeleteMenuItem.bind(me, record)}
                            >
                                删除
                            </Button>
                        </div>
                    );
                }
            }
        ];
    }

    onAddMenuItem() {
        this.setState({
            actionType: 'add',
            modalVisible: true,
            modifyMenuItem: null
        });
    }

    onModifyMenuItem(menuItem) {
        this.setState({
            actionType: 'modify',
            modalVisible: true,
            modifyMenuItem: menuItem
        });
    }

    onDeleteMenuItem(menuItem) {
        Modal.confirm({
            title: '确认',
            content: '确定删除该配置么？',
            okText: '确定删除',
            cancelText: '取消',
            onOk: function () {
                service.deleteMenuItem(menuItem.id).then(function () {
                    this.loadData();
                }.bind(this));
            }.bind(this),
            onCancel() {
                // do nothing
            }
        });
    }

    loadData() {
        this.setState({
            isLoading: true
        });
        return service.getMenuItems().then(function (response) {
            this.setState({
                menus: response.data.menus,
                isLoading: false
            });
        }.bind(this));
    }

    onModalOk() {
        let menuItemDetail = this.refs['add-menu-item-component'].getMenuItemDetail();
        if (this.state.actionType === 'modify') {
            service.updateMenuItem(menuItemDetail).then(function () {
                this.loadData();
            }.bind(this));
        }
        else if (this.state.actionType === 'add') {
            service.addMenuItem(menuItemDetail).then(function () {
                this.loadData();
            }.bind(this));
        }
        this.setState({
            actionType: null,
            modalVisible: false,
            modifyMenuItem: null
        });
    }

    onModalCancel() {
        this.setState({
            actionType: null,
            modalVisible: false,
            modifyMenuItem: null
        });
    }
}
