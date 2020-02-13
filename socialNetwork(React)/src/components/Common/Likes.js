import React, {useState, useEffect} from "react";


const Likes = (props) => {

    let [likes, setLikes] = useState(0);

    useEffect(() => {
        setLikes(props.dataItem.likes)
    }, [props.dataItem.likes]);

    const addLike = () => {
        setLikes(likes + 1);
        props.addLikeTC(props.dataItem, likes + 1, props.userProfile)
    };

    const deleteLike = () => {
        if(likes === 0) {return false}
        setLikes(likes - 1);
        props.deleteLikeTC(props.dataItem, likes - 1, props.userProfile)
    };


    return (
        <div
            onClick={props.dataItem.myLikes ? deleteLike : addLike}
            className={props.dataItem.myLikes ? "like active" : "like"}>
            {likes}
        </div>
    )
};


export default Likes;
