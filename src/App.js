import React, { Component } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation/Navigation';
import Nutrients from "./components/nutrients/Nutrients";
import Carbohydrates from "./components/nutrients/carbohydrates/Carbohydrates";
import Protiens from './components/nutrients/protiens/Protiens';
import Fats from './components/nutrients/fats/Fats';
import Vitamins from './components/nutrients/vitamins/Vitamins';
import Login from './components/login/Login';
import Dashboard from "./components/dashboard/Dashboard";
import Minerals from './components/nutrients/minerals/Minerals';
import Water from './components/nutrients/water/Water';
import Register from './components/register/Register';
import Docs from './components/docs/Docs';
import Calories from './components/calories/Calories';
import Recipes from './components/recipes/Recipes';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user : {
        name: '',
        id: ''
      },
      loggedIn : null,
      timedOut: null
    };

    this.checkSession();
  }


  setUserDetails = (name, id, loggedIn) => {
    this.setState({ user: { name: name, id: id }, loggedIn: loggedIn, timedOut: false});
  };

  clearSession = () => {
    this.setState({ user: { name: '', id: '' }, loggedIn: false, timedOut: true});
  };

  checkSession = () => {
    fetch(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_DEPLOYED_URL}/user`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn === true){
        this.setUserDetails(data.user.username, data.user.id, data.loggedIn);
      } else if (data.loggedIn === false){
        this.clearSession();
      } else {
        console.log(data.error);
      }
    });
  };



  render() {
    const pathname = window.location.pathname;
    console.log("Pathname: ", pathname);
    return (
      <HashRouter>
        {pathname !== "/login" && pathname !== "/register" && pathname !== "/docs" && 
          <Navigation />
        }
        <Routes>
            <Route path="/login" element={<Login setUserDetails={this.setUserDetails}/>} />
            <Route path="/register" element={<Register setUserDetails={this.setUserDetails} />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/dashboard" element={<Dashboard timedOut={this.state.timedOut}/>} />
            <Route path="/nutrients" element={<Nutrients />} />
            <Route path="/nutrients/carbohydrates" element={<Carbohydrates />} />
            <Route path="/nutrients/protiens" element={<Protiens />} />
            <Route path="/nutrients/fats" element={<Fats />} />
            <Route path="/nutrients/vitamins" element={<Vitamins />} />
            <Route path="/nutrients/minerals" element={<Minerals />} />
            <Route path="/nutrients/water" element={<Water />} />
            <Route path="/calories" element={<Calories />} />
            <Route path="/recipes" element={<Recipes />} />

        </Routes>
      </HashRouter>
    );
  }
}

export default App;
