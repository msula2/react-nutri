import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, H5, Button } from "@blueprintjs/core";
import Title from '../title/Title';
import About from '../about/About';
import { nutrients_desc } from '../../descriptions';
import nutrients_logo from "../../assets/imgs/nutrients.png";
import Loader from '../loader/Loader';
import { Alert} from "@blueprintjs/core";

import "./Nutrients.css";

/**
 * 
 * The Nutrients component disaplys the different nutrients as cards which can be clicked upon to 
 * learn more.
 * 
 * @property {Object} state - The state of the component
 * @property {Object} state.user - Represents the user logged into the session
 * @property {Object} state.loggedIn - Represents whether the user is logged in or not, this is used to alert the user if their session ends
 * @property {Object} state.timedOut- Represents if the user's session is valid or not
 * @property {Object} state.loading - Flag used to trigger the loading screen
 * @property {Object} state.alert - Flag used to trigger the alerts
 * 
 * 
 * @author David Wacaser
 * @author Yi Ren
 * @author Hamdan Sulaiman
 * 
 * 
 *
 * @example 
 * <Nutrients />
 *
 */

class Nutrients extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {
                name: '',
                id: ''
            },
            loggedIn : null,
            timedOut: null,
            loading: true,
            message: '',
            alert: {
                isLoading: false,
                isOpen: true
            },
        }
    }

    setUserDetails = (name, id, loggedIn) => {
    this.setState({ user: { name: name, id: id }, loggedIn: loggedIn, timedOut: false});
    };

    clearSession = () => {

    this.setState({ user: { name: '', id: '' }, loggedIn: false, timedOut: true});
    };

    checkSession = () => {
    fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/user`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn === true){
        this.setUserDetails(data.user.username, data.user.id, data.loggedIn);
        } else if (data.loggedIn === false){
        this.clearSession();
        } else {
        console.log(data.error);
        }
    });
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
        this.checkSession();
        
    }

    handleMoveConfirm = () => {
        let alert = {...this.state.alert};
        alert.isLoading = true;
        this.setState({ alert });

        
        const close = () => {
            let alert = {
                isLoading: false,
                isOpen: false
            }
            this.setState({ alert });
            window.location.replace("/#/login");
        };
        setTimeout(close, 2000);
    };

  render() {
    const {loading, message, timedOut, alert} = this.state;
    return (
      <div>
            {timedOut ? 
            (
                <Alert
                    style={{backgroundColor: "#6eadca", color: "#ffe39f", fontWeight: "bold"}}    
                    confirmButtonText="Login"
                    intent={"success"}
                    isOpen={alert.isOpen}
                    loading={alert.isLoading}
                    onConfirm={this.handleMoveConfirm}
                >
                <p>
                    Your session has ended, please log back in again
                </p>
                </Alert>
            )
            :
            (
            <>
            {loading && (
                <div className="loader-overlay">
                    <Loader message={message} />
                </div>
            )}
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
                                    <Button className="submit-btn" rightIcon="arrow-right" intent="success" text="Learn More" />
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
                                    <Button className="submit-btn" rightIcon="arrow-right" intent="success" text="Learn More" />
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
                                    <Button className="submit-btn" rightIcon="arrow-right" intent="success" text="Learn More" />
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
                                    <Button className="submit-btn" rightIcon="arrow-right" intent="success" text="Learn More" />
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
                                    <Button className="submit-btn" rightIcon="arrow-right" intent="success" text="Learn More" />
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
                                    <Button className="submit-btn" rightIcon="arrow-right" intent="success" text="Learn More" />
                                </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            </>
            )}
        </div>  
     
    );
  }
}

export default Nutrients;
