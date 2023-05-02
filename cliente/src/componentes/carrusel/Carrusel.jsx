import React from 'react';
import "./Carrusel.scss";
import {Slider} from "infinite-react-carousel";

const Carrusel = ({children,slidesToShow,arrowsScroll}) => {
    return(
        <div className='carrusel'>
             <div className="contenedor">
                <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
                    {children}
                </Slider>
             </div>
        </div>
    );
};

export default Carrusel;