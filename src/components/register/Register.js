import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

/**
 * Component for user register.
 * 
 * @extends Component
 */
class Register extends Component {
    /**
     * Constructor for the Register component.
     */
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            registered: false
        };
    }

    /**
     * Handles username change.
     * @param {object} event - The event object.
     */
    changeUsername = (event) => {
        this.setState({username: event.target.value});
    }

    /**
     * Handles email change.
     * @param {object} event - The event object.
     */
    changeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    /**
     * Handles password change.
     * @param {object} event - The event object.
     */
    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    /**
     * Logs in the user.
     */
    registerUser = () => {
        fetch("http://localhost:3001/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                this.setState({registered: true});
            } else {
                console.log(data.error);
            }
        })
        .catch(error => console.error("Registration error:", error));
    }

    /**
     * Renders the Register component.
     * @returns {JSX.Element} JSX for the Register component.
     */
    render() {
        return (
            <div>
                {this.state.registered ? <Navigate to="/login" /> : 
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Username</label>
                                <input onChange={this.changeUsername} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Email</label>
                                <input onChange={this.changeEmail} type="email" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6">Password</label>
                                <input onChange={this.changePassword} type="password" className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <button onClick={this.registerUser} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Register</button>
                        </div>
                        <div className="lh-copy mt3">
                            <Link to="/login" className="f6 link dim black db">Already have an account? Sign in</Link>
                        </div>
                    </div>
                </main>
                }
            </div>
        );
    }
}

export default Register;
