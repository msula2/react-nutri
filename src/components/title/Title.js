import React from 'react';

/**
  * Provide a common header component
  * @param {string} props.text The text to display as the title.
  * @returns {JSX.Element} The div for the title text.
  */
const Title = ({text}) => {
    return(
        <div className="f2 fw6 ttu ph4-ns mt5 center">{text}</div>
    )
}

export default Title;