import React, {useEffect, useOptimistic} from 'react';
import User from "./User";
import axios from "axios";
import avatar from '../../assets/img/avatar.png'
import {useDispatch, useSelector} from "react-redux";
import {
    changeFollow,
    fetchUsers,
    followUser,
    loadMoreUsers,
    unfollowUser
} from "../../redux/usersReducer";
import style from './Users.module.css'
import {CircularProgress} from "@mui/material";
import {Navigate} from "react-router-dom";

export default function Users() {

    const dispatch = useDispatch();

    const {users, loading, followLoading, error, count} = useSelector(state => state.users);

    const isAuthorised = useSelector(state => state.auth.isAuth);

    useEffect(() => {
        dispatch(fetchUsers(count));
    }, [dispatch, count])

    const onButtonClick = (follow, id) => {
        follow ? dispatch(unfollowUser(id)) : dispatch(followUser(id));
        dispatch(changeFollow(id))
    }

    const onLoadMoreUsers = () => {
        dispatch(loadMoreUsers())
    }

    let usersList = users.map(user =>
        <User key={user.id} img={user.photos.small ? user.photos.small : avatar} fullName={user.name}
              followStatus={user.followed}
              status={user.status} id={user.id} onFollowClick={onButtonClick} loading={user.loading}/>
    )

    if (error) {
        return <>
            <p>{error}</p>
        </>
    }

    return (
        <>
            <div className={style.usersContainer}>
                {loading && <CircularProgress sx={{background: 'none', color: 'white', position: 'absolute'}}/>}
                {usersList}
                {users.length ?
                    <div className={style.loadButtonContainer}>
                        <button className={style.loadButton} onClick={onLoadMoreUsers}>
                            {!loading ? 'More Users' :
                                <CircularProgress sx={{
                                    color: 'black',
                                    background: 'none',
                                }}/>}
                        </button>
                    </div> : null
                }
            </div>
        </>
    )
}

