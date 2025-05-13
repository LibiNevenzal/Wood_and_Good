import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ReadySigns from './components/ReadySigns/ReadySigns';
import CustomSigns from './components/CustomSigns/CustomSigns';
import Cart from './components/ShoppingCart/ShoppingCart';
import PaymentForm from './components/Paymant/PaymentForm';
import { AdminProvider } from './components/AdminContext/AdminContext'; // <<< הוספה
import EditReadySigns from './components/EditReadySign/EditReadySigns'
import EditCustomSigns from './components/EditCustomSign/EditCustomSigns '

function App() {
  return (
    <Router>
      <AdminProvider> {/* <<< עטפנו את כל האתר בהרשאות מנהל */}
        <Routes>
          {/* כל הדפים עטופים ב-Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="shop/ready-signs" element={<ReadySigns />} />
            <Route path="home" element={<Home />} />
            <Route path="shop/custom-signs" element={<CustomSigns />} />
            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<PaymentForm />} />
            <Route path="/admin/edit-ready-signs" element={<EditReadySigns />} />
            <Route path="/admin/edit-custom-signs" element={<EditCustomSigns />} />
          </Route>
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;
