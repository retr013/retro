import React, {memo} from 'react';
import style from './User.module.css'
import {NavLink} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import avatar from '../../assets/img/avatar.png'

import {UserType} from "../../redux/usersReducer";

type UserProps = {
    user: UserType
    onFollowClick: (follow: boolean, id: number) => void
}


function User({user, onFollowClick}: UserProps) {
    return (
        <article className={style.UserContainer}>
            <NavLink to={'/profile/' + user.id}>
                <div className={style.imgContainer} style={{backgroundImage: `url(${user.photos.small || avatar})`}}
                     aria-label="Profile picture"></div>
            </NavLink>
            <div className={style.info}>
                <div>
                    <h2>{user.name}</h2>
                </div>
                <div>
                    <button className={style.button}
                            disabled={user.loading}
                            onClick={() => onFollowClick(user.followed, user.id)}
                            aria-busy={user.loading}
                    >
                        {user.loading ?
                            user.loading && <CircularProgress style={{
                                width: "14px",
                                height: "14px"
                            }} sx={{background: 'none', color: 'black'}}/>
                            :
                            user.followed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
                <div>
                    {user.status && <p>{user.status}</p>}
                </div>
            </div>
        </article>
    )
}

//memoizing the component to prevent unnecessary re-renders
export default memo(User);