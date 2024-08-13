import React, {Component} from 'react';
import style from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

export default function Message(props) {
    let url = '/dialogs/';
    return (
        <div className={style.dialog}>
            <NavLink className={style.dialogText} to={url + props.id}>{props.name}</NavLink>
        </div>
    )
}