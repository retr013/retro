import React from 'react';
import MyPost from "./MyPost";
import ProfileInfo from "./ProfileInfo";

function Profile(props) {
    return (
        <div>
            <ProfileInfo/>
            <MyPost/>
        </div>
    );
};

export default Profile;
