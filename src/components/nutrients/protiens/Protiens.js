import React from 'react';
import About from '../../about/About';
import Title from '../../title/Title';
import {protiens_desc} from '../../../descriptions';
import protiens_logo from '../../../assets/imgs/protiens.png';

/**
   * A functional component that renders information about proteins.
   *Use the Title component to display the title "Proteins".
   * Show summary related to protein.
   *
   * @returns {JSX.Element} The div of the component configured by the protein information.
   */

const Protiens = () => {
    return(
        <div>
            <Title text={`Protiens`} />
            <About text={protiens_desc} image={protiens_logo} />
        </div>

    )
}
export default Protiens;