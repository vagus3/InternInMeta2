import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import CartPage from './pages/CartPages';
import './App.css';

// 상품 데이터
const Products = [
  { id: 1, brand: '브랜드A', name: '편안하고 착용감이 좋은 신발', price: 35000, image: 'https://i.ibb.co/9vVzTrs/image.png' },
  { id: 2, brand: '브랜드A', name: '힙한 컬러가 매력적인 신발', price: 25000, image: 'https://i.ibb.co/3sckqvv/image.png' },
  { id: 3, brand: '브랜드B', name: '편안하고 착용감이 좋은 신발', price: 35000, image: 'https://i.ibb.co/VvZg3d4/image.png' },
  { id: 4, brand: '브랜드B', name: '힙한 컬러가 매력적인 신발', price: 35000, image: 'https://i.ibb.co/N2z0WnQ/image.png' },
  { id: 5, brand: '브랜드C', name: '편안하고 착용감이 좋은 신발', price: 35000, image: 'https://i.ibb.co/vHZk1j0/image.png' },
  { id: 6, brand: '브랜드C', name: '힙한 컬러가 매력적인 신발', price: 35000, image: 'https://i.ibb.co/d2Bv8qr/image.png' },
];

function App() {
  // 1. 장바구니 상태를 상품 객체의 '배열'로 관리
  const [cartItems, setCartItems] = useState([]);
  const [products] = useState(Products);

  // 2. 장바구니에 상품을 추가하는 함수 (어떤 상품인지 product를 받아야 함)
  // 중복 방지를 위해 이미 있는 상품이면 추가하지 않음 (개수 추가는 나중 단계)
  const handleAddToCart = (productToAdd) => {
    // 고유한 상품 추가를 위해 id를 사용합니다.
    // 수량 증가를 원하면 로직을 변경해야 합니다.
    const uniqueId = `${productToAdd.id}-${Date.now()}`;
    setCartItems(prevItems => [...prevItems, { ...productToAdd, id: uniqueId }]);
  };

  return (
    <div className="App">
      {/* Navbar에는 장바구니에 담긴 상품 '개수'를 전달 */}
      <Navbar cartItemCount={cartItems.length} />
      
      {/* 3. URL 경로에 따라 다른 페이지를 보여주는 Routes 설정 */}
      <Routes>
        {/* 기본 경로 ("/") */}
        <Route path="/" element={
          <main className="product-list-container">
            <header className="list-header">
              <h1>신발 상품 목록</h1>
              <p>현재 {products.length}개의 상품이 있습니다.</p>
            </header>
            <div className="product-grid">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart} // 함수 전달
                />
              ))}
            </div>
          </main>
        } />

        {/* 장바구니 경로 ("/cart") */}
        <Route path="/cart" element={
          <CartPage cartItems={cartItems} setCartItems={setCartItems} />
        } />
      </Routes>
    </div>
  );
}

export default App;