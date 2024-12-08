import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Order from './components/Home/Order/Order';
import Layout from './components/Home/Layout/Layout';
import SignupForm from './components/SignupForm/SignupForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm/>}/>
        <Route path="/order" element={<Order/>}/>
      </Routes>
    </Router>
  
  );
}

export default App;
