import React from 'react';
import './banner.css';

export default  function Banner({title="", description="", bannerImage=""}){
    const bannerStyle ={
        backgroundImage : `url(${bannerImage})`,
    };
    return(
        <>
              <div  className="banner" style={bannerStyle}>

                    <div className="banner__content">
                        <h1 className="banner__title">{title}</h1>
                        <p className="banner__description">{description}</p>
                    </div>
                </div>
        </>
    )
}

