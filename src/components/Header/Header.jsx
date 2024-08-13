import React, {useEffect} from 'react';
import style from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchLoginInfo, logout} from "../../redux/authReducer";
import {fetchProfile} from "../../redux/userProfileReducer";
import {Navigate, NavLink} from "react-router-dom";

function Header() {

    const dispatch = useDispatch();

    const { userInfo, isAuth }  = useSelector(state => state.auth)

    useEffect(() => {

    }, [dispatch, isAuth]);
    function onLogoutClick() {
        dispatch(logout())
    }

    return (
        <header className={style.header}>
            <div className={style.headerContainer}>
                <img className={style.logo}
                     src="https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/297px-Starbucks_Corporation_Logo_2011.svg.png?20170312192423"
                     alt=""/>
                <div className={style.loginContainer}>
                    <NavLink to={`/profile/${userInfo.id}`}>
                        {isAuth ?
                            <>
                                <p>{userInfo.login}</p>
                                <button onClick={onLogoutClick}>Logout</button>
                            </>
                            : ''}
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;