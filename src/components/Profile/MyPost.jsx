import React, {useEffect} from 'react';
import style from './MyPost.module.css'
import UserPost from "./UserPost/UserPost";
import {addPost, fetchPosts, getPosts, updatePost} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import {fetchProfile} from "../../redux/userProfileReducer";

function MyPost() {

    const dispatch = useDispatch();

    const elementsList = useSelector(state => state.profile.posts);
    const newPostText = useSelector(state => state.profile.newPostText);

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    let newPostElement = React.createRef();

    function onPostChange() {
        let text = newPostElement.current.value;
        dispatch(updatePost(text))
    }

    let postElements = elementsList.map(
        // post => <UserPost message={post.message} likes={post.likes} key={post.id}/>
        post => <UserPost message={post.body} likes={post.userId} key={post.id}/>
    )

    return (
        <div className={style.post}>
            <div className={style.container}>
                <h3>What's on your mind?</h3>
                <div className={style.postTextAreaContainer}>
                    <textarea name="" placeholder='new message' value={newPostText} onChange={onPostChange}
                              ref={newPostElement} cols="10" rows="2"/>
                    <button className={style.sendIcon} onClick={() => dispatch(addPost())}><SendIcon/></button>
                </div>
            </div>
            {postElements}
        </div>
    );
};

export default MyPost;
