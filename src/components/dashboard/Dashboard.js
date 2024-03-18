import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = ({ user, loggedIn }) => {
    const { name, id } = user;
    const [logged, setLogged] = useState([]);

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
