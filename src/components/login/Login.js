import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import "./Login.css";
import bread_pic from "../../assets/imgs/home-bread.jpg"
import meat_pic from "../../assets/imgs/home-meat.jpg"
import fruit_pic from "../../assets/imgs/home-fruit.jpg"
import milk_pic from "../../assets/imgs/home-milk.jpg"
import vegetables_pic from "../../assets/imgs/home-vegetables.jpg"
import oil_pic from "../../assets/imgs/home-oil.jpg"
import { AnchorButton, Button, FormGroup, InputGroup, Tooltip, Icon} from "@blueprintjs/core";
import Loader from '../loader/Loader';
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
            loggedIn: false,
            showPassword: false,
            dirty: {
                username: false,
                password: false
            },
            errors: {
                username: '',
                password: '',
                login: ''
            },
            loading: true,
            message: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 3000);
    }

    handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });


     /**
     * Handles username change.
     * @param {object} event - The event object.
     */
    changeUsername = (event) =>{
        const { value } = event.target;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};

        let username_regex = /^[a-zA-Z0-9]{0,20}$/;
        dirty.username = true;
        
        if (username_regex.test(value)){
            errors.username = value.trim() === '' ? 'Username is required.' : '';
        }
        else{
            errors.username = "The username must be 0-20 characters long and must not contain special characters.";
        }
        
        
        this.setState({username : value, errors, dirty});
      }
    
    /**
     * Handles password change.
     * @param {object} event - The event object.
     */
    changePassword = (event) =>{
        const { value } = event.target;
        let errors = { ...this.state.errors };
        let dirty = {...this.state.dirty};

        dirty.password = true;

        errors.password = value.trim() === '' ? 'Password is required.' : '';
        

    this.setState({password : value, errors, dirty});
    }

    /**
     * Logs in the user.
     */
        loginUser = () => {
            
            let errors = {...this.state.errors};
            let dirty = {...this.state.dirty};
            let username = this.state.username;
            let password = this.state.password

            this.setState({ loading: true });

            setTimeout(() => {
            this.setState({ loading: false });
            }, 3000);


            fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/login`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result == "success"){
                    this.props.setUserDetails(data.user.username, data.user.id);
                    setTimeout(() => {
                        this.setState({loggedIn: true});
                      }, 3000);
                    
                }
                else{
                    dirty.password = false;
                    dirty.username = false;
                    errors.login = data.error;

                    this.setState({ username: '', password: '', errors, dirty });

                }
            })


        }

        loginEnabled = () => {
            let errors = {...this.state.errors};
            let dirty = {...this.state.dirty};
            let { login, ...otherErrors } = errors;

            let error_msgs = Object.values(otherErrors).filter(item => item !== '');
            let all_dirty = Object.values(dirty).every(item => item === true);

            if (all_dirty && error_msgs.length == 0){
                return false;
            }
            else{
                return true;
            }
        }

    

    /**
     * Renders the Login component.
     * @returns {JSX.Element} JSX for the Login component.
     */
    
    render(){

        const { showPassword, errors, username, password, loading, message, loggedIn} = this.state;
        
        const lockButton = (
            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} disabled={false}>
                <Button
                    icon={showPassword ? "unlock" : "lock"}
                    intent= {showPassword ? "success" : "danger"}
                    onClick={this.handleLockClick}
                />
            </Tooltip>
        );

        if (loggedIn) {
            window.location.replace("/dashboard");
        }
    

        return(
            <div>
                {loading && <Loader message={message}/>}
                <div className="vw-100 vh-100 flex stack-on-small" style={{display: loading? 'none': 'flex'}}>
                    <div className="w-100-ns w-100-m w-60-l flex items-center justify-center">
                        <div className="flex items-center justify-center h-50 w-100-ns w-100-m w-100-l">
                            <div className="h-100 flex flex-column justify-between w-30-ns w-30-m w-20-l">
                                <div className="pa3 mr2 mt6">
                                    <img src={oil_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "5rem", width: "5rem"}}/>
                                </div>
                                <div className="pa3 mr2 mt2 ml3">
                                    <img src={bread_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "5rem", width: "5rem"}}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <div className="w-30 pa0 mr2 mt2">
                                        <img src={fruit_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "6rem", width: "6rem"}}/>
                                    </div>
                                    <div className="w-30 pa0 mr2 mt2">
                                        <img src={meat_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "5rem", width: "5rem"}}/>
                                    </div>
                                </div>
                                <h2 className="f-6 mb0 mt1" style={{color: "#FFE39F"}}>Nutri .</h2>
                                <span className="f4 white dib">Your one stop solution to a healthier lifestyle</span>
                                <div className="w-30 pa0 mr2 mt2 center">
                                    <img src={vegetables_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "7rem", width: "7rem"}}/>
                                </div>
                            </div>
                            <div className="w-25 pa3 mr2 mt2">
                                <img src={milk_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "5rem", width: "5rem"}}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-100-ns w-100-m w-40-l flex justify-center items-center">
                        <div className="flex justify-center w-100-l">
                            <div className="w-100-ns w-100-m w-70-l">   
                                <FormGroup
                                    label="Username"
                                    style={{color: "#FFE39F"}}
                                    className="b f4 lh-copy w-100-ns w-100-m w-100-l"
                                >
                                    <div className="flex items-center">
                                        <InputGroup 
                                            onChange={this.changeUsername}
                                            placeholder=""
                                            intent= {errors.username === '' ? "success": "danger"}
                                            large={true}
                                            className="w-80"
                                            value={username}
                                        />
                                        {errors.username && 
                                        <Tooltip content={errors.username} placement="right" isOpen={true}>
                                            <i className="fa-solid fa-circle-exclamation error-icon ml3" ></i>
                                        </Tooltip>
                                        
                                        }
                                    </div>
                                    
                                </FormGroup>
                                <FormGroup
                                    label="Password"
                                    style={{color: "#FFE39F"}}
                                    className="b f4 lh-copy w-100-ns w-100-m w-100-l"
                                >
                                    <div className="flex items-center">
                                        <InputGroup
                                            onChange={this.changePassword}
                                            placeholder=""
                                            rightElement={lockButton}
                                            large={true}
                                            intent={errors.password === '' ? "success": "danger"}
                                            type={showPassword ? "text" : "password"}
                                            round={true}
                                            className="w-80"
                                            value={password}
                                        />
                                        {errors.password && 
                                        <Tooltip content={errors.password} placement="right" isOpen={true} hoverCloseDelay={1000}>
                                            <i className="fa-solid fa-circle-exclamation error-icon ml3" ></i>
                                        </Tooltip>
                                        
                                        }
                                    </div>
                                    
                                </FormGroup>
                                {errors.login && 
                                    <span style={{color: "#FFE39F"}} >{errors.login}</span>
                                }
                                <div className="flex justify-between items-center w-80 mt4">
                                    <div>
                                        <Link to="/register" className="f6 link dim db" style={{color: "#FFE39F"}}>Sign Up</Link>
                                    </div>
                                    <div>
                                        <Button className="submit-btn" rightIcon="arrow-right" intent="success" text="Login" large={true} disabled={this.loginEnabled()} onClick={this.loginUser}/>
                                    </div>
                                
                                </div>

                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>

            
        );
    }
    
}
export default Login;
