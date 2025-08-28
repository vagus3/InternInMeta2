import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CardListPage.css';

const formatCardNumber = (number) => {
  if (!number || number.length < 16) return '****-****-****-****';
  const part1 = number.slice(0, 4);
  const part2 = number.slice(5, 9);
  return `${part1}-${part2}-****-****`;
};

function CardListPage({ cards = [], onPaymentClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalPrice, totalQuantity} = location.state || {};

  const handlePayment = () => {
     navigate('/payment/success',{
      state:{
        totalPrice: totalPrice,
        totalQuantity: totalQuantity
      }
     })
  }

  const handleAddCardClick = () => {
    navigate('/cards/add');
  };

  const handleCancel= () =>{
    navigate('/cart');
  };

  return (
    <div className="card-list-page-container">
      <header className="header">
        <h1>보유 카드</h1>
        <button className="close-button" onClick={handleCancel}>X</button>
      </header>
      
      {cards.length === 0 ? (
        // 카드가 없을 때의 UI
        <div className="empty-list centered-content">
          <p>새로운 카드를 등록해주세요.</p>
          <div className="add-card-box" onClick={handleAddCardClick}>
            +
          </div>
        </div>
      ) : (
        // 카드가 있을 때의 UI
        <div className="card-list">
          {cards.map((card) => (
            <div key={card.id} className="card-payment-wrapper">
            <div className="card-item">
              <div className="card-chip"></div>
              <div className="card-number">{formatCardNumber(card.number)}</div>
              <div className="card-details">
                <span className="card-name">{card.name?.toUpperCase() || 'NAME'}</span>
                <span className="card-expiry">{card.expiry || 'MM/YY'}</span>
              </div>
            </div>
            <button className="payment-button" onClick={handlePayment}>
            이 카드로 결제하기
          </button>
          </div>
          ))}
          <div className="add-card-box" onClick={handleAddCardClick}>
            +
          </div>
        </div>
      )}
    </div>
  );
}

export default CardListPage;