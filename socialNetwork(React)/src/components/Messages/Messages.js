import React from "react";
import "./Messages.scss"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";

const MessagesForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="form">
            <Field component='textarea' name="message" placeholder="to write a message"/>
            <button>Send</button>
        </form>
    )
};

const MessagesFormRedux = reduxForm({form: "messages"})(MessagesForm);

const Messages = (props) => {

    const onSubmit = (dataForm) => {
        props.sendMessageAC(dataForm.message);
        props.reset("messages");  // зануляем поле ввода
    };

    return (
        <div className="column-main page-message">
            <div className="item column-30">
                <div className="title">Dialogs</div>
                <div className="dialogs-list">
                    {props.messagePage.dialogsData.map(item => <DialogItem key={item.id} img={item.img} name={item.name} />)}
                </div>
            </div>
            <div className="item column-70">
                <div className="title">Messages</div>
                <div className="messages-list">
                    {props.messagePage.messagesData.map(item => <MessageItem key={item.id} img={item.img} message={item.message} me={item.me} />)}
                </div>
                <MessagesFormRedux onSubmit={onSubmit} />
            </div>
        </div>
    )
};

export default Messages;