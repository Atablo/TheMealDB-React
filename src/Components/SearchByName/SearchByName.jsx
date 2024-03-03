import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { getMealsByName } from '../../services/searchByName';
import MealList from '../MealList/MealList';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';
import FiltersBox from '../FiltersBox/FiltersBox';

export default function SearchByName() {
  const [formField, setFormField] = useState();
  const [listaResultante, setListaResultante] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const countResults = (results) => {
    if (results) { setResultsCount(results.length); } else { setResultsCount(0); }
  };

  const formFieldHandler = (event) => {
    setFormField(event.target.value);
  };
  const searchMealsByName = () => {
    // esto es para poner lo de la búsqueda a true

    getMealsByName(formField).then(
      (json) => {
        setListaResultante(json.meals);
        countResults(json.meals);
        setSearchButtonClicked(true);
      },
    );
  };

  return (
    <>
      <div>
        <h1 className="text-center">Seach a meal by it&apos;s name</h1>
      </div>
      <div className="row w-75 mx-auto">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search by Name"
          onChange={formFieldHandler}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={searchMealsByName}
          aria-label="Search"
        >
          <p className="mb-0 fw-bold">Search <CiSearch /></p>

        </button>
      </div>

      <div className="container">
        {/* Esto es para que si existe algo más en la lista lo pinte */}
        {resultsCount
          ? (
            <>
              <FiltersBox
                // le voy a pasar la lisa original,
                // el seteador(para que imprima correctamente)
                // y además el metodo para cuando lo reseteen
                mealsToPrint={listaResultante}
                setMealsToPrint={setListaResultante}
                searchMealsByName={searchMealsByName}

              />
              <SearchResultsInfo
                numResultados={resultsCount}
                searchButtonClicked={searchButtonClicked}
              />
              <MealList mealsToPrint={listaResultante} />
            </>
          )
          : (
            <SearchResultsInfo
              numResultados={resultsCount}
              searchButtonClicked={searchButtonClicked}
            />
          )}
      </div>
    </>
  );
}
