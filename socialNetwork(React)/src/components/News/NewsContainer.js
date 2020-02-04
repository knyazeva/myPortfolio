// @flow
import React, {useEffect} from "react";
import News from "./News";
import {connect} from "react-redux";
import {addLikeTC, clearNewsAC, deleteLikeTC, setPortionNewsTC} from "../../redux/newsReducer";
import {compose} from "redux";


// Types Flow
type PropsNewsContainer = {
    profileName: void | string,
    setPortionNewsTC: (number, number, ?string) => {},
    startPortionNews: number,
    endPortionNews: number,
    clearNewsAC: () => {},
    addLikeTC: () => {},
    deleteLikeTC: () => {},
    news: Array<mixed>
}


const NewsContainer = (props: PropsNewsContainer) => {

    useEffect(() => {
        props.profileName
            ? props.setPortionNewsTC(props.startPortionNews, props.endPortionNews, props.profileName)
            : props.setPortionNewsTC(props.startPortionNews, props.endPortionNews);

        return () => {props.clearNewsAC()}  // очистка массива новостей при уходе с страницы
    }, []);

    return (
        <News news={props.news} addLikeTC={props.addLikeTC} deleteLikeTC={props.deleteLikeTC} />
    )
};

const mapStateToProps = (state) => {
    return {
        news: state.newsPage.news,
        startPortionNews: state.newsPage.startPortionNews,
        endPortionNews: state.newsPage.endPortionNews
    }
};

export default compose(
    connect(mapStateToProps, {setPortionNewsTC, clearNewsAC, addLikeTC, deleteLikeTC})
)(NewsContainer);
