import React, {Component} from 'react';
import style from './style.module.css';

class UserInput extends Component {
    render() {
        return (
            <input className={style.userInput}/>
        );
    }
}

export default UserInput;