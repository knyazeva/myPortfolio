import React from "react";
import "./Header.scss";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/authReducer";

const HeaderContainer = (props) => {

    const logout = () => {props.logoutTC()};

    return (
        <Header isAuth={props.isAuth} authName={props.authName} logout={logout} />
    )

};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        authName: state.auth.authName
    }
};

export default connect(mapStateToProps, {logoutTC})(HeaderContainer);