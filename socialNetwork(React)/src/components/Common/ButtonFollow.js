import React from "react";
import {connect} from "react-redux";

const ButtonFollow = ({user, ...props}) => {

    const followUnfollow = (thunkCreator, text) => {
        return (
            <div
                className="follow btn"
                disabled={props.isDisableFollow.some(id => id === user.id) ? "disabled" : ""}
                onClick={() => {
                    thunkCreator(user.id, {...user})
                }}>{text}</div>
        )
    };

    return (
        <>
        {user.followed
            ? followUnfollow(props.unFollowTC, "unFollow")
            : followUnfollow(props.followTC, "Follow")
        }
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        isDisableFollow: state.usersPage.isDisableFollow
    }
};

export default connect(mapStateToProps, {})(ButtonFollow);