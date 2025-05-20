import { useState, useContext } from "react";
import { Link } from "wouter";
import "../styles/hemisphereToggler.css";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import FovTable from "./fovTable";
import { DataContext } from '../app.jsx';

export default function Toggler({ selected, onSelect }) {
  const {
    loading,
    topPorFovNorth,
    topPorFovSouth,
  } = useContext(DataContext);
  
  const [hideToggler, setHideToggler] = useState(false);

  
  function toggleBar() {
    setHideToggler(!hideToggler);
  }

  return (
    <div className={`hemisphereTogglerTab ${hideToggler ? "hiddenToggler" : ""}`}>
      <section className="titleSection">
        <button id="togglerButton" className={ hideToggler ? "" : "rotated" } onClick={toggleBar}>
          { hideToggler ? <LuMenu /> : <IoClose />}
        </button>

        <div id="pageTitleContainer">
          <h1 id="pageTextTitle">
            Objetos de <span className="highlightText">Espacio Profundo</span> más 
            <span className="highlightText"> Fotografiados</span>
          </h1>
          <h3 id="pageSubTextTitle">(por amateurs)</h3>
        </div>
      </section>
      
      {/*
      <div className="hiddenHemisphereSelectorContainer">
        <Link
          to="/north"
          className={`hemisphereSelector ${selected === "N" ? "activeSelector" : ""}`}
          onClick={() => onSelect("N")}
        >
          N
        </Link>
        <Link
          to="/south"
          className={`hemisphereSelector ${selected === "S" ? "activeSelector" : ""}`}
          onClick={() => onSelect("S")}
        >
          S
        </Link>
      </div>
      */}

      <>
        <nav className="hemisphereSelectorContainer">
          <Link
            to="/north"
            className={`hemisphereSelector ${selected === "N" ? "activeSelector" : ""}`}
            onClick={() => onSelect("N")}
          >
            Hemisferio Norte
          </Link>
          <Link
            to="/south"
            className={`hemisphereSelector ${selected === "S" ? "activeSelector" : ""}`}
            onClick={() => onSelect("S")}
          >
            Hemisferio Sur
          </Link>
        </nav>

        <div className="tableWrapper">
          { loading ? (
              <p>Cargando...</p> 
            ) : (
              <FovTable
                topObjectsByFov={
                  selected === "N" ? topPorFovNorth : topPorFovSouth
                }
              />
            )
          }
        </div>
      </>
    </div>
  );
}
