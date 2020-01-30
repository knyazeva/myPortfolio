import React from 'react';
import {NavLink} from "react-router-dom";
import ButtonFollow from "../../Common/ButtonFollow";

const ListProfiles = ({item, ...props}) => {

    return (
        <div className="item">
            <NavLink to={props.url + item.id} title={item.fullName}>
                <div className="img-container">
                    <img
                        src={item.photo ? item.photo : "../../assets/img/unknown.jpg"}
                        alt={item.fullName}
                        title={item.fullName} />
                </div>
            </NavLink>

            <ButtonFollow user={item} unFollowTC={props.unFollowTC} followTC={props.followTC} />

            <NavLink to={props.url + item.id} title={item.fullName} className="name">{item.fullName}</NavLink>

            {
                item.location &&
                <div className="location">{item.location.country}, {item.location.city}</div>
            }
        </div>
    )
};

export default ListProfiles;