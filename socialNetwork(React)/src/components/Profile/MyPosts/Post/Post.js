import React from "react";
import "./Post.scss"
import AvaIMG from "assets/img/img2.png"

const Post = (props) => {
    return (
        <div className="item-post">
            <img src={AvaIMG} alt="img" />
            <div className="like">{props.likes}</div>
            <div className="text">{props.message}</div>
        </div>
    )
};

export default Post;