import React from "react";
import "./MessageItem.scss"

const MessageItem = (props) => {
    return (
        <div className={`item ${props.me}`}>
            <div className="img-container"><img src={props.img} alt="img" /></div>
            {props.message}
        </div>
    )
};

export default MessageItem;