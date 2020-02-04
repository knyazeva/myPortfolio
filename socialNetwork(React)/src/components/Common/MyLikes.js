// @flow
import React from "react";

// Types Flow
type PropsMyLikes = {likes: number}


const MyLikes = (props: PropsMyLikes) => {
    return (
        <div className="like my-post">{props.likes}</div>
    )
};


MyLikes.defaultProps = {likes: 0};

export default MyLikes;
