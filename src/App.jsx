import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Componentes/Home';
import SearchPage from './Componentes/SearchPage';
import Tacos from './Componentes/Tacos';
import TacoDetails from './Componentes/TacoDetails';
import Header from './Components/Header/Header';
import MealDetails from './Components/MealDetails/MealDetails';
import SearchByIngredient from './Components/IngredientPage/SearchByIngredient';
import SearchByName from './Components/SearchByName/SearchByName';
import IngredientRecipesPage from './Components/IngredientPage/IngredientRecipesPage';

// Programa principal
function App() {
  // Creamos un useState para almacenar el meal seleccionado
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Creamos una variable para gestionar la navegacion
  const navigate = useNavigate();

  // Manejador de clic en la tarjeta de la comida
  const handleMealClick = (meal) => {
    // Hacemos que selectedMeal sea la comida que recibe de MealDetails
    setSelectedMeal(meal);

    // Hacemos que la ruta sea /meal con su id correspondiente
    navigate(`/meal/${meal.idMeal}`);
  };

  return (
    <div className="App">
      <header>
        {/* Incluimos el componente Header */}
        <Header />
      </header>
      <Routes>
        {/* La ruta raiz será el componente Home */}
        <Route path="/" element={<Home />} />
        {/* Componente que lleva a una página de prueba (se puede borrar) */}
        <Route path="/searchPage" element={<SearchPage />} />
        {/* La ruta /searchByName incluirá el componente SearchByName */}
        <Route path="/searchByName" element={<SearchByName />} />
        {/* La ruta /searchByIngredient incluirá el componente SearchByIngredient */}
        <Route path="/searchByIngredient" element={<SearchByIngredient />} />
        {/* Esta ruta /meal/id incluirá el componente MealDetails con su id corresponiendte */}
        <Route
          path="/meal/:id"
          element={<MealDetails mealData={selectedMeal} />}
        />
        {/* La ruta /ingredient-recipes/ingredient incluirá el componente
        IngredientRecipesPage con el ingrediente correspondiente */}
        <Route
          path="/ingredient-recipes/:ingredient"
          element={<IngredientRecipesPage />}
        />
        {/* Componente que lleva a una página de prueba (se puede borrar) */}
        <Route path="/tacos/:idMeal/details" element={<TacoDetails />} />
        {/* Ruta que lleva a una página de prueba (se puede borrar) */}
        <Route
          path="/tacos/:nombreDelTaco"
          element={<Tacos onMealClick={handleMealClick} />}
        />
        {/* Cualquier ruta introducida que no sea alguna de las de arriba
        informará al usuario de que la página no se ha encontrado */}
        <Route
          path="*"
          element={(
            <h1>
              Lo sentimos!! no hemos encontrado la ruta que has especificado
            </h1>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
