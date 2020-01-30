import React from "react";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

const MyPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field component="textarea" name="posts.textPost" placeholder="Text of your new post..." />
            <button>Add post</button>
        </form>
    )
};

const MyPostFormRedux = reduxForm({form: "myPost"})(MyPostForm);

const MyPosts = (props) => {

    const onSubmit = (dataForm) => {
        props.addPostTC(dataForm, props.postsData, props.userProfile);
        props.reset("myPost")  // зануляем форму
    };

    return (
        <>
        <div className="title">Posts:</div>
        {props.isMyProfile && <MyPostFormRedux onSubmit={onSubmit}/>}
        {[...props.postsData].reverse().map(item => {
                return (
                    <Post
                        key={item.id}
                        id={item.id}
                        post={item}
                        img={props.userProfile.photo}
                        isMyProfile={props.isMyProfile}
                        userProfile={props.userProfile}
                        addLikeTC={props.addLikeTC}
                        deleteLikeTC={props.deleteLikeTC}
                    />
                )
            }
        )}
        </>
    )
};

export default MyPosts;