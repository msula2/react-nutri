import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import HealthTips from './components/healthtips/HealthTips';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user : {
        name: '',
        id: ''
      },
      loggedIn : false
    }
    fetch("http://localhost:3001/user", {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      if (data.result == "logged in"){
        this.setUserDetails(data.username, data.id);
        this.setState({loggedIn: true});
      }
      else if (data.result == "logged out"){
        this.state = {
          user : {
            name: '',
            id: ''
          },
          loggedIn : false
        }
      } else{
        console.log(data.error);
      }
    })
  }

  setUserDetails = (name, id) => {
    this.setState({user: {name: name, id: id}});
    this.setState({loggedIn: true});
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path="/" element={<Dashboard user={this.state.user} loggedIn={this.state.loggedIn}/>} />
            <Route path="/login" element={<Login setUser={this.setUserDetails}/>} />
            <Route path="/register" element={<Register setUserDetails={this.setUserDetails} />} />
            <Route path="/nutrients" element={<Nutrients />} />
            <Route path="/nutrients/carbohydrates" element={<Carbohydrates />} />
            <Route path="/nutrients/protiens" element={<Protiens />} />
            <Route path="/nutrients/fats" element={<Fats />} />
            <Route path="/nutrients/vitamins" element={<Vitamins />} />
            <Route path="/nutrients/minerals" element={<Minerals />} />
            <Route path="/nutrients/water" element={<Water />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/calories" element={<Calories />} />
            <Route path="/health-tips" element={<HealthTips />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
