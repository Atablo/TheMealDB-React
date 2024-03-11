import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved

// Componente que se encarga de renderizar los botones de busqueda de las comidas
export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-dark">
        <div className="container-lg">
          {/* Usamos el componente Link para navegar a la página principal */}
          <Link to="/">
            <img
              src="https://www.themealdb.com/images/logo.png"
              alt=""
              height="30"
            />
          </Link>
          <div className="flex-column w-40 py-2">
            {/* Utilizamos el componente Link para navegar
            a la página de busqueda de comidas por nombre */}
            <Link to="/searchByName" className="text-decoration-none">
              <div className="d-grid gap-2 flex-column w-40 py-2">
                <button type="button" name="" id="" className="btn btn-light header__searchbtn--orange">
                  Search a meal by name
                </button>
              </div>
            </Link>
          </div>
          <div className="flex-column w-40 py-2">
            {/* Utilizamos el componente Link para navegar
            a la página de busqueda de comidas por ingrediente */}
            <Link to="/searchByIngredient" className="text-decoration-none">
              <div className="d-grid gap-2 flex-column w-40 py-2">
                <button type="button" name="" id="" className="btn btn-light header__searchbtn--orange">
                  Search a meal by ingredient
                </button>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
