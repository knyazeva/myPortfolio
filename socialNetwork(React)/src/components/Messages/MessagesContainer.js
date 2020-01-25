import React from "react";
import {sendMessageAC} from "../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {reset} from "redux-form";

const MapStateToProps = (state) => {
    return {
        messagePage: state.messagePage
    }
};

export default compose(
    connect(MapStateToProps, {sendMessageAC, reset}),
    withAuthRedirect
)(Messages);
