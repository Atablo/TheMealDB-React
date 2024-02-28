import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-dark">
        <div className="container-lg">
          <Link to="/">
            <img
              src="https://www.themealdb.com/images/logo.png"
              alt=""
              height="30"
            />
          </Link>
          <div className="flex-column w-40 py-2">
            <Link to="/searchByName" className="">
              <div className="d-grid gap-2 flex-column w-40 py-2">
                <button type="button" name="" id="" className="btn btn-light btn-e">
                  Search a meal by name
                </button>
              </div>
            </Link>
          </div>
          <div className="flex-column w-40 py-2">
            <Link to="/searchByIngredient" className="">
              <div className="d-grid gap-2 flex-column w-40 py-2">
                <button type="button" name="" id="" className="btn btn-light btn-e">
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
