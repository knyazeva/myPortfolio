import React from "react";
import "./News.scss"
import NewsItem from "./NewsItem/NewsItem";

const News = (props) => {

    return (
        <>
        <div className="title">News</div>
        <div className="news">
            {props.news.map((item) => <NewsItem
                key={item.id}
                news={item}
                addLikeTC={props.addLikeTC}
                deleteLikeTC={props.deleteLikeTC}
            />)}
        </div>
        </>
    )
};

export default News;