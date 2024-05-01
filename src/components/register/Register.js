import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AnchorButton, Button, FormGroup, InputGroup, Tooltip, Icon } from "@blueprintjs/core";
import sandwich_pic from "../../assets/imgs/register-sandwich.jpg"
import salad_pic from "../../assets/imgs/register-salad.jpg"
import steak_pic from "../../assets/imgs/register-steak.jpg"
import cereal_pic from "../../assets/imgs/register-cereal.jpg"
import Loader from '../loader/Loader';

/**
* @typedef {Object} Props
* @property {Function} setUser Function to set user data
*/

/**
* Component for user registration.
* @param {Props} props - The props passed to the component.
* @example
* <Register setUser={setUserFunction} />
* // Renders a registration form allowing the user to register.
*/
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      showPassword: false,
      errors: {
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        register: '',
      },
      dirty: {
        username: false,
        password: false,
        email: false,
        confirmPassword: false,
      },
      loading: true,
      message: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });

  changeUsername = (event) => {
    const { value } = event.target;
    let errors = { ...this.state.errors };
    let dirty = { ...this.state.dirty };

    let username_regex = /^[a-zA-Z0-9]{0,20}$/;
    dirty.username = true;

    if (username_regex.test(value)) {
      errors.username = value.trim() === '' ? 'Username is required.' : '';
    } else {
      errors.username = "The username must be 0-20 characters long and must not contain special characters.";
    }

    this.setState({ username: value, errors, dirty });
  };

  changeEmail = (event) => { 
    const { value } = event.target;
    let errors = { ...this.state.errors };
    let dirty = { ...this.state.dirty };

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    dirty.email = true;

    if (emailRegex.test(value)) {
      errors.email = '';
    } else {
      errors.email = 'Invalid email format';
    }

    this.setState({ email: value, errors, dirty });
  };


  changePassword = (event) => {
    const { value } = event.target;
    let errors = { ...this.state.errors };
    let dirty = { ...this.state.dirty };

    dirty.password = true;
    errors.password = value.trim() === '' ? 'Password is required.' : '';

    this.setState({ password: value, errors, dirty });
  };

  changeConfirmPassword = (event) => {
    const { value } = event.target;
    let errors = { ...this.state.errors };
    let dirty = { ...this.state.dirty };

    dirty.confirmPassword = true;
    errors.confirmPassword =
      value.trim() === '' ? 'Confirm password is required.' : value !== this.state.password ? 'Passwords do not match.' : '';

    this.setState({ confirmPassword: value, errors, dirty });
  };

  registerUser = () => {

    let errors = { ...this.state.errors };
    let dirty = { ...this.state.dirty };

    const { username, password, email } = this.state;

    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);


    fetch(`${process.env.NODE_ENV==='development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}register`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
              dirty.password = false;
              dirty.username = false;
              errors.register = data.error;

              this.setState({ username: '', password: '', email: '', errors, dirty });
            } else {
              setTimeout(() => {
                window.location.replace("/login");
              }, 3000);
              
            }

        })
        .catch(error => {
            console.error("Error occurred during registration:", error);
            errors.register = "An error occurred while registering. Please try again later.";
            this.setState({ username: '', password: '', email: '', errors, dirty });
        });
    this.setState({ username: '', password: '', confirmPassword: '', errors, dirty });
  };

  registrationEnabled = () => {
    let errors = { ...this.state.errors };
    let dirty = { ...this.state.dirty };
    let { register, ...otherErrors } = errors;

    let errorMsgs = Object.values(otherErrors).filter((item) => item !== '');
    let allDirty = Object.values(dirty).every((item) => item === true);

    if (allDirty && errorMsgs.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { username, password, email, confirmPassword, showPassword, loading, message, errors } = this.state;
  
    const lockButton = (
        <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} disabled={false}>
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent= {showPassword ? "success" : "danger"}
                onClick={this.handleLockClick}
            />
        </Tooltip>
    );
  
    return (
      <div> 
          {loading && <Loader message={message}/>}
          <div className="vw-100 vh-100 flex justify-center items-center stack-on-small" style={{display: loading? 'none': 'flex'}}>
          <div className='w-30-l flex flex-column justify-between items-end'>
              <div className="w-50 mr6">
                <div className="flex justify-start">
                  <div className="pa3 mr2 mt6">
                      <img src={sandwich_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "10rem", width: "10rem"}}/>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="pa3 mr2 mt6">
                      <img src={salad_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "10rem", width: "10rem"}}/>
                  </div>
                </div>
              </div>
          </div>
          <div className='w-30-l'>
              <div className='w-80'>
                  <h1 className="mb5 pb2" style={{color: "#FFE39F", borderBottom: '1px solid rgb(166, 217, 64)'}}>Register</h1>
              </div>
              
              <FormGroup label="Username" style={{ color: '#FFE39F' }} className="b f4 lh-copy w-100-ns w-100-m w-100-l">
              <div className="flex items-center">
                <InputGroup
                  onChange={this.changeUsername}
                  placeholder=""
                  intent={errors.username === '' ? 'success' : 'danger'}
                  large={true}
                  className="w-80"
                  value={username}
                />
                {errors.username && (
                  <Tooltip content={errors.username} placement="right" isOpen={true}>
                    <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                  </Tooltip>
                )}
              </div>
            </FormGroup>
            <FormGroup label="Email" style={{ color: '#FFE39F' }} className="b f4 lh-copy w-100-ns w-100-m w-100-l">
                <div className="flex items-center">
                  <InputGroup
                    onChange={this.changeEmail}
                    placeholder=""
                    intent={errors.email === '' ? 'success' : 'danger'}
                    large={true}
                    className="w-80"
                    value={email}
                  />
                  {errors.email && (
                    <Tooltip content={errors.email} placement="right" isOpen={true}>
                      <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                    </Tooltip>
                  )}
                </div>
              </FormGroup>
            <FormGroup label="Password" style={{ color: '#FFE39F' }} className="b f4 lh-copy w-100-ns w-100-m w-100-l">
              <div className="flex items-center">
                <InputGroup
                  onChange={this.changePassword}
                  placeholder=""
                  rightElement={lockButton}
                  large={true}
                  intent={errors.password === '' ? 'success' : 'danger'}
                  type={showPassword ? "text" : "password"}
                  round={true}
                  className="w-80"
                  value={password}
                />
                {errors.password && (
                  <Tooltip content={errors.password} placement="right" isOpen={true} hoverCloseDelay={1000}>
                    <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                  </Tooltip>
                )}
              </div>
            </FormGroup>
            <FormGroup label="Confirm Password" style={{ color: '#FFE39F' }} className="b f4 lh-copy w-100-ns w-100-m w-100-l">
              <div className="flex items-center">
                <InputGroup
                  onChange={this.changeConfirmPassword}
                  placeholder=""
                  rightElement={lockButton}
                  large={true}
                  intent={errors.confirmPassword === '' ? 'success' : 'danger'}
                  type={showPassword ? "text" : "password"}
                  round={true}
                  className="w-80"
                  value={confirmPassword}
                />
                {errors.confirmPassword && (
                  <Tooltip content={errors.confirmPassword} placement="right" isOpen={true} hoverCloseDelay={1000}>
                    <i className="fa-solid fa-circle-exclamation error-icon ml3"></i>
                  </Tooltip>
                )}
              </div>
            </FormGroup>
            {errors.register && <span style={{ color: '#FFE39F' }}>{errors.register}</span>}
            <div className="flex justify-between items-center w-80 mt4">
              <div>
                <Link to="/login" className="f6 link dim db" style={{ color: '#FFE39F' }}>
                  Login
                </Link>
              </div>
              <div>
                <Button
                  rightIcon="arrow-right"
                  className="submit-btn"
                  intent="success"
                  text="Register"
                  large={true}
                  disabled={this.registrationEnabled()}
                  onClick={this.registerUser}
                />
              </div>
            </div>
          </div>
          <div className='w-30-l flex flex-column justify-between items-start'>
              <div className="w-50">
                <div className="flex justify-end">
                  <div className="pa3 mr2 mt6">
                      <img src={steak_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "10rem", width: "10rem"}}/>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="pa3 mr2 mt6">
                      <img src={cereal_pic} className="br-100 ba dib bw2" style={{borderColor: "rgb(166, 217, 64)", height: "10rem", width: "10rem"}}/>
                  </div>
                </div>
              </div>
              
          </div>

      </div>
      </div>
    );
  }
  
}
export default Register;