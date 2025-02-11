import React, {JSX, useEffect} from 'react';
import style from './MyPost.module.css'
import UserPost from "./UserPost/UserPost";
import {addPost, fetchPosts, updatePost} from "../../redux/profileReducer";
import { useAppDispatch, useAppSelector } from "../../redux/redux-store";
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";

function MyPost() {

    const dispatch = useAppDispatch();

    const elementsList = useAppSelector(state => state.profile.posts);
    const newPostText: string = useAppSelector(state => state.profile.newPostText);

    const { register, handleSubmit } = useForm();
    
    // Fetch posts when the component mounts
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    // Handle text area change
    function onPostChange(event: React.ChangeEvent<HTMLInputElement>) {
        let text = event.target.value;
        dispatch(updatePost(text))
    }

    function onPostSubmit() {
        dispatch(addPost())
    }

    // Render list of posts
    let postElements: JSX.Element[] = elementsList.map(
        (post) => <UserPost message={post.body} likes={post.userId} key={post.id}/>
    )

    return (
        <div className={style.post}>
            <div className={style.container}>
                <h3 className={style.textH3}>What's on your mind?</h3>
                <div className={style.postTextAreaContainer}>
                    <form className={style.form} onSubmit={handleSubmit(onPostSubmit)}>
                        <input {...register('postInput')} name='postInput' type="text" className={style.postInput}
                               placeholder='new message' value={newPostText}
                               onChange={onPostChange}/>
                        <button className={style.sendIcon}><SendIcon/></button>
                    </form>
                </div>
                <div className={style.postsContainer}>
                    {postElements}
                </div>
            </div>
        </div>
    );
};

export default MyPost;
