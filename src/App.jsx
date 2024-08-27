import React from 'react';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'; // No necesitas importar HashRouter aquí
import Error from './Components/Error/Error';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import MealDetails from './Components/MealDetails/MealDetails';
import SearchByIngredient from './Components/IngredientPage/SearchByIngredient/SearchByIngredient';
import SearchByName from './Components/SearchByName/SearchByName';
import IngredientRecipesPage from './Components/IngredientPage/IngredientRecipesPage/IngredientRecipesPage';

// Programa principal
function App() {
  return (
    <div className="App">
      <header>
        {/* Incluimos el componente Header */}
        <Header />
      </header>
      <Routes>
        {/* Redirige desde la raíz a la ruta /home */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* La ruta raíz será el componente Home */}
        <Route path="/home" element={<Home />} />
        {/* La ruta /searchByName incluirá el componente SearchByName */}
        <Route path="/searchByName" element={<SearchByName />} />
        {/* La ruta /searchByIngredient incluirá el componente SearchByIngredient */}
        <Route path="/searchByIngredient" element={<SearchByIngredient />} />
        {/* Esta ruta /meal/:id incluirá el componente MealDetails con su id correspondiente */}
        <Route path="/meal/:id" element={<MealDetails />} />
        {/* La ruta /ingredient-recipes/:ingredient incluirá el componente
        IngredientRecipesPage con el resultado de las comidas que contienen ese ingrediente */}
        <Route path="/ingredient-recipes/:ingredient" element={<IngredientRecipesPage />} />
        {/* Cualquier ruta introducida que no sea alguna de las de arriba
        informará al usuario de que la página no se ha encontrado */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
