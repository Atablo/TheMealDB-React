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

          <Link to="/searchByIngredient">
            <div className="d-grid gap-2">
              <button
                type="button"
                name=""
                id=""
                className="btn btn-light"
              >
                Search a meal by name
              </button>
            </div>

          </Link>

          <button
            className="navbar-toggler d-lg-none text-light bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-dark" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-evenly align-items-stretch"
            id="collapsibleNavId"
          >
            <div className="flex-column w-40 py-2">
              <form className="d-flex my-2 my-lg-0" id="searchByName">
                <input
                  className="form-control text-center"
                  type="text"
                  placeholder="Search a meal by name"
                  id="mealName"
                />
                <button
                  className="btn btn-outline-light my-2 my-sm-0 mr-10 mx-2"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <p className="error-feedback text-danger p-0 mb-0" />
            </div>

            <div className="flex-column w-40 py-2">
              <form
                action="#"
                className="d-flex my-lg-0"
                id="searchByIngredient"
              >
                <input
                  className="form-control text-center"
                  type="text"
                  list="datalistOptions"
                  placeholder="Search a meal by an ingredient"
                  id="nombreIngrediente"
                />
                {/* <datalist id="datalistOptions" /> No sé qué chuchas es eso */}
                <button
                  className="btn btn-outline-light my-2 my-sm-0 mr-10 mx-2"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <p className="error-feedback text-danger p-0 mb-0" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
