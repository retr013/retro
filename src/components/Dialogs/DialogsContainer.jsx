import React, {createRef} from 'react';
import {postMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

// function DialogsContainer(props) {
//
//     let state = props.state.state.dialogsReducer;
//
//     function onMessageSend() {
//         props.state.dispatch(postMessageActionCreator());
//     }
//
//     function onMessageChange(text) {
//         props.state.dispatch(updateNewMessageActionCreator(text))
//     }
//
//     return (
//         <Dialogs onMessageSend={onMessageSend} onMessageChangeContainer={onMessageChange}
//                  state={state}/>
//     )
//
// }

let mapStateToProps =  (state) => {
    return {
        state: state.dialogsReducer,
        newMessageText: state.dialogsReducer.newMessageText
    }
}
let mapDispatchToProps =  (dispatch) => {
    return {
        onMessageSend: () => {dispatch(postMessageActionCreator())},
        onMessageChangeContainer: (text) => {dispatch(updateNewMessageActionCreator(text))}
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
