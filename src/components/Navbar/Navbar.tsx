import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/redux-store";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Person2Icon from '@mui/icons-material/Person2';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsIcon from '@mui/icons-material/Settings';

function Navbar() {

    const isAuth = useAppSelector(state => state.auth.isAuth);

    // Ensure the Navbar is not rendered if the user is not authenticated
    if (!isAuth) {
        return null;
    }

    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <div className={styles.navContainer}>
                <ul className={styles.navList}>
                    <li className={styles.item}>
                        <NavLink className={styles.itemLink} to="/profile" aria-label="Profile">
                            <Person2Icon aria-hidden="true" />
                            <p className={styles.itemLinkP}>Profile</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink className={styles.itemLink} to="/dialogs" aria-label="Dialogs">
                            <MailOutlineIcon aria-hidden="true" />
                            <p className={styles.itemLinkP}>Messages</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink className={styles.itemLink} to="/users" aria-label="Users">
                            <SupervisorAccountIcon aria-hidden="true" />
                            <p className={styles.itemLinkP}>Users</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink className={styles.itemLink} to="/settings" aria-label="Settings">
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
