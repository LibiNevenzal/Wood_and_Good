import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Order from './components/Order/Order';
import Layout from './components/Layout/Layout';
import ReadySigns from './components/ReadySigns/ReadySigns';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="shop/ready-signs" element={<ReadySigns />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
