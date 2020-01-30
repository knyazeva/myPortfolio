import React from "react";
import SliderPhoto from "../../Common/SliderPhoto";
import Likes from "../../Common/Likes";
import {NavLink} from "react-router-dom";

const NewsItem = ({news, ...props}) => {

    return (
        <div className="item">
            <div className="news__content">
                <NavLink to={"/communities/" + news.idProfile} className="news__avatar" title={news.title}>
                    <img src={news.img} title={news.title} alt={news.title} />
                </NavLink>
                <div className="news__text">
                    <NavLink to={"/communities/" + news.idProfile} className="title" title={news.title}>{news.title}</NavLink>
                    <div className="text">{news.text}</div>
                </div>
            </div>
            {
                news.imgNews.length === 1 &&
                <div className="news__images collage1">
                    {news.imgNews.map((item) => <img key={item.id} src={item.src} />)}
                </div>
            }
            {
                news.imgNews.length === 2 &&
                <div className="news__images collage2">
                    {news.imgNews.map((item) => <img key={item.id} src={item.src} />)}
                </div>
            }
            {
                news.imgNews.length >= 3 &&
                <SliderPhoto images={news.imgNews} />
            }

            <div className="news__bottom-line">
                <div className="news__date">{news.date}</div>
                <Likes dataItem={news} addLikeTC={props.addLikeTC} deleteLikeTC={props.deleteLikeTC} />
            </div>
        </div>
    )
};

export default NewsItem;