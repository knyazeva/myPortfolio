import React from 'react';
import Slider from "react-slick";


const SliderPhoto = (props) => {

    let settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true
    };

    return (
        <>
        <Slider {...settings} className="slider-photo" >
            {props.images.map(img => <div key={img.id}><img src={img.src} /></div>)}
        </Slider>
        </>
    );
};

export default SliderPhoto;
