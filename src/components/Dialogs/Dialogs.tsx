import React, {useCallback, useEffect, useRef, useState} from 'react';
import style from './Dialogs.module.css';
import Message from "./Message";
import SendIcon from '@mui/icons-material/Send';

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

function Dialogs(props: any) {

    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [newMessageText, setNewMessageText] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    const connectWebSocket = useCallback(() => {
        ws.current = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

        ws.current.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            const newMessages: ChatMessageType[] = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

    }, []);

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connectWebSocket]);

    function messageSend() {
        ws.current!.send(newMessageText);
        setNewMessageText('')
    }

    function onMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let message = e.target.value;
        if (message) {
            setNewMessageText(message);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            messageSend();
        }
    }

    let messagesItems = messages.map((message, index) => <Message message={message.message} user={message.userName}
                                                                  photo={message.photo} key={index}/>)

    return (
        <div className={style.dialogs}>
            <div className={style.chatHeader}>
                <h2>Live chat</h2>
            </div>
            <div className={style.messages}>
                <div className={style.messagesContainer}>
                    {messagesItems}
                </div>
                <div className={style.textArea}>
                    <textarea className={style.dialogTextArea} value={newMessageText} name=""
                                  onChange={onMessageChange} onKeyDown={handleKeyDown} placeholder='new message'></textarea>
                    <button className={style.dialogTextButton} onClick={messageSend}
                            disabled={!Boolean(newMessageText)}><SendIcon/>
                    </button>
                </div>
            </div>
            {!isConnected && (
                <div className={style.errorPopup}>
                    Disconnected. Attempting to reconnect...
                </div>
            )}
        </div>
    )

}

export default Dialogs;
