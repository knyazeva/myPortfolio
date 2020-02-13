import React from 'react';
import Login from "./Login";
import {connect} from "react-redux";
import {loginTC} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

const LoginContainer = (props) => {

    const login = (login, password) => {props.loginTC(login, password)};
    if(props.isAuth) {return <Redirect to="/profile" />}

    return (
        <Login isAuth={props.isAuth} login={login} />
    )

};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {loginTC})(LoginContainer);
