import style from './ProfileInfo.module.css';
import React, {useEffect, useId, useState} from "react";
import {fetchProfile, setProfilePicture, updatePageStatus, updateStatus} from "../../redux/userProfileReducer";
import {useParams} from "react-router-dom";
import avatar from "../../assets/img/avatar.png";
import {fetchStatus} from "../../redux/userProfileReducer";
import ProfileInfoSkeleton from "../../utils/ProfileInfoSkeleton/ProfileInfoSkeleton";

import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {CircularProgress} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// Accepted image types for file upload
const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff,image/svg+xml,image/x-icon,.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff,.tif,.svg,.ico';

export default function ProfileInfo() {

    const dispatch = useAppDispatch();
    const params = useParams<{ userId: string }>();

    // Ref for the status input field
    const statusInput = React.createRef<HTMLInputElement>();

    const {user, userStatus, loading, pictureLoading, statusLoading} = useAppSelector(state => state.userProfile)
    const currentUserId = useAppSelector((state) => state.auth.userInfo?.id);

    const [statusText, setStatusText] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editButtonMenu, setEditButtonMenu] = useState<boolean>(false);

    const picInput = useId();

    // Determine if the profile belongs to the current user
    const usersPage = currentUserId === user.userId;

    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target?.files) {
            alert('No files were selected')
            return
        } else {
            const file: File = e.target?.files[0]
            dispatch(setProfilePicture(file));
        }
    }

    function onStatusChange() {
        setStatusText(statusInput.current?.value || '');
    }

    // Enables edit mode for the status and initializes the text with the current status
    function onStatusClick() {
        setEditMode(true)
        setStatusText(userStatus || '')
    }

    // Handles the blur event for the status input field
    function onBlur() {
        const trimmedStatus = statusText.trim();
        if (trimmedStatus !== userStatus) {
            dispatch(updateStatus(trimmedStatus))
            dispatch(updatePageStatus(trimmedStatus))
        }
        setEditMode(false)
    }

    useEffect(() => {
        const userId = params.userId || currentUserId?.toString();
        if (userId) {
            dispatch(fetchProfile(userId));
            dispatch(fetchStatus(userId));
        }
    }, [dispatch, params, currentUserId]);

    if (loading) {
        return <ProfileInfoSkeleton/>
    }

    return (
        <div className={style.profileInfoContainer}>
            <div className={style.picB}
                 style={{backgroundImage: "url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}></div>
            <div
                className={`${style.profilePic} ${pictureLoading ? style.loadingPlaceholder : ''}`}
                style={{
                    backgroundImage: pictureLoading ? 'none' : `url(${user?.photos?.large || avatar})`,
                }}
            >
                {!pictureLoading && usersPage && (
                    <label htmlFor={picInput} className={style.picEditButton}>Edit</label>
                )}
                {pictureLoading && <div className={style.pictureLoaderContainer}><CircularProgress
                    sx={{color: 'white', background: 'none'}}/></div>}
            </div>
            <div className={style.profileInfo}>
                <div className={style.profileInfoTop}>
                    <p className={style.profileInfoName}>{user.fullName}</p>
                    {usersPage &&
                        <div className={style.editButtonContainer} onBlur={() => {
                            setEditButtonMenu(false)
                        }}>
                            <button onClick={() => {
                                setEditButtonMenu(!editButtonMenu)
                            }}
                                    className={style.editButton}>Edit profile
                            </button>
                            {editButtonMenu &&
                                <div className={style.editButtonMenu}
                                     onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                                         e.preventDefault()
                                     }}>
                                    <button className={style.editButtonMenuItems}>
                                        <label htmlFor={picInput}>Change profile picture</label>
                                    </button>
                                    <button className={style.editButtonMenuItems} onClick={() => {
                                        onStatusClick()
                                    }}>
                                        Edit bio
                                    </button>
                                </div>
                            }
                        </div>
                    }
                </div>
                {!usersPage ?
                    <div className={style.statusContainer}>
                        <h4>{user.aboutMe || 'no status yet'}</h4>
                    </div>
                    :
                    <div className={style.statusContainer}>
                        {!editMode && !statusLoading ?
                            <div className={style.statusContainerText} onClick={() => {
                                onStatusClick()
                            }}>
                                <p className={style.statusText}>{userStatus || 'no status yet'}</p>
                                <EditIcon className={style.editIcon}/>
                            </div>
                            :
                            <input
                                disabled={statusLoading}
                                className={style.statusInput}
                                ref={statusInput}
                                autoFocus
                                onChange={onStatusChange}
                                onBlur={onBlur}
                                type="text"
                                value={statusText}
                                aria-label="Edit status"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        statusInput.current?.blur();
                                    }
                                }}
                            />
                        }
                    </div>
                }
            </div>
            <div>
                <input id={picInput}
                       className={style.picInput}
                       type="file" onChange={onImageChange}
                       aria-label="Upload profile picture"
                       accept={ACCEPTED_IMAGE_TYPES}/>
            </div>
        </div>
    )
}
