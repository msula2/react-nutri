import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {vitamins_desc} from '../../../descriptions';
import vitamins_logo from "../../../assets/imgs/vitamins.png"
const Vitamins = () => {
    return(
        <div>
            <Title text={`Vitamins`} />
            <About text={vitamins_desc} image={vitamins_logo} />
        </div>

    )
}
export default Vitamins;