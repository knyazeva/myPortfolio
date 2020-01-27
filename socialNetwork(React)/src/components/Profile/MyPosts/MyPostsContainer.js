import React from "react";
import {addLikeTC, addPostTC, deleteLikeTC} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {reset} from 'redux-form';

const MapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        isMyProfile: state.profilePage.isMyProfile,
        postsData: state.profilePage.postsData,
        myLikes: state.profilePage.myLikes
    }
};

export default connect(MapStateToProps, {addPostTC, addLikeTC, deleteLikeTC, reset})(MyPosts);