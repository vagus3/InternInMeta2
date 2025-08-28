import React from 'react';
import ProductCard from '../ProductCard';

function ProductListPage({ products, onAddToCart }) {
  return (
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
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default ProductListPage;