// @flow
import React from 'react';
import Slider from "react-slick";


// Types Flow
type PropsSliderPhoto = {
    images: [{
        id: number,
        src: string
    }]
}


const SliderPhoto = (props: PropsSliderPhoto) => {

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
