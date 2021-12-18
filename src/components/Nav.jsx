import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./nav.css";

const Nav = () => {
  const showSearchBtn = useSelector(state => state.showSearchBtn)
  const history = useHistory()
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
      <p onClick={()=>{history.push("/inicio#busqueda")}} className={`${showSearchBtn ? "" : "d-none "}fixed-btn fas fa-search`}></p>
    </>
  );
};
export default Nav;
