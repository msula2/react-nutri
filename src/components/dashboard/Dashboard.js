import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = ({user, loggedIn}) => {
    const {name, id} = {...user};

    return(
        <div>
        {loggedIn ? <h1>Welcome {name} your id is {id}</h1> :
            <Navigate to="/login" />
        }
        </div>

    );
}

export default Dashboard;