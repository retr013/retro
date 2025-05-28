import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/redux-store";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Person2Icon from '@mui/icons-material/Person2';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';

function Navbar() {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    if (!isAuth) {
        return null;
    }

    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <div className={styles.navContainer}>
                <ul className={styles.navList}>
                    <li className={styles.item}>
                        <NavLink 
                            className={({ isActive }) => 
                                `${styles.itemLink} ${isActive ? styles.active : ''}`
                            } 
                            to="/profile" 
                            aria-label="Profile"
                        >
                            <Person2Icon aria-hidden="true" />
                            <p className={styles.itemLinkP}>Profile</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink 
                            className={({ isActive }) => 
                                `${styles.itemLink} ${isActive ? styles.active : ''}`
                            } 
                            to="/dialogs" 
                            aria-label="Dialogs"
                        >
                            <MailOutlineIcon aria-hidden="true" />
                            <p className={styles.itemLinkP}>Messages</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink 
                            className={({ isActive }) => 
                                `${styles.itemLink} ${isActive ? styles.active : ''}`
                            } 
                            to="/users" 
                            aria-label="Users"
                        >
                            <SupervisorAccountIcon aria-hidden="true" />
                            <p className={styles.itemLinkP}>Users</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink 
                            className={({ isActive }) => 
                                `${styles.itemLink} ${isActive ? styles.active : ''}`
                            } 
                            to="/settings" 
                            aria-label="Settings"
                        >
                            <SettingsIcon aria-hidden="true" />
                            <p className={styles.itemLinkP}>Technology</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
