import React from 'react';
import { PropTypes } from 'prop-types';
import Meal from '../Meal/Meal';

/* componente encargado de renderizar el listado de comidas */

export default function MealList({ mealsToPrint }) {
  /* Retornaremos un container con un div */
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {/* Ahora vamos a construir cada columna con su componente
        correspondiente de Meal(asociada a la columna) */}
        {mealsToPrint.map((meal) => (
          <div key={meal.idMeal} className="col-md-6 mb-4">
            <Meal recipe={meal} />
          </div>
        ))}
      </div>
    </div>
  );
}
/* Ponemos los propTypes indicando los parámetros que le pasamos que consisten en MealsToPrint */
MealList.propTypes = {
  mealsToPrint: PropTypes.arrayOf(
    PropTypes.shape({
      strSource: PropTypes.string,
      strMealThumb: PropTypes.string,
      strMeal: PropTypes.string,
      strCategory: PropTypes.string,
      strArea: PropTypes.string,
      strAreaThumb: PropTypes.string,
      strTags: PropTypes.string,
      idMeal: PropTypes.string.isRequired,
    }),
  ).isRequired, // Asegura que mealsToPrint sea un array y sea obligatorio
};
