import React from 'react';
import style from './UserPost.module.css'

const UserPost = (props) => {
    return (
        <>
            <div className={style.postItem}>
                <div className={style.item}>
                    <img src="https://as1.ftcdn.net/v2/jpg/03/64/88/42/1000_F_364884228_JIux2brVPuxvpm7wmgShdUMWkOAQCsXM.jpg"
                         alt=""/>
                    <p className={style.itemUsername}>{props.name ? props.name : 'Anna Kolosova'}</p>
                </div>
                <div className={style.itemContent}>
                    <p>{props.message}</p>
                </div>
                <div>
                    <p className={style.likeCount}>Like: {props.likes}</p>
                </div>
            </div>
        </>
    );
};

export default UserPost;
