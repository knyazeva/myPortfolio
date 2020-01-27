import React, {useState, useEffect} from "react";
import "./Post.scss"

const Post = (props) => {

    let [likes, setLikes] = useState(0);

    useEffect(() => {
        setLikes(props.likes)
    }, [props.likes]);

    const addLike = () => {
        setLikes(likes + 1);
        props.addLikeTC(props.id, likes + 1, props.userProfile)
    };

    const deleteLike = () => {
        if(likes === 0) {return false}
        setLikes(likes - 1);
        props.deleteLikeTC(props.id, likes - 1, props.userProfile)
    };

    return (
        <div className="item-post">
            <img src={props.img} alt="img" />

            {props.isMyProfile &&  <div className="like my-post" title="You can`t like your posts.">{props.likes}</div>}

            {!props.isMyProfile &&
            <div
                onClick={props.myLikes.some(id => id === props.id) ? deleteLike : addLike}
                className={props.myLikes.some(id => id === props.id) ? "like active" : "like"}>
                {likes}
            </div>
            }

            <div className="text">{props.message}</div>
        </div>
    )
};

export default Post;