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
            <Route path="/nutrients" element={<Nutrients />} />
            <Route path="/nutrients/carbohydrates" element={<Carbohydrates />} />
            <Route path="/nutrients/protiens" element={<Protiens />} />
            <Route path="/nutrients/fats" element={<Fats />} />
            <Route path="/nutrients/vitamins" element={<Vitamins />} />
            <Route path="/nutrients/minerals" element={<Minerals />} />
            <Route path="/nutrients/water" element={<Water />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
