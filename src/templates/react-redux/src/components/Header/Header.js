import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/secondary">Secondary</Link>
      </nav>
    </div>
  );
}

export default Header;
