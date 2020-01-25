import React from "react";
import loadingIMG from "assets/img/loading.gif"

const Preloader = () => {
    return (
        <div className="loading"><img src={loadingIMG} alt="loading" /></div>
    )
};

export default  Preloader;
