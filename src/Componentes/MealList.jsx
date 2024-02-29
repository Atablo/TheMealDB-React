import React, { useEffect, useState } from 'react';
import Card from '../Components/Meal/Meal';
import { showRandomMeals } from '../services/searchByIngredient';
import '../Components/Meal/Meal.css';

export default function MealList() {
  const [recipes, setRecipes] = useState([]); // Estado para almacenar los platos de comida

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const fetchedRecipes = [];
        const promises = Array.from({ length: 8 }, async (_, i) => {
          try {
            const response = await showRandomMeals();
            // Llama a la funcion para obtener platos de comida aleatorios
            const mealData = response.meals ? response.meals[0] : null;

            if (mealData) {
              fetchedRecipes.push({ id: i, data: mealData });
              // Almacena la informacion del plato de comida
            }
          } catch (error) {
            console.error(`Error fetching random recipe ${i + 1}:`, error);
          }
        });
        await Promise.all(promises);

        setRecipes(fetchedRecipes); // Actualiza el estado con los platos de comida obtenidos
      } catch (error) {
        console.error('Error fetching random recipes:', error);
      }
    };

    fetchRandomRecipes();
    // Llama a la funcion para obtener platos de comida al montar el componente
  }, []); // El efecto se ejecuta solo en el montaje del componente

  return (
    <div className="bg-img">
      <div className="container">

        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-6 mb-4">
              <Card recipe={recipe.data} /> {/* Renderiza el componente Card con
                 la información del plato de comida */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
