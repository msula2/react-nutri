import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const registerUser = () => {
        fetch("http://localhost:3001/register", {
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
                    setError(data.error);
                } else {
                    setRegistered(true);
                    setRegistrationSuccess(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            })
            .catch(error => {
                console.error("Error occurred during registration:", error);
                setError('An error occurred while registering. Please try again later.');
            });
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {registrationSuccess && <p>Registration successful. Redirecting to login page...</p>}
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Username</label>
                            <input onChange={handleUsernameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Email</label>
                            <input onChange={handleEmailChange} type="email" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6">Password</label>
                            <input onChange={handlePasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <button onClick={registerUser} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Register</button>
                    </div>
                    <div className="lh-copy mt3">
                        <Link to="/login" className="f6 link dim black db">Already have an account? Sign in</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Register;

