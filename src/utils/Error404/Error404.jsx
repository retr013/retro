import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Error404.module.css';

export default function Error404() {
    return (
        <div>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
            <button className={styles.home}>
                <NavLink to={'/profile'} aria-label='Profile'>Back to home</NavLink>
            </button>
        </div>
    )
}
