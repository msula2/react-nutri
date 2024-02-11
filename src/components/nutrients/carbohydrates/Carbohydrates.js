import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {carbs_desc} from '../../../descriptions';
import carbs_logo from "../../../assets/imgs/carbohydrates.png"
const Carbohydrates = () => {
    return(
        <div>
            <Title text={`Carbohydrates`} />
            <About text={carbs_desc} image={carbs_logo} />
        </div>

    )
}
export default Carbohydrates;