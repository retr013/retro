import React from 'react';
import style from './Header.module.css'
import { logout} from "../../redux/authReducer";
import { NavLink, useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/redux-store";

function Header() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userInfo, isAuth }  = useAppSelector(state => state.auth)

    const onLogoutClick = async () => {
        try {
            await dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <header className={style.header}>
            <div className={style.headerContainer}>
                <div className={style.logo}>
                    <p className={style.logoText} aria-label="Retro">RETR<span className={style.logoSpan}>O</span></p>
                </div>
                <div className={style.loginContainer}>
                    <NavLink to={`/profile/${userInfo.id}`} aria-label="Your profile">
                        {isAuth ?
                            <div className={style.logoutContainer}>
                                <p>{userInfo.login}</p>
                                <button onClick={onLogoutClick} className={style.logout} aria-label="Logout">Logout</button>
                            </div>
                            : ''}
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;