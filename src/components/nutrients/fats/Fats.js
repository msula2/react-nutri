import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {fats_desc} from '../../../descriptions';
import fats_logo from "../../../assets/imgs/fats.png"

/**
   * A functional component that renders information about fats.
   *Use the Title component to display the title "fats".
   * Show summary related to fats.
   *
   * @returns {JSX.Element} The div of the component configured by the fats information.
   */


const Fats = () => {
    return(
        <div>
            <Title text={`Fats/Lipids`} />
            <About text={fats_desc} image={fats_logo} />
        </div>

    )
}
export default Fats;