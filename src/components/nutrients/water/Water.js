import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {water_desc} from '../../../descriptions';
import water_logo from "../../../assets/imgs/water.png"
const Water = () => {
    return(
        <div>
            <Title text={`Water`} />
            <About text={water_desc} image={water_logo} />
        </div>

    )
}
export default Water;