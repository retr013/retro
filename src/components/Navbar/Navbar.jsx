import React, {useEffect} from 'react';
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";


function Navbar() {

    const isAuth = useSelector(state => state.auth.isAuth)

    useEffect(() => {

    }, [isAuth]);

    return (
        <>
            {isAuth ?
                <nav className={styles.nav}>
                    <div className={styles.navContainer}>
                        <div className={styles.item}>
                            <NavLink className={styles.itemLink} to="/profile">Profile</NavLink>
                        </div>
                        <div className={styles.item}>
                            <NavLink className={styles.itemLink} to="/dialogs">Messages</NavLink>
                        </div>
                        <div className={styles.item}>
                            <NavLink className={styles.itemLink} to="/users">Users</NavLink>
                        </div>
                        <div className={styles.item}>
                            <NavLink className={styles.itemLink} to="/news">News</NavLink>
                        </div>
                        <div className={styles.item}>
                            <NavLink className={styles.itemLink} to="">Music</NavLink>
                        </div>
                        <div className={styles.item}>
                            <NavLink className={styles.itemLink} to="">Settings</NavLink>
                        </div>
                    </div>
                </nav>
                :
                // <nav className={styles.nav}>
                //     <div className={styles.navContainer}>
                //         <div className={styles.item}>
                //             <NavLink className={styles.itemLink} to="/login">Login</NavLink>
                //         </div>
                //     </div>
                // </nav>
                null
                }
        </>
    )
}

export default Navbar;
