import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css';

function PaymentSuccessPage({ setCartItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalPrice = 0, totalQuantity = 0 } = location.state || {};

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-page-container">
      <div className="success-content">
        <h1 className="success-title">결제 완료!</h1>
        <p className="success-message">
          총 {totalQuantity}개의 상품을 구매하셨습니다.
        </p>
        <div className="total-amount-section">
          <span className="total-amount-label">총 결제금액</span>
          <span className="total-amount-value">{totalPrice.toLocaleString()}원</span>
        </div>
        <button className="back-to-list-button" onClick={goToHome}>
          상품 목록 보기
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;