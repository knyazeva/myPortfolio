import React from "react";
import {addPostAC} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {reset} from 'redux-form';

const MapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
};

export default connect(MapStateToProps, {addPostAC, reset})(MyPosts);