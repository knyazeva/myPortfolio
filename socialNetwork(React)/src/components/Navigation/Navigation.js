import React from "react";
import "./Navigation.scss";
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="menu">
            <NavLink to="/profile" title="Profile">Profile</NavLink>
            {/*<NavLink to="/messages" title="Messages">Messages</NavLink>*/}
            <NavLink to="/users" title="Users">Users</NavLink>
        </nav>
    )
};

export default Navigation;