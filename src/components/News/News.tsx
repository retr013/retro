import React from 'react';
import style from './News.module.css'

type newsProps = {
    a: string
}

export default function News({a}: newsProps) {
    return (
        <div className={style.item}>props.a = {a}</div>
    )
}