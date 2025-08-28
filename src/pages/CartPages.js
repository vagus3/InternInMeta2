import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPages.css';
import Image from '../Image';

function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddItem = (idToAdd) => {
    const updatedCart = cartItems.map(item =>
      item.id === idToAdd ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (idToRemove) => {
    const itemToRemove = cartItems.find(item => item.id === idToRemove);

    if (itemToRemove.quantity === 1) {
      setCartItems(cartItems.filter(item => item.id !== idToRemove));
    } else {
      const updatedCart = cartItems.map(item =>
        item.id === idToRemove ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
    }
  };

  // 배송비 계산 로직
  const itemsPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [tpPrice, setTpPrice] = useState(3000);

  useEffect(() => {
    setTpPrice(itemsPrice >= 100000 ? 0 : 3000);
  }, [itemsPrice]);

  const totalPrice = itemsPrice + tpPrice;

  const goToPayment = () => {
    navigate('/cards', {
      state:{
        totalPrice: totalPrice,
        totalQuantity: totalQuantity
      }
    });
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">장바구니</h1>
      <h4>현재 {totalQuantity} 개의 상품이 있습니다.</h4>
      
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">장바구니가 비었습니다.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <Image src={item.image} alt={item.name} className="cart-item-image"/>
              <div className="cart-item-info">
                <span className="cart-item-brand">{item.brand}</span>
                <span className="cart-item-price">{item.price.toLocaleString()}원</span>
                <div className="quantity-controls">
                  <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">－</button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button onClick={() => handleAddItem(item.id)} className="add-btn">＋</button>
                </div>
              </div>
            </div>
          ))}

          <div className="items-price">
            <strong>상품 금액:</strong>
            <span className="items-cost">{itemsPrice.toLocaleString()}원</span>
          </div>
          <div className="tp-price">
            <strong>배송비:</strong>
            <span className="tp-cost">{tpPrice.toLocaleString()}원</span>
          </div>
          <div className="cart-summary">
            <strong>총 금액:</strong>
            <span className="total-price">{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="payment">
            <div className="payment-service" onClick={goToPayment}>결제하기</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;