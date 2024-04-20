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
            active: {
                nutrients: false,
                calories: false,
                recipes: false,
                healthtips: false
            }
        };
    }

    componentDidMount() {
        this.tabActive();
    }
    tabActive = () => {
        const pathname = window.location.pathname;
        const { active } = this.state;

        let newActiveState = {
            nutrients: false,
            calories: false,
            recipes: false,
            healthtips: false
        };

        if (pathname === '/nutrients') {
            newActiveState = { ...newActiveState, nutrients: true };
        } else if (pathname === '/calories') {
            newActiveState = { ...newActiveState, calories: true };
        } else if (pathname === '/recipes') {
            newActiveState = { ...newActiveState, recipes: true };
        } else if (pathname === '/health-tips') {
            newActiveState = { ...newActiveState, healthtips: true };
        }

        this.setState({ active: newActiveState });
    };
    render(){
        
        const { active } = this.state;

        return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                <Link to="/dashboard"><Navbar.Heading>Nutri. </Navbar.Heading></Link>
                    <Navbar.Divider />
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Navbar.Divider />
                    <Link to="/nutrients"><Button minimal={true} large={true} text="Nutrients" style={{color: "#ffe39f", height: "50px", padding: "0 20px"}}/></Link>
                    <Navbar.Divider />
                    <Link to="/calories"><Button minimal={true} large={true} text="Calories" style={{color: "#ffe39f", height: "50px", padding: "0 20px"}}/></Link>
                    <Navbar.Divider />
                    <Link to="/recipes"><Button minimal={true} large={true} text="Recipes" style={{color: "#ffe39f", height: "50px", padding: "0 20px"}}/></Link>
                    <Navbar.Divider />
                    <Link to="/health-tips"><Button minimal={true} large={true} text="Health Tips" style={{color: "#ffe39f", height: "50px", padding: "0 20px"}}/></Link>
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
