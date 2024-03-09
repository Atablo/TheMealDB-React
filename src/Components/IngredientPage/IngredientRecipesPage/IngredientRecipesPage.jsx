import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MealList from '../../MealList/MealList';
import { getIngredientsByName, getMealsByName } from '../../../services/searchByIngredient';

// Componente encargado de mostrar la página de las comidas que contienen un ingrediente en concreto
function IngredientRecipesPage() {
  // Creamos una variable que extrae el parametro del ingrediente de la URL
  const { ingredient } = useParams();
  // Creamos un useState que almacene una lista de comidas del ingrediente
  const [detailedRecipes, setDetailedRecipes] = useState([]);

  // Creamos un useState
  useEffect(() => {
    // Creamos una función asíncrona
    const fetchDetailedRecipes = async () => {
      try {
        // Creamos una variable que almacene la lista de comidas que contenga ese ingrediente
        const data = await getIngredientsByName(ingredient);

        // Si la lista no se encuentra vacia:
        if (data.meals) {
          // Creamos una variable que espere a que se almacenen todas las promesas
          const detailedRecipesData = await Promise.all(
            // Mapeamos la lista de comidas
            data.meals.map(async (recipe) => {
              try {
                // Para cada receta, obtenemos la comida con detalles
                // más específicos por el nombre de la comida
                const detailData = await getMealsByName(recipe.strMeal);
                // Si la lista de meals no está vacia,
                // devolvemos la comida de la lista; de lo contrario, null.
                return detailData.meals ? detailData.meals[0] : null;
              } catch (detailError) {
                // En caso de error al buscar los detalles de una
                // receta, se muestra el error al usuario
                console.error(`Error fetching details for recipe ${recipe.strMeal}:`, detailError);
                return null;
              }
            }),
          );

          // Creamos una variable para filtrar las recetas y eliminar aquellas que no tengan comidas
          const filteredDetailedRecipes = detailedRecipesData.filter((recipe) => recipe !== null);
          // Hacemos que detailedRecipes sea igual a filteredDetailedRecipes
          setDetailedRecipes(filteredDetailedRecipes);
        }
      } catch (fetchError) {
        console.error('Error fetching recipes:', fetchError);
      }
    };

    // Ejecutamos la función
    fetchDetailedRecipes();
  }, [ingredient]);

  return (
    <div className="container">
      <div className="row flex-wrap justify-content-center m-2 mt-4">
        <h4 className="card-title mb-4 bg-info-subtle rounded-2 p-2 text-center">
          {/* Mostramos el texto con el ingrediente de la URL */}
          Related Recipes for {ingredient}
        </h4>
        {/* Si la lista de comidas fltrada no está vacia incluimos
        el componente MealList pasandole la lista de comidas */}
        {detailedRecipes.length > 0 && <MealList mealsToPrint={detailedRecipes} />}
      </div>
    </div>
  );
}

export default IngredientRecipesPage;
