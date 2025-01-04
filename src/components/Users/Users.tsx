import React, {useCallback, useEffect} from 'react';
import User from "./User";
import {
    changeFollow,
    fetchUsers,
    followUser,
    loadMoreUsers,
    unfollowUser
} from "../../redux/usersReducer";
import style from './Users.module.css'
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";


export default function Users() {

    const dispatch = useAppDispatch();

    const {users, loading, error, count} = useAppSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers(count));
    }, [dispatch, count])

    const onButtonClick = (follow: boolean, id: number) => {
        follow ? dispatch(unfollowUser(id)) : dispatch(followUser(id));
        dispatch(changeFollow(id))
    }

    //using useCallback to prevent unnecessary re-renders
    const handleFollowClick = useCallback((follow: boolean, id: number) => {
        onButtonClick(follow, id)
    }, [])

    const onLoadMoreUsers = () => {
        dispatch(loadMoreUsers())
    }

    let usersList = users.map(user =>
        <User user={user} onFollowClick={handleFollowClick}/>
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

