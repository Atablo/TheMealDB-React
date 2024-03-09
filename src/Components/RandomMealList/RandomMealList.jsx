import React, { useEffect, useState } from 'react';
import { showRandomMeals } from '../../services/Async Functions/AsyncFunctions';
import MealList from '../MealList/MealList';

export default function RamdomMealList() {
  const [recipes, setRecipes] = useState([]); // Estado para almacenar los platos de comida

  // Hacemos una función asíncrona con arrow function
  const fetchRandomMeals = async () => {
    // Creamos un array vacio que almacenará las promesas
    const promises = [];
    // Hacemos un bucle que itera 8 veces
    for (let i = 0; i < 8; i += 1) {
      // Agregamos los ingredientes aleatorios al array creado anteriormente
      promises.push(showRandomMeals());
    }
    // Creamos una variable que espere a que se almacenen todas las promesas
    const meals = await Promise.all(promises);
    // Creamos otra variable que almacenará el objeto devuelto de las promesas
    const randomMeals = [];

    // Por cada objeto de la lista de meals:
    meals.forEach((meal) => {
      // Agregamos el objeto a nuestra variable de randomMeals
      randomMeals.push(meal.meals[0]);
    });

    // Hacemos un setRecipes de randomMeals para que
    // actualice el estado y renderize la nueva información
    setRecipes(randomMeals);
  };

  // useEffect que se ejecuta cuando el componente se monta la primera vez
  useEffect(() => {
    // Ejecutamos la función fetchRandomMeals() para que realice todo lo dicho anteriormente
    fetchRandomMeals();
  }, []);

  return (
    <div className="bg-img">
      <div className="container">
        <div className="row">
          {/* Llamamos al componente MealList pasandole la lista de meals a imprimir */}
          <MealList mealsToPrint={recipes} />
        </div>
      </div>
    </div>
  );
}
