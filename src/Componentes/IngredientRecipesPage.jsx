import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MealList from '../Components/MealList/MealList';
import { getIngredientsByName, getMealsByName } from '../services/searchByIngredient';

function IngredientRecipesPage() {
  const { ingredient } = useParams();
  const [detailedRecipes, setDetailedRecipes] = useState([]);

  useEffect(() => {
    const fetchDetailedRecipes = async () => {
      try {
        const data = await getIngredientsByName(ingredient);

        if (data.meals) {
          const detailedRecipesData = await Promise.all(
            data.meals.map(async (recipe) => {
              try {
                const detailData = await getMealsByName(recipe.strMeal);
                return detailData.meals ? detailData.meals[0] : null;
              } catch (error) {
                console.error(`Error fetching details for meal ${recipe.strMeal}:`, error);
                return null;
              }
            }),
          );

          const filteredDetailedRecipes = detailedRecipesData.filter((recipe) => recipe !== null);
          setDetailedRecipes(filteredDetailedRecipes);
        }
      } catch (error) {
        console.error('Error fetching related recipes:', error);
      }
    };

    fetchDetailedRecipes();
  }, [ingredient]);

  return (
    <div className="container">
      <div className="row flex-wrap justify-content-center m-2 mt-4">
        <h4 className="card-title mb-4 bg-info-subtle rounded-2 p-2 text-center">Related Recipes for {ingredient}</h4>
        {detailedRecipes.length > 0 && (
        <MealList mealsToPrint={detailedRecipes} />
        )}
      </div>
    </div>
  );
}

export default IngredientRecipesPage;
