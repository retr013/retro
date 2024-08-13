import React, {createRef} from 'react';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem';
import Message from "./Message";
import SendIcon from '@mui/icons-material/Send';

function Dialogs(props) {

    let textAreaRef = createRef()

    function messageSend() {
        props.onMessageSend();
    }

    function onMessageChange() {
        let message = textAreaRef.current.value;
        props.onMessageChangeContainer(message);
    }

    let dialogItems = props.state.dialogs.map(
        user => <DialogItem name={user.name} id={user.id} key={user.id}/>
    )

    let messagesItems = props.state.messages.map(
        messageItem => <Message message={messageItem.message} key={messageItem.id}/>
    )

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogItems}
            </div>
            <div className={style.messages}>
                <div className={style.messagesContainer}>
                    {messagesItems}
                </div>
                <div className={style.textArea}>
                <textarea className={style.dialogTextArea} value={props.newMessageText} name="" ref={textAreaRef}
                          cols="10" rows="3" onChange={onMessageChange} placeholder='new message'></textarea>
                    <button className={style.dialogTextButton} onClick={messageSend}><SendIcon/>></button>
                </div>
            </div>
        </div>
    )

}

export default Dialogs;
