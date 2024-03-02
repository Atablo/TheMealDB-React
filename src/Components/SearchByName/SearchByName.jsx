import React, { useState } from 'react';
import { getMealsByName } from '../../services/searchByName';
import MealList from '../MealList/MealList';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';

export default function SearchByName() {
  const [formField, setFormField] = useState();
  const [listaResultante, setListaResultante] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);

  const countResults = (results) => {
    if (results) { setResultsCount(results.length); } else { setResultsCount(0); }
  };

  const formFieldHandler = (event) => {
    setFormField(event.target.value);
  };
  const searchMealsByName = () => {
    getMealsByName(formField).then(
      (json) => {
        setListaResultante(json.meals);
        countResults(json.meals);
      },
    );
  };

  return (
    <>
      <div>Pagina SearchByName</div>
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
      >
        Button
      </button>
      {/* Esto es para que si existe algo más en la lista lo pinte */}
      {resultsCount
        ? (
          <>
            <SearchResultsInfo numResultados={resultsCount} />
            <MealList mealsToPrint={listaResultante} />
          </>
        )
        : <SearchResultsInfo numResultados={resultsCount} />}
    </>
  );
}
