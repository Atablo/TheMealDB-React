import React, { useState } from 'react';
import { getMealsByName } from '../services/searchByName';
import MealList from '../Components/MealList/MealList';

export default function SearchByName() {
  const [formField, setFormField] = useState();
  const [listaResultante, setListaResultante] = useState([]);
  const formFieldHandler = (event) => {
    setFormField(event.target.value);
  };
  const searchMealsByName = () => {
    getMealsByName(formField).then(
      (json) => setListaResultante(json.meals),
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
      {listaResultante && <MealList mealsToPrint={listaResultante} />}
    </>
  );
}
