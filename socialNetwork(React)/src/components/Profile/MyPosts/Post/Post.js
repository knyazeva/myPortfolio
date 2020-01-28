import React from "react";
import "./Post.scss"
import Likes from "../../../Common/Likes";
import MyLikes from "../../../Common/MyLikes";
import withPrompt from "../../../../hoc/withPrompt";



const Post = (props) => {

    const NewMyLikes = withPrompt(MyLikes);  // Оборачиваем HOC "Подсказка"

    return (
        <div className="item-post">
            <img src={props.img} alt={props.userProfile.fullName} title={props.userProfile.fullName} />

            {/* Если свой профиль */}
            {props.isMyProfile && <NewMyLikes textPrompt="You can`t like your posts." likes={props.likes} />}

            {/* Если чужой профиль */}
            {!props.isMyProfile && <Likes
                id={props.id}
                likes={props.likes}
                myLikes={props.myLikes}
                userProfile={props.userProfile}  />
            }

            <div className="text">{props.message}</div>
        </div>
    )
};

export default Post;