import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import Image from './Image';

function ProductCard({ product, onAddToCart }) { 

  const { image, brand, name, price } = product;
  return (
    <div className="product-card">
      <Image src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h1>{brand}</h1>
        <p>{name}</p>
        <p className="product-price">{price.toLocaleString()}원</p>
        <div className="product-actions">
          <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
            담기
          </button>
          <Link to="/cart" className="purchase-btn">
            구매
          </Link>
        </div>
      </div> 
    </div>
  );
}

export default ProductCard;