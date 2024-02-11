import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../title/Title';
import About from '../about/About';
import { nutrients_desc } from '../../descriptions';
import nutrients_logo from "../../assets/imgs/nutrients.png"

import "./Nutrients.css";

class Nutrients extends Component{
    render(){
        return (   
           <div>
                <Title text={`Nutrients`} />
                <About text={nutrients_desc} image={nutrients_logo} />
                <div className="mw9 ph3-ns mt4">
                    <div className="cf ph2-ns">
                        <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/carbohydrates" style={{textDecoration: "none"}}>
                                <div className="card bg-light-red">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="washed">
                                                Carbohydrates are one of the three macronutrients essential for human health, 
                                                alongside proteins and fats. They serve as the primary source of energy for 
                                                the body and play a crucial role in various physiological functions.
                                            </p>
                                        </div>
                                        <div className="card-title washed">Carbohydrates</div>
                                    </div>
                                </div>
                            </Link>    
                        </div>
                        <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/protiens" style={{textDecoration: "none"}}>
                                <div className="card bg-pink">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="washed">
                                            Proteins are one of the three macronutrients essential for human health, alongside 
                                            carbohydrates and fats. They serve as the building blocks of tissues, muscles, organs, 
                                            enzymes, hormones, and various other molecules in the body. 
                                            </p>
                                        </div>
                                        <div className="card-title washed">Protiens</div>
                                    </div>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
           </div>
           
        );
    }
    
}
export default Nutrients;