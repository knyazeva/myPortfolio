import React from "react";
import "./Navigation.scss";
import {NavLink} from "react-router-dom";
import {setDataPopupAC} from "../../redux/appReducer";
import {connect} from "react-redux";
import ServiceSupport from "../Common/PopUp/PopUpContent/ServiceSupportForm";

const Navigation = (props) => {

    const disActiveMobileMenu = () => {  // закрыть мобильное меню при любом клике по нему
        document.body.classList.remove("menu-active")
    };

    const showPopUp = (e) => {  // показать pop-up с необходимым содержимым
        e.preventDefault();
        props.setDataPopupAC({
            isActive: true,
            title: "Service Support",
            body: <ServiceSupport />
        })
    };

    return (
        <nav className="menu" onClick={disActiveMobileMenu}>
            <NavLink exact to="/profile" title="Profile">My profile</NavLink>
            <NavLink to="/news" title="News">News</NavLink>
            <NavLink to="/users" title="Users">Users</NavLink>
            <NavLink to="/communities" title="Communities">Communities</NavLink>
            <NavLink
                onClick={showPopUp}
                to="/help"
                title="Help">Help</NavLink>
        </nav>
    )
};


export default connect(null, {setDataPopupAC})(Navigation);