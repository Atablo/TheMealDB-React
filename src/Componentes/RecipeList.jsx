import React, { useEffect, useState } from 'react';
import Card from '../Components/Meal/Meal';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const fetchedRecipes = [];

        const promises = Array.from({ length: 8 }, async (_, i) => {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
          const data = await response.text();
          fetchedRecipes.push({ id: i, data });
        });

        await Promise.all(promises);

        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching random recipes:', error);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-6 mb-4">
            <Card recipe={recipe.data} />
          </div>
        ))}
      </div>
    </div>
  );
}
