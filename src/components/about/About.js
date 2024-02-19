import React from 'react';

const About = ( {text, image} ) => {
    return(
        <div className="ph4-ns flex items-center justify-between bb">
            <p className="fl w-80 lh-copy">{text}</p>
            <img src={image} className="mw5"></img>
        </div>
    );
}

export default About;