import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../title/Title';
import About from '../about/About';
import { nutrients_desc } from '../../descriptions';
import nutrients_logo from "../../assets/imgs/nutrients.png"

import "./Nutrients.css";

/**
 * Summary of the six elements carbohydrates, proteins, fats, vitamins, minerals, and water.
 * This component uses cards to introduce each nutritional element
 * 
 * @extends Component
 */
 class Nutrients extends Component{
    /**
     * Perform various renderings of cards
     * 
     * @returns {JSX.Element} The rendered component.
     */
    render(){
        return (   
           <div>
                <Title text={`Nutrients`} />
                <About text={nutrients_desc} image={nutrients_logo} />
                <div className="mw9 ph3-ns mt4">
                    <div className="cf ph2-ns">
                        <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/carbohydrates" style={{textDecoration: "none"}}>
                                <div className="card bg-light-yellow">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="black">
                                                Carbohydrates are one of the three macronutrients essential for human health, 
                                                alongside proteins and fats. They serve as the primary source of energy for 
                                                the body and play a crucial role in various physiological functions.
                                            </p>
                                        </div>
                                        <div className="card-title black">Carbohydrates</div>
                                    </div>
                                </div>
                            </Link>    
                        </div>
                        <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/protiens" style={{textDecoration: "none"}}>
                                <div className="card bg-light-red">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="black">
                                            Proteins are one of the three macronutrients essential for human health, alongside 
                                            carbohydrates and fats. They serve as the building blocks of tissues, muscles, organs, 
                                            enzymes, hormones, and various other molecules in the body. 
                                            </p>
                                        </div>
                                        <div className="card-title black">Protiens</div>
                                    </div>
                                </div>
                            </Link>    
                        </div>
                        <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/fats" style={{textDecoration: "none"}}>
                                <div className="card bg-light-blue">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="black">
                                            Fats are essential macronutrients crucial for energy provision, insulation of 
                                            body tissues, and transportation of fat-soluble vitamins. They also play 
                                            pivotal roles in the structural integrity and functionality of cell membranes.
                                            </p>
                                        </div>
                                        <div className="card-title black">Fats/Lipids</div>
                                    </div>
                                </div>
                            </Link>    
                        </div>
                    </div>
                    <div className="cf ph2-ns">
                        <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/vitamins" style={{textDecoration: "none"}}>
                                <div className="card bg-light-green">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="black">
                                            Vitamins are micronutrients that are essential for various metabolic processes 
                                            in the body. They play crucial roles in growth, immunity, and overall health. 
                                            Vitamins are typically categorized as water-soluble (e.g., vitamin C, B-complex vitamins) 
                                            or fat-soluble (e.g., vitamins A, D, E, K).
                                            </p>
                                        </div>
                                        <div className="card-title black">Vitamins</div>
                                    </div>
                                </div>
                            </Link>    
                        </div>
                    <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/minerals" style={{textDecoration: "none"}}>
                                <div className="card bg-light-purple">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="black">
                                            Minerals are inorganic elements necessary to maintain normal physiological functions and health of the human body. 
                                            They play a wide range of key roles in the body, such as the Components of bones and teeth: Calcium, 
                                            phosphorus and magnesium are the main minerals that make up bones and teeth.  
                                            </p>
                                        </div>
                                        <div className="card-title black">minerals</div>
                                    </div>
                                </div>
                            </Link>    
                        </div>
                        <div className="fl w-100 w-third-ns pa2 mt2">
                            <Link to="/nutrients/water" style={{textDecoration: "none"}}>
                                <div className="card bg-light-white">
                                    <div className="flex">
                                        <div className="w-80 pa3">
                                            <p className="black">
                                            Water plays a variety of vital roles in the human body. Water is the main component of the body, 
                                             accounting for approximately 60% of an adult's body weight. It helps maintain normal circulation and balance of blood, 
                                            saliva, and other body fluids.   
                                            </p>
                                        </div>
                                        <div className="card-title black">water</div>
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