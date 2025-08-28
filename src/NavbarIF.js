import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function NavbarIF({ cartItemCount }) {
  return (
    <>
      <Navbar cartItemCount={cartItemCount} />

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default NavbarIF;