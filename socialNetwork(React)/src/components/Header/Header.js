import React from "react";
import "./Header.scss";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header>
            <div className="central-content flex-center-between">
                <div className="logo">Your social network</div>
                {
                    props.isAuth
                        ? <div onClick={() => {props.logout()}} className="logout" title="logout">{props.authName}</div>
                        : <NavLink to="/auth" className="login" title="Login">Login</NavLink>
                }
            </div>
        </header>
    )
};

export default Header;