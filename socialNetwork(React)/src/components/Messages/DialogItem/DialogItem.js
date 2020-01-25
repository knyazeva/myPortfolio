import React from "react";
import "./DialogItem.scss"

const DialogItem = (props) => {
    return (
        <a className="item">
            <span className="img-container"><img src={props.img} alt="img" /></span>
            <span className="name">{props.name}</span>
        </a>
    )
};

export default DialogItem;