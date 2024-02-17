import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {minerals_desc} from '../../../descriptions';
import minerals_logo from "../../../assets/imgs/minerals.png"
const Minerals = () => {
    return(
        <div>
            <Title text={`Minerals`} />
            <About text={minerals_desc} image={minerals_logo} />
        </div>

    )
}
export default Minerals;