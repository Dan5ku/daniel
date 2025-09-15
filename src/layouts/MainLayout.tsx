import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// styles
import './MainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className="layout-wrapper">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
