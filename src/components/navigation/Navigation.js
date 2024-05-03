import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Alignment, Icon, Alert } from "@blueprintjs/core";
import './Navigation.css';

/**
 * 
 * The Navigation component is the top most navbar that allows the user to navigate to 
 * different parts of the website
 * 
 * 
 * 
 * 
 * @author Hamdan Sulaiman
 *
 * @example 
 * <Navigation />
 *
 */

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            alert : {
                isLoading: false,
                isOpen: false
            }
        }
    }
    
    showAlert = () => {
        this.setState({ alert: { ...this.state.alert, isOpen: true } });
    }
    handleMoveCancel = () => {
        let alert = {...this.state.alert};
        alert.isOpen = false;
        this.setState({alert});
    }

    handleLogout = () => {
        let alert = {...this.state.alert};
        alert.isLoading = true;
        this.setState({ alert});

        fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/logout`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.result == "success"){
                let alert = {
                    isLoading: false,
                    isOpen: false
                }
                this.setState({ alert });
                if (data.result === "success"){
                   window.location.replace("/#/login");
                } 
            }
            
            
        })
        .catch(error => {
            console.error('Error occurred while logging out', error);
        });
    };

    render() {
        const { active } = this.props;
        const {alert} = this.state;

        return (
            <Navbar>
                <Alert
                    style={{backgroundColor: "#6eadca", color: "#ffe39f", fontWeight: "bold"}}    
                    confirmButtonText="Yes"
                    onCancel={this.handleMoveCancel}
                    cancelButtonText={<span style={{color: "white"}}>No</span>}
                    intent={"success"}
                    isOpen={alert.isOpen}
                    loading={alert.isLoading}
                    onConfirm={this.handleLogout}
                    
                >
                <p>
                    Are you sure you want to log out ?
                </p>
                </Alert>
                <Navbar.Group align={Alignment.LEFT}>
                    <Link to="/dashboard"><Navbar.Heading>Nutri. </Navbar.Heading></Link>
                    <Navbar.Divider />
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Navbar.Divider style={{ backgroundColor: active.nutrients ? "rgb(12, 38, 85)": "", borderWidth: active.nutrients ? "2px" : "1px" }}/>
                    <Link to="/nutrients">
                        <Button minimal={true} large={true} text="Nutrients" style={{ backgroundColor: active.nutrients ? "#a6d940" : "", color: active.nutrients ? "#2d5c75" : "#ffe39f", height: "50px", padding: "0 20px" }} />
                    </Link>
                    <Navbar.Divider style={{ backgroundColor: active.nutrients || active.calories ? "rgb(12, 38, 85)": "", borderWidth: active.nutrients || active.calories ? "2px" : "1px" }} />
                    <Link to="/calories">
                        <Button minimal={true} large={true} text="Calories" style={{ backgroundColor: active.calories ? "#a6d940" : "", color: active.calories ? "#2d5c75" : "#ffe39f", height: "50px", padding: "0 20px" }} />
                    </Link>
                    <Navbar.Divider style={{ backgroundColor: active.calories || active.recipes ? "rgb(12, 38, 85)" : "", borderWidth: active.calories || active.recipes ? "2px" : "1px" }} />
                    <Link to="/recipes">
                        <Button minimal={true} large={true} text="Recipes" style={{ backgroundColor: active.recipes ? "#a6d940" : "", color: active.recipes ? "#2d5c75" : "#ffe39f", height: "50px", padding: "0 20px" }} />
                    </Link>
                    <Navbar.Divider style={{ backgroundColor: active.recipes || active.healthtips ? "rgb(12, 38, 85)": "", borderWidth: active.recipes || active.healthtips ? "2px" : "1px" }} />
                    <Link to="/health-tips">
                        <Button minimal={true} large={true} text="Health Tips" style={{ backgroundColor: active.healthtips ? "#a6d940" : "", color: active.healthtips ? "#2d5c75" : "#ffe39f", height: "50px", padding: "0 20px" }} />
                    </Link>
                    <Navbar.Divider style={{ backgroundColor: active.healthtips ? "rgb(12, 38, 85)": "", borderWidth: active.healthtips ? "2px" : "1px" }} />
                    <Link>
                    <Icon icon="log-out" className="mr2 ml4" onClick={this.showAlert} style={{color: "#a6d940"}}/>
                    </Link>
                    
                   
                </Navbar.Group>
            </Navbar>
        );
    }
}

export default Navigation;
