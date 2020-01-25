import React from 'react';
import './UserItem.css'
import {NavLink} from "react-router-dom";

const UserItem = ({user, ...props}) => {

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

            {user.followed
                ? <div
                    className="follow btn"
                    disabled={props.isDisableFollow.some(id => id === user.id) ? "disabled" : ""}
                    onClick={() => {props.unFollowTC(user.id, {...user});}}>unFollow</div>

                : <div
                    className="follow btn"
                    disabled={props.isDisableFollow.some(id => id === user.id) ? "disabled" : ""}
                    onClick={() => {props.followTC(user.id, {...user})}}>Follow</div>
            }

            <NavLink to={"/profile/" + user.id} title={user.fullName} className="name">{user.fullName}</NavLink>
            <div className="location">{user.location.country}, {user.location.city}</div>
        </div>
    )
};

export default UserItem;