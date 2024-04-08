import React from 'react';


/**
   * Typically used to provide information about a topic.
   *
   * @param {{ text: string, image: string }} props - properties passed to the component.
   * @param {string} props.text - The text to display.
   * @param {string} props.image - The image to display.
   * @returns {JSX.Element} React element representing about.
   *
   * @example
   * <about text={aboutText} image={aboutImage} />
   */

const About = ( {text, image} ) => {
    return(
        <div className="ph4-ns flex items-center justify-between bb">
            <p className="fl w-80 lh-copy">{text}</p>
            <img src={image} className="mw5"></img>
        </div>
    );
}

export default About;