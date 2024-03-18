import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

/**
 * @typedef {Object} Props
 * @property {Function} setUser Function to set user data
 */

/**
 * Component for user login.
 * @param {Props} props - The props passed to the component.
 * @example
 * <Login setUser={setUserFunction} />
 * // Renders a login form allowing the user to log in.
 */
class Login extends Component{

     /**
     * Constructor for the Login component.
     * @param {object} props - The props passed to the component.
     */
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
    }

     /**
     * Handles username change.
     * @param {object} event - The event object.
     */
    changeUsername = (event) =>{
        this.setState({username : event.target.value});
      }
    
    /**
     * Handles password change.
     * @param {object} event - The event object.
     */
    changePassword = (event) =>{
    this.setState({password : event.target.value});
    }

    /**
     * Logs in the user.
     */
    loginUser = () => {
        fetch("http://localhost:3001/login", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result == "success"){
                this.props.setUser(data.data.username, data.data.id);
                this.setState({loggedIn: true});
            }
            else{
                console.log(data.error);
            }
        })

    }

    /**
     * Renders the Login component.
     * @returns {JSX.Element} JSX for the Login component.
     */
    
    render(){
        return(
            <div>
                {this.state.loggedIn ? <Navigate to="/" /> : 
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Username</label>
                                <input onChange={this.changeUsername} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6">Password</label>
                                <input onChange={this.changePassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"/>
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                        </fieldset>
                        <div className="">
                            <button onClick={this.loginUser} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Sign in</button>
                        </div>
                        <div className="lh-copy mt3">
                            <Link to="/register" className="f6 link dim black db">Sign up</Link>
                        </div>
                    </div>
                </main>
            }
            </div>
            
        );
    }
    
}
export default Login;
