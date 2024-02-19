import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import nutrients from '../../assets/imgs/nutrients.png';
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
            <nav className="bg-white-90 w-100 bb">
                <ul className="f5 fw6 ttu tracked list mb0 mt0">
                    <div className="flex items-center justify-between">
                            <div className="f3"><Link to="/" className="black">Nutri</Link></div>
                            <div className={`flex items-center bl pr3 ${this.state.active ? "bg-black-90" : "bg-white-90"}`}>
                                <li className="dib mr3 pa3">
                                    <Link className={this.state.active ? "white" : "black"} to="/nutrients" onClick={this.tabActive}>Nutrients</Link>
                                </li>
                                <img src={nutrients} className="dib mw2"></img>
                            </div>
                    </div>
                </ul>
            </nav>
        );
    }
    
}

export default Navigation;
