import React from "react";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

const MyPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field component="textarea" name="myPost" placeholder="Your text" />
            <button>Add post</button>
        </form>
    )
};

const MyPostFormRedux = reduxForm({form: "myPost"})(MyPostForm);

const MyPosts = (props) => {

    const onSubmit = (dataForm) => {
        props.addPostAC(dataForm.myPost);
        props.reset("myPost")  // зануляем форму
    };

    return (
        <>
        <div className="title">My posts:</div>
        <MyPostFormRedux onSubmit={onSubmit} />
        {props.profilePage.postsData.map(item => <Post key={item.id} message={item.message} likes={item.likes} />)}
        </>
    )
};

export default MyPosts;