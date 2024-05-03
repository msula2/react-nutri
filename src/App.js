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
import HealthTips from './components/healthtips/HealthTips';
import Diet from './components/diet/Diet';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user : {
        name: '',
        id: ''
      },
      loggedIn : null,
      timedOut: null,
      active:  {
        nutrients: false,
        calories: false,
        recipes: false,
        healthtips: false
      }
    };
    this.checkSession();
  }


  setNavigationActive = (pathname) => {
    let newActiveState = {
      nutrients: false,
      calories: false,
      recipes: false,
      healthtips: false
    };
    if (pathname.includes("nutrients")) {
      newActiveState.nutrients = true;
    } else if (pathname.includes("calories")) {
      newActiveState.calories = true;
    } else if (pathname.includes("recipes")) {
      newActiveState.recipes = true;
    } else if (pathname.includes("health-tips")) {
      newActiveState.healthtips = true;
    }

    this.setState({ active: newActiveState });
  };


  setUserDetails = (name, id, loggedIn) => {
    this.setState({ user: { name: name, id: id }, loggedIn: loggedIn, timedOut: false});
  };

  clearSession = () => {
    this.setState({ user: { name: '', id: '' }, loggedIn: false, timedOut: true});
    window.location.replace("/#/login");
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
    const pathname = window.location.hash;
    this.setNavigationActive(pathname);
    const {active} = this.state
    return (
      <HashRouter>
        {(pathname.length != 0 && !pathname.includes("login") && !pathname.includes("register") && !pathname.includes("docs") && !pathname.includes("diet")) && 
          <Navigation active={active}/>
        }
        <Routes>
            <Route path="/" element={<Login setUserDetails={this.setUserDetails}/>} />
            <Route path="/diet" element={<Diet/>}/>
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
            <Route path="/health-tips" element={<HealthTips />} />

        </Routes>
      </HashRouter>
    );
  }
}

export default App;
