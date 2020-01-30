import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Communities from "./Communities";
import {clearAC, followTC, getCommunitiesTC, getCommunityProfileTC, unFollowTC} from "../../redux/communitiesReducer";
import Profile from "../Profile/Profile";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const CommunitiesContainer = (props) => {

    useEffect(() => {
        let comId = props.match.params.comId;  // вытаскиваем communitiesID из URL
        !comId ? props.getCommunitiesTC() : props.getCommunityProfileTC(comId);

        return () => {props.clearAC()}  // очистка сообществ псле ухода с страницы

    }, [props.match.params.comId]);



    if(props.communitiesProfile && props.communitiesProfile.hasOwnProperty("id")) {
        return <Profile
            infoProfile={props.communitiesProfile}
            unFollowTC={props.unFollowTC}
            followTC={props.followTC}
            isCommunity={true}
        />
    } else {
        return <Communities
            communities={props.communities}
            unFollowTC={props.unFollowTC}
            followTC={props.followTC}
        />
    }
};

const MapStateToProps = (state) => {
    return {
        communitiesProfile: state.communitiesPage.communitiesProfile,
        communities: state.communitiesPage.communities
    }
};

export default compose(
    withRouter,
    connect(MapStateToProps, {getCommunitiesTC, getCommunityProfileTC, unFollowTC, followTC, clearAC}),
    withAuthRedirect
)(CommunitiesContainer)