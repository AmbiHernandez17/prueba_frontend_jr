import { useState } from "react";
import "./nav.css"

const Nav = () => {
  const [showHamBtn, setShowHamBtn] = useState(false);
  return (
    <nav className="navbar">
      <a href="/">AudioDB</a>
      <div className="nav-desktop">
        <a href="/">Inicio</a>
        <a href="/buscar">Buscar</a>
        <a href="/perfil">Perfil</a>
      </div>
      <i className="fas fa-bars"></i>
      <div className={`hamburger-btn ${showHamBtn ? "d-block" : "d-none"}`}>
        <a href="/">Inicio</a>
        <a href="/buscar">Buscar</a>
        <a href="/perfil">Perfil</a>
      </div>
    </nav>
  );
};
export default Nav;
