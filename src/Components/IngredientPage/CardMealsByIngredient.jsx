import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getIngredientsByName } from '../../services/searchByIngredient';

export default function CardMealsByIngredient({ onNameIngredient }) {
  const [cardMeals, setCardMeals] = useState([]);

  useEffect(() => {
    getIngredientsByName(onNameIngredient).then((meals) => {
      // Por cada array meals del objeto meals:

      setCardMeals(meals.meals);
    });
  }, [onNameIngredient]);

  return (
    <div>
      {onNameIngredient
        && cardMeals.map((meal) => <li key={meal.idMeal}>{meal.strMeal}</li>)}
    </div>
  );
}

CardMealsByIngredient.propTypes = {
  onNameIngredient: PropTypes.string,
};

CardMealsByIngredient.defaultProps = {
  onNameIngredient: '',
};
