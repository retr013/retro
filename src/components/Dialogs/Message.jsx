import style from "./Message.module.css";
import {memo} from "react";

function Message({ user, message, photo }) {
    return (
        <div className={style.messageContainer}>
            <div className={style.avatar}>
                <img src={photo} alt="user avatar" aria-label='user avatar'/>
            </div>
            <div className={style.message}>
                <h3>{user}</h3>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default memo(Message);
