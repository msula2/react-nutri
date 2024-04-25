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
    const pathname = window.location.pathname;
    return (
      <BrowserRouter>
        {pathname !== "/login" && pathname !== "/register" && pathname !== "/docs" && 
          <Navigation />
        }
        <Routes>
            <Route path="/login" element={<Login setUser={this.setUserDetails}/>} />
            <Route path="/register" element={<Register setUserDetails={this.setUserDetails} />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/dashboard" element={<Dashboard user={this.state.user} loggedIn={this.state.loggedIn}/>} />
            <Route path="/nutrients" element={<Nutrients />} />
            <Route path="/nutrients/carbohydrates" element={<Carbohydrates />} />
            <Route path="/nutrients/protiens" element={<Protiens />} />
            <Route path="/nutrients/fats" element={<Fats />} />
            <Route path="/nutrients/vitamins" element={<Vitamins />} />
            <Route path="/nutrients/minerals" element={<Minerals />} />
            <Route path="/nutrients/water" element={<Water />} />
            <Route path="/calories" element={<Calories user={this.state.user}/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
