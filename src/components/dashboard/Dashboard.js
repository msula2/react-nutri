import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = ({user, loggedIn}) => {
    const {name, id} = {...user};

    // logoutUser = () => {
    //     fetch("https://node-nutri.onrender.com/logout", {
    //         method: 'get',
    //         //headers: {'Content-Type': 'application/json'},
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.result == "success"){
    //             this.props.setUser(data.data.username, data.data.id);
    //             this.setState({loggedIn: false});
    //         }
    //         else{
    //             console.log(data.error);
    //         }
    //     })

    // }

    return(
        <div>
        {loggedIn ? <h1>Welcome {name} your id is {id}</h1> :
            <Navigate to="/login" />
        }
            {/* <div className="">
                <button onClick={this.logoutUser} className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib">Sign out</button>
            </div> */}
        </div>
        

    );
}

export default Dashboard;