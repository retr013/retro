import React from 'react';
import style from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";
import avatar from "../../assets/img/avatar.png";

export default function Message(props) {
    let url = '/dialogs/';
    return (
        <>
            <div className={style.messageHeader}>
                <h2>Messages</h2>
            </div>
            <div className={style.dialog}>
                <img className={style.userImage} src={avatar} alt="user avatar" aria-label='user avatar'/>
                <div className={style.userInfo}>
                    <p className={style.userName}>Max Jones</p>
                    <p className={style.userLastMessage}>Hey its been a while</p>
                    <p></p>
                </div>
            </div>
        </>
    )
}