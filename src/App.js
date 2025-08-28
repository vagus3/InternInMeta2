import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import CartPage from './pages/CartPages';
import CardListPage from './pages/CardListPage';
import CardEnrollPages from './pages/CardEnrollPages';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import './App.css';
import NavbarIF from './NavbarIF';

const Products = [
  { id: 1, brand: '브랜드A', name: '편안하고 착용감이 좋은 신발', price: 35000, image: '/images/shoe1.png' },
  { id: 2, brand: '브랜드A', name: '힙한 컬러가 매력적인 신발', price: 25000, image: '/images/shoe11.png' },
  { id: 3, brand: '브랜드B', name: '편안하고 착용감이 좋은 신발', price: 35000, image: '/images/shoe2.png' },
  { id: 4, brand: '브랜드B', name: '힙한 컬러가 매력적인 신발', price: 35000, image: '/images/shoe22.png' },
  { id: 5, brand: '브랜드C', name: '편안하고 착용감이 좋은 신발', price: 35000, image: '/images/shoe3.png' },
  { id: 6, brand: '브랜드C', name: '힙한 컬러가 매력적인 신발', price: 35000, image: '/images/shoe33.png' },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products] = useState(Products);

  // 장바구니에 상품을 추가하는 함수 (어떤 상품인지 product를 받아야 함)
  const handleAddToCart = (productToAdd) => {
      const existingItem = cartItems.find(item => item.id === productToAdd.id);

  if (existingItem) {
    // 상품이 이미 있으면 수량만 증가
    const updatedCart = cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
  } else {
    // 상품이 없으면 quantity: 1 과 함께 새로 추가
    setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
      }
  };

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState('list');

  const goToEnrollPage = () => {
    setPage('add');
  };

  const goToListPage = () => {
    setPage('list');
  };

  const handleAddCard = (newCard) => {
    // id는 실제 서비스라면 서버에서 부여하거나 UUID 등을 사용합니다.
    const cardWithId = { ...newCard, id: Date.now() };
    setCards([...cards, cardWithId]);
    goToListPage();
  };

  return (
    <div className="App">
      {/* <Navbar cartItemCount={cartItems.length} /> */}
      <Routes>
        <Route element={<NavbarIF cartItemCount={cartItems.length} />}>
        <Route path="/" element={
          <main className="product-list-container">
            <header className="list-header">
              <h1>신발 상품 목록</h1>
              <br />
              <p>현재 {products.length}개의 상품이 있습니다.</p>
            </header>
            <div className="product-grid">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </main>
        } />
        <Route path="/cart" element={
          <CartPage cartItems={cartItems} setCartItems={setCartItems} />
        } />
        </Route>

        <Route path="/cards" element=
          {<CardListPage cards={cards} />} 
        />
        <Route path="/cards/add" element=
          {<CardEnrollPages onCardSubmit={handleAddCard} />} 
        />
        <Route 
          path="/payment/success" 
          element={<PaymentSuccessPage setCartItems={setCartItems} />} 
        />
      </Routes>

    </div>
  );
}

export default App;