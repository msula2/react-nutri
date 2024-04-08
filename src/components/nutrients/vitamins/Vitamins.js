import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {vitamins_desc} from '../../../descriptions';
import vitamins_logo from "../../../assets/imgs/vitamins.png"

/**
   * A functional component that renders information about vitamins.
   *Use the Title component to display the title "vitamins".
   * Show summary related to vitamins.
   *
   * @returns {JSX.Element} The div of the component configured by the vitamins information.
   */

const Vitamins = () => {
    return(
        <div>
            <Title text={`Vitamins`} />
            <About text={vitamins_desc} image={vitamins_logo} />
        </div>

    )
}
export default Vitamins;