import React, {Component} from 'react';
import style from './style.css';

export default class SubHeader extends Component {
    render() {
        return (
            <header className={style['sub-header']}>{ this.props.children }</header>
        );
    }
}
