import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import NewsContainer from "../News/NewsContainer";

const Profile = (props) => {

    return (
        <>
        <ProfileInfo
            infoProfile={props.infoProfile}
            isAuth={props.isAuth}
            isMyProfile={props.isMyProfile}
            saveMyProfileTC={props.saveMyProfileTC}
            saveMyPhotoTC={props.saveMyPhotoTC}
            unFollowTC={props.unFollowTC}
            followTC={props.followTC}
        />

        {!props.isCommunity && <MyPostsContainer />}
        {props.isCommunity && <NewsContainer profileName={props.infoProfile.fullName} />}

        </>
    )
};

export default Profile;