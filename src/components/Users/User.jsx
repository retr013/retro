import React from 'react';
import style from './User.module.css'
import {NavLink} from "react-router-dom";
import {CircularProgress} from "@mui/material";

export default function User(props) {
    return (
        <div className={style.UserContainer}>
            <NavLink to={'/profile/' + props.id}>
                <div className={style.imgContainer} style={{backgroundImage: `url(${props.img})`}}></div>
            </NavLink>
            <div className={style.info}>
                <div>
                    <h2>{props.fullName}</h2>
                </div>
                <div>
                    <button className={style.button} disabled={props.loading}
                            onClick={() => props.onFollowClick(props.followStatus, props.id)}>
                        {props.loading ?
                            props.loading && <CircularProgress style={{
                                width: "14px",
                                height: "14px"
                            }} sx={{background: 'none', color: 'black'}}/>
                            :
                            props.followStatus ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
                <div>
                    {props.status}
                </div>
            </div>
        </div>
    )
}