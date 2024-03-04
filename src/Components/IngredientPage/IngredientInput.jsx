import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatalistIngredients from './DatalistIngredients';

export default function IngredientInput({ setOnNameIngredient }) {
  const [nameIngredient, setNameIngredient] = useState('');

  const [mensajeError, setMensajeError] = useState('');

  const handleMealsByIngredient = (e) => {
    e.preventDefault();

    if (!nameIngredient) {
      setMensajeError('Introduce an ingredient');
    } else {
      setMensajeError('');

      setOnNameIngredient(nameIngredient);
    }
  };

  return (
    <form action="#" className="d-flex my-lg-0" id="searchByIngredient">
      <input
        className="form-control text-center"
        type="text"
        list="datalistOptions"
        placeholder="Search a meal by an ingredient"
        id="nombreIngrediente"
        onBlur={(e) => setNameIngredient(e.target.value)}
      />
      <p className="error-feedback text-danger p-0 mb-0">{mensajeError}</p>
      <DatalistIngredients id="datalistOptions" />
      <button
        className="btn btn-outline-light my-2 my-sm-0 mr-10 mx-2"
        type="submit"
        onClick={handleMealsByIngredient}
      >
        Search
      </button>
    </form>
  );
}

IngredientInput.propTypes = {
  setOnNameIngredient: PropTypes.func.isRequired,
};
