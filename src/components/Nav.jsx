import { useState } from "react";
import "./nav.css";

const Nav = () => {
  const [showHamBtn, setShowHamBtn] = useState(false);
  return (
    <>
      <nav className="navbar">
        <a href="/inicio">AudioDB</a>
        <div className="nav-desktop">
          <a href="/inicio">Inicio</a>
          <a href="/inicio#busqueda">Buscar</a>
          <a href="/perfil">Perfil</a>
        </div>
        <i
          className="fas fa-bars"
          onClick={() => {
            setShowHamBtn((value) => !value);
          }}
        >
          <div className={`hamburger-btn ${showHamBtn ? "d-flex" : "d-none"}`}>
            <a href="/inicio">Inicio</a>
            <a href="/inicio#busqueda">Buscar</a>
            <a href="/perfil">Perfil</a>
          </div>
        </i>
      </nav>
      <a href="/inicio#busqueda" className="fixed-btn fas fa-search"></a>
    </>
  );
};
export default Nav;
