import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {protiens_desc} from '../../../descriptions';
import protiens_logo from '../../../assets/imgs/protiens.png';
const Protiens = () => {
    return(
        <div>
            <Title text={`Protiens`} />
            <About text={protiens_desc} image={protiens_logo} />
        </div>

    )
}
export default Protiens;