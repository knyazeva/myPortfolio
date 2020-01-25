import React from 'react';
import UserItem from "./UserItem/UserItem";
import Preloader from "../Common/Preloader";
import Pagination from "../Common/Pagination";

const Users = (props) => {

    return (
        <>

        <div className="title">Users</div>

        <Pagination itemsTotalCount={props.usersTotalCount} itemsLimitPage={props.usersLimitPage} currentPage={props.currentPage} portionSize={2} setCurrentPage={props.setCurrentPage} />

        <div className="friends-list">
            {
                props.users.map(
                    user => <UserItem
                        key={user.id}
                        user={user}
                        isDisableFollow={props.isDisableFollow}
                        unFollowTC={props.unFollowTC}
                        followTC={props.followTC}
                    />
                )
            }
        </div>
        </>
    )
};

export default Users;