import React, {useState} from "react";
import "./Header.scss";
import {NavLink} from "react-router-dom";

const Header = (props) => {

    const [mobileMenu, setMobileMenu] = useState(false);

    const activeMobileMenu = () => {
        setMobileMenu(true);
        document.body.classList.add("menu-active")
    };

    const disactiveMobileMenu = () => {
        setMobileMenu(false);
        document.body.classList.remove("menu-active")
    };

    return (
        <header>
            <div className="central-content flex-center-between">
                <div className="burger" onClick={mobileMenu ? disactiveMobileMenu : activeMobileMenu}><span> </span></div>
                <div className="logo">Your social network</div>
                {
                    props.isAuth
                        ? <div onClick={() => {props.logout()}} className="logout" title="logout">{props.authName}</div>
                        : <NavLink to="/auth" className="login" title="Login"> </NavLink>
                }
            </div>
        </header>
    )
};

export default Header;