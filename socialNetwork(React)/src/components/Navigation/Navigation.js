import React from "react";
import "./Navigation.scss";
import {NavLink} from "react-router-dom";

const Navigation = () => {

    const disactiveMobileMenu = () => {
        document.body.classList.remove("menu-active")
    };

    return (
        <nav className="menu" onClick={disactiveMobileMenu}>
            <NavLink exact to="/profile" title="Profile">My profile</NavLink>
            {/*<NavLink to="/messages" title="Messages">Messages</NavLink>*/}
            <NavLink to="/news" title="News">News</NavLink>
            <NavLink to="/users" title="Users">Users</NavLink>
            <NavLink to="/communities" title="Communities">Communities</NavLink>
        </nav>
    )
};

export default Navigation;