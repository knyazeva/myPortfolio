import React from "react";
import "../Common/ListProfiles/ListProfiles.css"
import ListProfiles from "../Common/ListProfiles/ListProfiles";
import withSearch from "../../hoc/withSearch";


const ListForSearch = (props) => {  // Список, к которому будем применять поиск
    return (
        <div className="list-profile">
            {
                props.listForSearch.map(
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
    )
};


const ListProfileWithSearch = withSearch(ListForSearch);  // HOC Search


const Communities = (props) => {
    return (
        <>
        <div className="title">Communities</div>
        <ListProfileWithSearch {...props} listForSearch={props.communities} />
        </>
    )
};

export default Communities;