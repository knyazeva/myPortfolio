// @flow
import React from 'react';
import {connect} from "react-redux";


// Types Flow
type PropsButtonFollow = {
    user: {
        id: number,
        followed: boolean
    },
    isDisableFollow: Array<number>,
    unFollowTC: () => void,
    followTC: () => void
}


const ButtonFollow = (props: PropsButtonFollow) => {

    const followUnfollow = (thunkCreator: (number, {}) => void, text: string) => {
        return (
            <div
                className="follow btn"
                disabled={props.isDisableFollow.some(id => id === props.user.id) ? "disabled" : ""}
                onClick={() => {
                    thunkCreator(props.user.id, {...props.user})
                }}>{text}</div>
        )
    };

    return (
        <>
        {props.user.followed
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