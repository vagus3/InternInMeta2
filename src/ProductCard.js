import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) { 
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        {/* ...기존 코드... */}
        <p className="product-price">{product.price.toLocaleString()}원</p>
        {/* 버튼 클릭 시 onAddToCart 함수에 현재 product 객체를 전달 */}
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          담기
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
