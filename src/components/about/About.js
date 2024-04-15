import React from 'react';

const About = ( {text, image} ) => {
    return(
        <div className="mt3 ph4-ns flex items-center justify-between pb3" style={{borderBottom: '2px solid rgb(166, 217, 64)'}}>
            <p className="w-60 white bp5-running-text bp5-text-large">{text}</p>
        </div>
    );
}

export default About;