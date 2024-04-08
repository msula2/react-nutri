import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {water_desc} from '../../../descriptions';
import water_logo from "../../../assets/imgs/water.png"

/**
   * A functional component that renders information about water.
   *Use the Title component to display the title "water".
   * Show summary related to water.
   *
   * @returns {JSX.Element} The div of the component configured by the water information.
   */

const Water = () => {
    return(
        <div>
            <Title text={`Water`} />
            <About text={water_desc} image={water_logo} />
        </div>

    )
}
export default Water;