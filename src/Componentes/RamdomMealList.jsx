import React, { useEffect, useState } from 'react';
import { showRandomMeals } from '../services/searchByIngredient';
import '../Components/Meal/Meal.css';
import MealList from '../Components/MealList/MealList';

export default function RamdomMealList() {
  const [recipes, setRecipes] = useState([]); // Estado para almacenar los platos de comida

  useEffect(() => {
    const fetchRandomMeals = async () => {
      const promises = [];
      for (let i = 0; i < 8; i += 1) {
        promises.push(showRandomMeals());
      }
      const meals = await Promise.all(promises);
      const randomMeals = meals.map((meal) => meal.meals[0]);
      setRecipes(randomMeals);
    };

    fetchRandomMeals();
  }, []);

  return (
    <div className="bg-img">
      <div className="container">
        <div className="row">
          <MealList mealsToPrint={recipes} />
        </div>
      </div>
    </div>
  );
}
