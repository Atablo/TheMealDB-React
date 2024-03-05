import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getIngredientsByName,
  getMealsByName,
} from '../../services/searchByIngredient';
import MealList from '../MealList/MealList';

export default function CardMealsByIngredient({ nameIngredient }) {
  const [mealList, setMealList] = useState([]);

  // useEffect(() => {
  //   if (nameIngredient) {
  //     getIngredientsByName(nameIngredient).then((meals) => {
  //       // Por cada array meals del objeto meals:

  //       setCardMeals(meals.meals);

  //       console.log(meals.meals);
  //     });
  //   }
  // }, [nameIngredient]);

  const onMealList = (plato) => {
    setMealList((currentMeals) => [...currentMeals, plato.meals[0]]);
  };

  useEffect(() => {
    if (nameIngredient) {
      setMealList([]);
      getIngredientsByName(nameIngredient).then((meals) => {
        // Por cada array meals del objeto meals:
        meals.meals.forEach((meal) => {
          getMealsByName(meal.strMeal).then((plato) => {
            onMealList(plato);
          });
        });
      });
    }
  }, [nameIngredient]);

  return <div>{nameIngredient && <MealList mealsToPrint={mealList} />}</div>;
}

CardMealsByIngredient.propTypes = {
  nameIngredient: PropTypes.string,
};

CardMealsByIngredient.defaultProps = {
  nameIngredient: '',
};
