import React from "react";
import "./Navigation.scss";
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="menu">
            <NavLink exact to="/profile" title="Profile">My profile</NavLink>
            {/*<NavLink to="/messages" title="Messages">Messages</NavLink>*/}
            <NavLink to="/news" title="News">News</NavLink>
            <NavLink to="/users" title="Users">Users</NavLink>
        </nav>
    )
};

export default Navigation;