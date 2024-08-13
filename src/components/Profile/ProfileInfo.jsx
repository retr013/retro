import style from './ProfileInfo.module.css';
import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updatePageStatus, updateStatus } from "../../redux/userProfileReducer";
import { useParams } from "react-router-dom";
import avatar from "../../assets/img/avatar.png";
import { fetchStatus } from "../../redux/userProfileReducer";

export default function ProfileInfo() {

    const dispatch = useDispatch();

    const params = useParams();

    const statusInput = React.createRef();

    const {user, userStatus} = useSelector(state => state.userProfile)

    const [statusText, setStatusText] = useState('');

    const [editMode, setEditMode] = useState(false);

    const currentUserId = useSelector((state) => state.auth.userInfo.id);
    const currentUserId2 = useSelector((state) => state.auth.userId);

    function onStatusChange() {
        let text = statusInput.current.value
        setStatusText(text)
    }
    function onBlur() {
        dispatch(updateStatus(statusText))
        dispatch(updatePageStatus(statusText))
        onStatusChange()
        setEditMode(false)
    }

    useEffect(() => {
        dispatch(fetchProfile(params.userId? params.userId : currentUserId));
        dispatch(fetchStatus(params.userId? params.userId : currentUserId))
    }, [dispatch, params, currentUserId, userStatus]);

    // console.log(currentUserId + 'id from state auth', user.userId + 'id from state profile')

    return (
        <div className={style.profileInfoContainer}>
            <div className={style.picB} style={{backgroundImage: "url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}></div>
            <div className={style.profilePic} style={{backgroundImage: `url(${user?.photos?.large? user.photos.large : avatar})`}}></div>
            <div className={style.profileInfo}>
                <div className={style.profileInfoTop}>
                    <p className={style.profileInfoName}>{user.fullName}</p>
                    <button className={style.editButton}>Edit profile</button>
                </div>

                {currentUserId !== user.userId ?
                    <div>
                        <h4>{user.aboutMe || 'no status yet'}</h4>
                    </div>
                    :
                    <div>
                        {!editMode ?
                            <div onClick={() => {
                                setEditMode(true)
                                setStatusText(userStatus)
                            }}>
                                <h4>{userStatus || 'no status yet'}</h4>
                            </div>
                            :
                            <input
                                ref={statusInput}
                                autoFocus
                                onChange={onStatusChange}
                                onBlur={onBlur}
                                type="text" value={statusText}/>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
