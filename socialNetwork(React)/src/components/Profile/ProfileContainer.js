import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {clearProfileAC, getMyProfileTC, getProfileTC, saveMyPhotoTC, saveMyProfileTC} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../Common/Preloader";
import {followTC, unFollowTC} from "../../redux/usersReducer";

const ProfileContainer = (props) => {

    useEffect(() => {
        let userId = props.match.params.userId;  // вытаскиваем userID из URL
        !userId ? props.getMyProfileTC() : props.getProfileTC(userId);

        return () => props.clearProfileAC()

    }, [props.match.params.userId]);

    if(!props.infoProfile){return <Preloader />}

    return (
        <Profile {...props} />
    )
};


const MapStateToProps = (state) => {
    return {
        infoProfile: state.profilePage.userProfile,
        isAuth: state.auth.isAuth,
        isMyProfile: state.profilePage.isMyProfile
    }
};

export default compose(
    connect(MapStateToProps, {getMyProfileTC, getProfileTC, saveMyProfileTC, saveMyPhotoTC, unFollowTC, followTC, clearProfileAC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

