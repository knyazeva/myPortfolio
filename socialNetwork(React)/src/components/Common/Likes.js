import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {addLikeTC, deleteLikeTC} from "../../redux/profileReducer";

const Likes = (props) => {

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
        <div
            onClick={props.myLikes.some(id => id === props.id) ? deleteLike : addLike}
            className={props.myLikes.some(id => id === props.id) ? "like active" : "like"}>
            {likes}
        </div>
    )
};



export default connect(null, {addLikeTC, deleteLikeTC})(Likes);
