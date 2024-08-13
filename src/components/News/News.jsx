import React, {Component} from 'react';
import style from './News.module.css'

export default function News(props) {
    return (
        <div className={style.item}>props.a = {props.a}</div>
    )
}