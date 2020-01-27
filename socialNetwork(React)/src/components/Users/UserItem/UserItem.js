import React from 'react';
import './UserItem.css'
import {NavLink} from "react-router-dom";
import ButtonFollow from "../../Common/ButtonFollow";

const UserItem = ({user}) => {

    return (
        <div className="item">
            <NavLink to={"/profile/" + user.id} title={user.fullName}>
                <div className="img-container">
                    <img
                        src={user.photo ? user.photo : "../../assets/img/unknown.jpg"}
                        alt={user.fullName}
                        title={user.fullName} />
                </div>
            </NavLink>

            <ButtonFollow user={user} />

            <NavLink to={"/profile/" + user.id} title={user.fullName} className="name">{user.fullName}</NavLink>
            <div className="location">{user.location.country}, {user.location.city}</div>
        </div>
    )
};

export default UserItem;