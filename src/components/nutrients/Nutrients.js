import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, H5, Button } from "@blueprintjs/core";
import Title from '../title/Title';
import About from '../about/About';
import { nutrients_desc } from '../../descriptions';
import nutrients_logo from "../../assets/imgs/nutrients.png";
import Loader from '../loader/Loader';

import "./Nutrients.css";

class Nutrients extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            message: ''
        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    }
  render() {
    const {loading, message} = this.state;
    return (
      <div>
            {loading && <Loader message={message}/>}
            <div className='vw-100 vh-100 d-flex flex-column justify-center items-center' style={{display: loading? 'none' : ''}}>
            <Title text="Nutrients" color="#FFE39F" />
            <About text={nutrients_desc} image={nutrients_logo} />
            <div className="nutrients-container d-flex justify-center items-center mt5">
            <div className="nutrient-card-grid">
                <div className="nutrient-card-container">
                <Card interactive={true} elevation={4} className="card-content">
                    <H5>Carbohydrates</H5>
                    <p>Carbohydrates are one of the three macronutrients essential for human health, 
                    alongside proteins and fats. They serve as the primary source of energy for 
                    the body and play a crucial role in various physiological functions.</p>
                    <div className="card-button">
                    <Link to="/nutrients/carbohydrates" className="nutrient-link">
                        <Button className="learn-more-button" rightIcon="arrow-right" intent="success" text="Learn More" />
                    </Link>
                    </div>
                </Card>
                </div>
                <div className="nutrient-card-container">
                <Card interactive={true} elevation={4} className="card-content">
                    <H5>Proteins</H5>
                    <p>Proteins are one of the three macronutrients essential for human health, alongside 
                    carbohydrates and fats. They serve as the building blocks of tissues, muscles, organs, 
                    enzymes, hormones, and various other molecules in the body.</p>
                    <div className="card-button">
                    <Link to="/nutrients/protiens" className="nutrient-link">
                        <Button className="learn-more-button" rightIcon="arrow-right" intent="success" text="Learn More" />
                    </Link>
                    </div>
                </Card>
                </div>
                <div className="nutrient-card-container">
                <Card interactive={true} elevation={4} className="card-content">
                    <H5>Fats/Lipids</H5>
                    <p> Fats are essential macronutrients crucial for energy provision, insulation of 
                    body tissues, and transportation of fat-soluble vitamins. They also play 
                    pivotal roles in the structural integrity and functionality of cell membranes.</p>
                    <div className="card-button">
                    <Link to="/nutrients/fats" className="nutrient-link">
                        <Button className="learn-more-button" rightIcon="arrow-right" intent="success" text="Learn More" />
                    </Link>
                    </div>
                </Card>
                </div>
                <div className="nutrient-card-container">
                <Card interactive={true} elevation={4} className="card-content">
                    <H5>Vitamins</H5>
                    <p> Vitamins are micronutrients that are essential for various metabolic processes 
                    in the body. They play crucial roles in growth, immunity, and overall health. 
                    Vitamins are typically categorized as water-soluble (e.g., vitamin C, B-complex vitamins) 
                    or fat-soluble (e.g., vitamins A, D, E, K).</p>
                    <div className="card-button">
                    <Link to="/nutrients/vitamins" className="nutrient-link">
                        <Button className="learn-more-button" rightIcon="arrow-right" intent="success" text="Learn More" />
                    </Link>
                    </div>
                </Card>
                </div>
                <div className="nutrient-card-container">
                <Card interactive={true} elevation={4} className="card-content">
                    <H5>Minerals</H5>
                    <p>Minerals are inorganic elements necessary to maintain normal physiological functions and health of the human body. 
                    They play a wide range of key roles in the body, such as the Components of bones and teeth: Calcium, 
                    phosphorus and magnesium are the main minerals that make up bones and teeth.</p>
                    <div className="card-button">
                    <Link to="/nutrients/minerals" className="nutrient-link">
                        <Button className="learn-more-button" rightIcon="arrow-right" intent="success" text="Learn More" />
                    </Link>
                    </div>
                </Card>
                </div>
                <div className="nutrient-card-container">
                <Card interactive={true} elevation={4} className="card-content">
                    <H5>Water</H5>
                    <p>Water plays a variety of vital roles in the human body. Water is the main component of the body, 
                    accounting for approximately 60% of an adult's body weight. It helps maintain normal circulation and balance of blood, 
                    saliva, and other body fluids.</p>
                    <div className="card-button" style={{height: '80px'}}>
                    <Link to="/nutrients/water" className="nutrient-link">
                        <Button className="learn-more-button" rightIcon="arrow-right" intent="success" text="Learn More" />
                    </Link>
                    </div>
                </Card>
                </div>
            </div>
            </div>
        </div>
      </div>  
     
    );
  }
}

export default Nutrients;
