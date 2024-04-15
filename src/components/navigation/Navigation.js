import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import nutrients from '../../assets/imgs/nutrients.png';
import calories from '../../assets/imgs/calories.png';
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import './Navigation.css';

class Navigation extends Component{
    constructor(){
        super();
        this.state = {
            active: false
        }
    }
    tabActive = () =>{
        this.setState({active: !this.state.active})
    }
    render(){
        return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Blueprint</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp5-minimal" icon="home" text="Home" />
                    <Button className="bp5-minimal" icon="document" text="Files" />
                </Navbar.Group>
            </Navbar>
            // <nav className="bg-white-90 w-100 bb">
            //     <ul className="f5 fw6 ttu tracked list mb0 mt0">
            //         <div className="flex items-center justify-between">
            //                 <div className="f3 flex justify-start"><Link to="/" className="black">Nutri</Link></div>
            //                 <div className="flex justify-end">
            //                     <div className={`flex items-center bl pr3 ${this.state.active ? "bg-black-90" : "bg-white-90"}`}>
            //                         <li className="dib mr3 pa3">
            //                             <Link className={this.state.active ? "white" : "black"} to="/nutrients" onClick={this.tabActive}>Nutrients</Link>
            //                         </li>
            //                         <img src={nutrients} className="dib mw2"></img>
            //                     </div>
            //                     <div style={{float: "right"}} className={`flex items-center bl pr3 ${this.state.active ? "bg-black-90" : "bg-white-90"}`}>
            //                         <li className="dib mr3 pa3">
            //                             <Link className={this.state.active ? "white" : "black"} to="/calories" onClick={this.tabActive}>Calories</Link>
            //                         </li>
            //                         <img src={calories} className="dib mw2"></img>
            //                     </div>
            //                 </div>
                            
            //         </div>
            //     </ul>
            // </nav>
        );
    }
    
}

export default Navigation;
