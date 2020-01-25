import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileTC, getProfileTC, saveMyPhotoTC, saveMyProfileTC} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const ProfileContainer = (props) => {
    useEffect(() => {
        let userId = props.match.params.userId;  // вытаскиваем userID из URL
        !userId ? props.getMyProfileTC() : props.getProfileTC(userId);
    }, [props.match.params.userId]);

    return (
        <Profile {...props} />
    )
};


const MapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        isAuth: state.auth.isAuth,
        isMyProfile: state.profilePage.isMyProfile
    }
};

export default compose(
    connect(MapStateToProps, {getMyProfileTC, getProfileTC, saveMyProfileTC, saveMyPhotoTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

