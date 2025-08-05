import React from 'react';
import { Link } from 'react-router-dom'; // Link import
import './Navbar.css';

// cartCount 대신 cartItemCount로 props 이름을 변경 (더 명확하게)
function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* 로고를 클릭하면 홈으로 가게 할 수도 있습니다. */}
        <Link to="/" className="navbar-logo-link">
            <div className="navbar-logo">브랜드명</div>
        </Link>
        
        {/* 아이콘을 Link로 감싸서 /cart 페이지로 이동시킵니다. */}
        <Link to="/cart" className="navbar-cart-link">
          <div className="navbar-cart">
            <span className="cart-icon">🛒</span>
            {/* 0보다 클 때만 뱃지를 보여주는 조건부 렌더링 */}
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
