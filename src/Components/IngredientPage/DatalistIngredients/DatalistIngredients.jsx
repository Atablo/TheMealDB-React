import React, { useState, useEffect } from 'react';
import { getAllIngredients } from '../../../services/Async Functions/AsyncFunctions';

// Componente hijo encargado de mostrar las sugerencias de los ingredientes que hay en el input
export default function DatalistIngredients() {
  // Creamos un useState que almacene el nombre de todos los ingredientes
  const [allIngredient, setAllIngredient] = useState([]);

  // Creamos un useEffect que se ejecuta solo la primera vez que se monta el componente
  useEffect(() => {
    // Obtenemos todos los ingredientes y el resultado
    getAllIngredients().then((ingredients) => {
      // Guardamos todos los nombres en el useState allIngredient
      setAllIngredient(ingredients.meals);
    });
  }, []);

  return (
    <datalist id="datalistOptions">
      {/* Mapeamos la lista de los nombres de los ingredientes y para cada uno: */}
      {allIngredient.map((ingredient) => (
        /* Mostramos una opción por cada ingrediente con su key y value */
        <option key={ingredient.idIngredient} value={ingredient.strIngredient}>
          {' '}
        </option>
      ))}
    </datalist>
  );
}
