const types = Object.freeze(
    {
        updateMessageText: 'UPDATE-MESSAGE-TEXT',
        postMessageText: 'POST-MESSAGE-TEXT'
    },
)

let initialState = {
    messages: [
        {id:1, message: 'Hello there1'},
        {id:2, message: 'Hello there2'},
        {id:3, message: 'Hello there3'}
    ],
    dialogs: [
        {id:1, name: 'Max1'},
        {id:2, name: 'Max2'},
        {id:3, name: 'Max3'},
        {id:4, name: 'Max4'},
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    // let newState;
    switch (action.type) {
        case types.updateMessageText:
            return {...state, newMessageText: action.text}
        case types.postMessageText:
            let newMessage = {id: 4, message: state.newMessageText};
            return {...state, newMessageText: '', messages: [...state.messages, newMessage]}
        default:
            return state;
    }
}


export const postMessageActionCreator = () => {
    return {
        type: types.postMessageText
    }
}

export const updateNewMessageActionCreator = (props) => {
    return {
        type: types.updateMessageText,
        text: props
    }
}

export default dialogsReducer;