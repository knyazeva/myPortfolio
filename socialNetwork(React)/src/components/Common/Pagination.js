import React, {useState, useEffect} from "react";

const Pagination = (props) => {

    let initialPortionCurrent = 1;
    if(props.currentPage > props.portionSize) {
        initialPortionCurrent = Math.ceil(props.currentPage / props.portionSize)
    }

    let pageNumber = Math.ceil(props.itemsTotalCount / props.itemsLimitPage);  // всего страниц
    let [portionCurrent, setPortionCurrent] = useState(initialPortionCurrent);  // текущий номер порции страниц
    let leftBorderPortion = (portionCurrent - 1) * props.portionSize + 1;  // левая граница порции страниц
    let rightBorderPortion = portionCurrent * props.portionSize;  // правая граница порции страниц
    let maxPortion = Math.ceil(pageNumber / props.portionSize);  // максимально возможное количество порций

    let pages = [];
    for (let i = 1; i <= pageNumber; i++) {pages.push(i)}


    // при изменении порции - устанавливаем активной первую страницу порции (т.е. левую границу)
    if(props.currentPage < leftBorderPortion || props.currentPage > rightBorderPortion) {
        props.setCurrentPage(leftBorderPortion);
    }


    return(
        <div className="pagination">
            {portionCurrent !== 1 && <div onClick={() => setPortionCurrent(portionCurrent - 1)} className="arrow left"> </div>}
            {
                pages
                    .filter(p => p >= leftBorderPortion && p <= rightBorderPortion)
                    .map(page => {
                        return (
                            <button
                                key={page}
                                className={props.currentPage === page ? "active" : ""}
                                onClick={() => {props.setCurrentPage(page)}}>
                                {page}
                            </button>
                        )
                    })
            }
            {maxPortion > portionCurrent && <div onClick={() => setPortionCurrent(portionCurrent + 1)} className="arrow right"> </div>}
        </div>
    )
};

export default Pagination;