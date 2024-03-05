import React, { useState } from 'react';
import {
  Route, Routes, useNavigate,
} from 'react-router-dom';
import Home from './Componentes/Home';
import SearchPage from './Componentes/SearchPage';
import Tacos from './Componentes/Tacos';
import TacoDetails from './Componentes/TacoDetails';
import Header from './Components/Header/Header';
import MealDetails from './Components/MealDetails/MealDetails';
import SearchByIngredient from './Components/IngredientPage/SearchByIngredient';
import SearchByName from './Componentes/SearchByName';

function App() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();

  // Manejador de clic en la tarjeta de la comida
  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    navigate(`/meal/${meal.idMeal}`);
  };

  return (
    <div className="App">
      <header>
        <Header />

      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/searchByName" element={<SearchByName />} />
        <Route path="/searchByIngredient" element={<SearchByIngredient />} />
        <Route
          path="/meal/:id"
          element={<MealDetails mealData={selectedMeal} />}
        />
        <Route path="/tacos/:idMeal/details" element={<TacoDetails />} />
        <Route path="/tacos/:nombreDelTaco" element={<Tacos onMealClick={handleMealClick} />} />
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
