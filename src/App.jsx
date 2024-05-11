// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import  ProductList  from './ProductList';

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <p>Clothing Store</p>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
