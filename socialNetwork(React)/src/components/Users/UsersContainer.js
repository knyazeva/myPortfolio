// @flow
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followTC, getUsersTC, setCurrentPageTC, unFollowTC} from "../../redux/usersReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getCurrentPage, getIsLoading, getUsersLimitPage, getUsersSelector, getUsersTotalCount} from "../../redux/usersSelectors";


// Types Flow
type PropsUsersContainer = {
    getUsersTC: (number, number) => {},
    setCurrentPageTC: (number, number) => {},
    usersTotalCount: number,
    usersLimitPage: number,
    currentPage: number,
    isLoading: boolean,
    unFollowTC: () => void,
    followTC: () => void,
    users: Array<mixed>
}


const UsersContainer = (props: PropsUsersContainer) => {

    useEffect(() => {
        props.getUsersTC(props.currentPage, props.usersLimitPage);
    }, [] );

    const setCurrentPage = (page) => {
        props.setCurrentPageTC(page, props.usersLimitPage);
    };

    return <Users
        users={props.users}
        usersTotalCount={props.usersTotalCount}
        usersLimitPage={props.usersLimitPage}
        currentPage={props.currentPage}
        isLoading={props.isLoading}
        setCurrentPage={setCurrentPage}
        unFollowTC={props.unFollowTC}
        followTC={props.followTC}
    />
};

const MapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        usersTotalCount: getUsersTotalCount(state),
        usersLimitPage: getUsersLimitPage(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
    }
};

export default compose(
    withAuthRedirect,
    connect(MapStateToProps, {getUsersTC, setCurrentPageTC, unFollowTC, followTC})
)(UsersContainer)