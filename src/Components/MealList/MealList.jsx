import React from 'react';
import { PropTypes } from 'prop-types';
import Meal from '../Meal/Meal';

export default function MealList({ mealsToPrint }) {
  return (
    <div className="container">
      <div className="row d-flex">

        {mealsToPrint.map((meal) => (
          <div key={meal.id} className="col-md-6 mb-4">
            <Meal recipe={meal} />
          </div>
        ))}

      </div>
    </div>

  );
}

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
