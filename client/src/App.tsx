import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ReadySigns from './components/ReadySigns/ReadySigns';
import CustomSigns from './components/CustomSigns/CustomSigns';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="shop/ready-signs" element={<ReadySigns />} />
          <Route path="shop/custom-signs" element={<CustomSigns />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
