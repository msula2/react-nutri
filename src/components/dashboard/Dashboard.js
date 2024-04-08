import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Button to get user data. If the user is not logged in, he will be returned to the login page.
* This component demonstrates the use of `loggedIn` and React hooks
 *
 * @param {{ user: { name: string, id: string }, loggedIn: boolean }} props - The properties passed to the component.
 * @param {Object} props.user - The current user.
 * @param {string} props.user.name - Logged-in user name.
 * @param {string} props.user.id - Logged-in user ID.
 * @param {boolean} props.loggedIn - If the user is logged in.
 * @returns {JSX.Element} Obtain user data and reset the button to navigate the login page when not logged in.
 * 
 * @example
 * 
 * <Dashboard user={user} loggedIn={loggedIn} />
 */
 const Dashboard = ({ user, loggedIn }) => {
    const { name, id } = user;
    const [logged, setLogged] = useState([]);

    /**
     * Get user data and update status with results.
     */
    const getUsers = () => {
        fetch("http://localhost:3001/user", {
            method: 'get',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setLogged(data.result);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }

    return (
        <div>
            {loggedIn ? <h1>Welcome {name} your id is {id}</h1> :
                <Navigate to="/login" />
            }
            <div className="">
                <button onClick={getUsers} className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib">Get Users</button>
                <p>You are {logged}</p>
            </div>
        </div>
    );
}

export default Dashboard;
