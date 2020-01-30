import React from "react";
import "../Common/ListProfiles/ListProfiles.css"
import ListProfiles from "../Common/ListProfiles/ListProfiles";

const Communities = (props) => {
    return (
        <>
        <div className="title">Communities</div>

        <div className="list-profile">
            {
                props.communities.map(
                    com => <ListProfiles
                        key={com.id}
                        item={com}
                        unFollowTC={props.unFollowTC}
                        followTC={props.followTC}
                        url="/communities/"
                    />
                )
            }
        </div>

        </>
    )
};

export default Communities;