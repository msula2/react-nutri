import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {minerals_desc} from '../../../descriptions';
import minerals_logo from "../../../assets/imgs/minerals.png"

/**
   * A functional component that renders information about minerals.
   *Use the Title component to display the title "minerals".
   * Show summary related to minerals.
   *
   * @returns {JSX.Element} The div of the component configured by the minerals information.
   */

const Minerals = () => {
    return(
        <div>
            <Title text={`Minerals`} />
            <About text={minerals_desc} image={minerals_logo} />
        </div>

    )
}
export default Minerals;