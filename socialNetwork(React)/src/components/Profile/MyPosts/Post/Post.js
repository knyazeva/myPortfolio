import React from "react";
import "./Post.scss"
import MyLikes from "../../../Common/MyLikes";
import withPrompt from "../../../../hoc/withPrompt";
import Likes from "../../../Common/Likes";

const Post = (props) => {

    const NewMyLikes = withPrompt(MyLikes);  // Оборачиваем HOC "Подсказка"

    return (
        <div className="item-post">
            <img src={props.img} alt={props.userProfile.fullName} title={props.userProfile.fullName} />

            {/* Если свой профиль */}
            {props.isMyProfile && <NewMyLikes textPrompt="You can`t like your posts." likes={props.post.likes} />}

            {/* Если чужой профиль */}
            {!props.isMyProfile && <Likes
                dataItem={props.post}
                addLikeTC={props.addLikeTC}
                deleteLikeTC={props.deleteLikeTC}
                userProfile={props.userProfile}
            />
            }

            <div className="text">{props.post.textPost}</div>
        </div>
    )
};

export default Post;