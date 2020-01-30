import React, {useEffect, useState} from "react";

const ArrowUp = (props) => {

    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', function() {
            const windowTop = document.documentElement.scrollTop;
            windowTop > 300 ? setShowArrow(true) : setShowArrow(false);
        });
    });

    return (
        <div
            className={showArrow ? "arrow-up active" : "arrow-up"}
            onClick={() => document.body.scrollIntoView({behavior: 'smooth', block: 'start'})}>
        </div>
    )
};

export default ArrowUp;