import React, {useState} from 'react';
import style from './UserPost.module.css'

type PostPropsType = {
    message: string | null
    likes: number
}

const UserPost = ({message = 'No message', likes = 0}: PostPropsType) => {

    const [fakeLike, setFakeLike] = useState<number>(likes);

    function onLikeClick() {
        setFakeLike(fakeLike + 1)
    }

    return (
        <article className={style.postItem}>
            <div className={style.item}>
                <img
                    src="https://as1.ftcdn.net/v2/jpg/03/64/88/42/1000_F_364884228_JIux2brVPuxvpm7wmgShdUMWkOAQCsXM.jpg"
                    alt="User avatar"/>
                <p className={style.itemUsername}>Anna Kolosova</p>
            </div>
            <div className={style.itemContent}>
                <p>{message}</p>
                <div>
                    <p className={style.likeCount}>
                        <i className={style.likeIcon}
                           role='button'
                           aria-label={`Likes: ${fakeLike}`}
                           onClick={onLikeClick}>&#9829;</i>
                        {fakeLike}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default UserPost;
