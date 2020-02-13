import React from "react";
import Pagination from "../Common/Pagination";
import "../Common/ListProfiles/ListProfiles.css"
import ListProfiles from "../Common/ListProfiles/ListProfiles"

const Users = (props) => {

    return (
        <>
        <div className="title">Users</div>

        <Pagination itemsTotalCount={props.usersTotalCount} itemsLimitPage={props.usersLimitPage} currentPage={props.currentPage} portionSize={2} setCurrentPage={props.setCurrentPage} />

        <div className="list-profile">
            {
                props.users.map(
                    user => <ListProfiles
                        key={user.id}
                        item={user}
                        unFollowTC={props.unFollowTC}
                        followTC={props.followTC}
                        url="/profile/"
                    />
                )
            }
        </div>
        </>
    )
};

export default Users;