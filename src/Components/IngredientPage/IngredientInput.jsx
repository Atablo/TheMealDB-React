import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatalistIngredients from './DatalistIngredients';

// Componente encargado del input del SearchByIngredient recibiendo el setIngredient del padre
export default function IngredientInput({ onNameIngredientChange }) {
  // useState para guardar el nombre del ingrediente introducido por el usuario
  const [nameIngredient, setNameIngredient] = useState('');
  // useState para almacenar el mensaje de error
  const [mensajeError, setMensajeError] = useState('');

  // Función que recoge los datos cuando el usuario hace clic en el boton
  const handleMealsByIngredient = (e) => {
    e.preventDefault();

    // En caso de que el campo esté vacio:
    if (!nameIngredient) {
      // El error será que no ha rellenado el campo
      setMensajeError('Introduce an ingredient');
    } else {
      // Sino, vaciamos el mensaje de error
      setMensajeError('');

      // Y le pasamos el nombre de ingrediente al padre
      onNameIngredientChange(nameIngredient);
    }
  };

  return (
    <form action="#" className="d-flex my-lg-0 py-5" id="searchByIngredient">
      {/* Creamos un onBlur para que cuando el usuario salga del
      formulario capture el nombre del ingrediente introducido */}
      <input
        className="form-control text-center"
        type="text"
        list="datalistOptions"
        placeholder="Search a meal by an ingredient"
        id="nombreIngrediente"
        onBlur={(e) => setNameIngredient(e.target.value)}
      />
      {/* Creamos un párrafo para mostrar el mensaje de error */}
      <p className="error-feedback text-danger p-0 mb-0">{mensajeError}</p>
      {/* Incluimos el componente DatalistIngredient con el id relacionado al input */}
      <DatalistIngredients id="datalistOptions" />
      {/* Cremos un onClick para controlar cuando se pulsa el botón y lo que tiene que hacer */}
      <button
        className="btn btn-success my-2 my-sm-0 mr-10 mx-2"
        type="submit"
        onClick={handleMealsByIngredient}
      >
        Search
      </button>
    </form>
  );
}

// Ponemos los propTypes indicando que el parametro onNameIngredientChange es obligatorio
IngredientInput.propTypes = {
  onNameIngredientChange: PropTypes.func.isRequired,
};
