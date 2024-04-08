import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {carbs_desc} from '../../../descriptions';
import carbs_logo from "../../../assets/imgs/carbohydrates.png"

/**
   * A functional component that renders information about carbohydrates.
   *Use the Title component to display the title "carbohydrates".
   * Show summary related to carbohydrates.
   *
   * @returns {JSX.Element} The div of the component configured by the carbohydrates information.
   */

const Carbohydrates = () => {
    return(
        <div>
            <Title text={`Carbohydrates`} />
            <About text={carbs_desc} image={carbs_logo} />
        </div>

    )
}
export default Carbohydrates;