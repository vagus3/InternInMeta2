import React from 'react';
import { Link } from 'react-router-dom'; // 페이지 이동을 위한 Link 컴포넌트
import './CartPages.css';

// App.js로부터 cartItems와 setCartItems를 props로 받음
function CartPage({ cartItems, setCartItems }) {

  // 장바구니에서 상품 제거하는 함수
  const handleRemoveItem = (idToRemove) => {
    // idToRemove와 다른 아이템들만 남겨서 새로운 배열 생성
    setCartItems(cartItems.filter(item => item.id !== idToRemove));
  };
  
  // 총 가격 계산
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">장바구니</h1>
      <Link to="/" className="back-link">← 쇼핑 계속하기</Link>
      
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">장바구니가 비었습니다.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image"/>
              <div className="cart-item-info">
                <span className="cart-item-brand">{item.brand}</span>
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">{item.price.toLocaleString()}원</span>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">삭제</button>
            </div>
          ))}
          <div className="cart-summary">
            <strong>총 주문금액:</strong>
            <span className="total-price">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
