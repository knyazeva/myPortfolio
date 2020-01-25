import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <>
        <ProfileInfo userProfile={props.userProfile} isAuth={props.isAuth} isMyProfile={props.isMyProfile} saveMyProfileTC={props.saveMyProfileTC} saveMyPhotoTC={props.saveMyPhotoTC} />
        <MyPostsContainer />
        </>
    )
};

export default Profile;