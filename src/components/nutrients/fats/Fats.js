import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {carbs_desc} from '../../../descriptions';
import fats_logo from "../../../assets/imgs/fats.png"
const Fats = () => {
    return(
        <div>
            <Title text={`Fats/Lipids`} />
            <About text={fats_desc} image={fats_logo} />
        </div>

    )
}
export default Fats;