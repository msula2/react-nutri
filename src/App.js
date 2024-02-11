import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation/Navigation';
import Nutrients from "./components/nutrients/Nutrients";
import Carbohydrates from "./components/nutrients/carbohydrates/Carbohydrates";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path="nutrients" element={<Nutrients />} />
            <Route path="/nutrients/carbohydrates" element={<Carbohydrates />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
