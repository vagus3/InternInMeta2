import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardEnrollPages.css';

function CardEnrollPage({ onCardSubmit }) {
  const navigate = useNavigate();

  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    name: '',
    cvc: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { number, expiry, name, cvc, password } = cardInfo;
    const isValid =
      number.length === 19 &&
      expiry.length === 5 &&
      name.trim().length > 0 &&
      cvc.length === 3 &&
      password.length === 2;
    setIsFormValid(isValid);
  }, [cardInfo]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '')
                             .replace(/(\d{4})(?=\d)/g, '$1-')
                             .slice(0, 19);
    }

    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '')
                             .replace(/(\d{2})(\d{0,2})/, '$1/$2')
                             .slice(0, 5);
    }

    setCardInfo({ ...cardInfo, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onCardSubmit(cardInfo);
      navigate('/cards');
    }
  };

  return (
    <div className="enroll-page-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>&lt;</button>
        <h1>카드 추가</h1>
        <div style={{width: '30px'}}></div>
      </div>

      <div className="card-preview">
        <div className="card-chip"></div>
        <div className="card-number">
          {cardInfo.number || '****-****-****-****'}
        </div>
        <div className="card-details">
          <span className="card-name">{cardInfo.name?.toUpperCase() || 'NAME'}</span>
          <span className="card-expiry">{cardInfo.expiry || 'MM/YY'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-form">
        <label>카드 번호</label>
        <input
          type="text" name="number"
          value={cardInfo.number} onChange={handleChange}
          className="form-input"
        />
        <label>만료일</label>
        <input
          type="text" name="expiry" placeholder="MM/YY"
          value={cardInfo.expiry} onChange={handleChange}
          className="form-input"
        />
        <label>카드 소유자 이름</label>
        <input
          type="text" name="name" placeholder="카드에 표시된 이름과 동일하게 입력"
          value={cardInfo.name} onChange={handleChange}
          className="form-input"
        />
        <div className="input-group">
            <div className="input-field">
                <label>보안 코드(CVC/CVV)</label>
                <input
                    type="password" name="cvc" value={cardInfo.cvc}
                    onChange={handleChange} maxLength="3" className="form-input"
                />
            </div>
            <div className="input-field">
                <label>카드 비밀번호(앞 2자리)</label>
                <input
                    type="password" name="password" value={cardInfo.password}
                    onChange={handleChange} maxLength="2" className="form-input"
                />
            </div>
        </div>
        
        <button type="submit" className="submit-button" disabled={!isFormValid}>
          작성 완료
        </button>
      </form>
    </div>
  );
}

export default CardEnrollPage;