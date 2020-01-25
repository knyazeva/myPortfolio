import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export const withAuthRedirect = (Component) => {  // HOC для редиректа на страницу "Логин", если пользователь не залогинен
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth){return <Redirect to="/auth" />}
            return <Component {...this.props} />
        }
    }

    return connect(mapStateToProps, {})(RedirectComponent);

};