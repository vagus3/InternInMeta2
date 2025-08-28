import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link">
            <div className="navbar-logo">심발</div>
        </Link>

        <Link to="/cart" className="navbar-cart-link">
          <div className="navbar-cart">
            <span className="cart-icon">🛒</span>
            {/* 장바구니 로고 위 담긴 품목 개수 표기  */}
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
