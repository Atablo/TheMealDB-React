import React from 'react';
<<<<<<< HEAD
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Componentes/Home';
import SearchPage from './Componentes/SearchPage';
import Tacos from './Componentes/Tacos';
import TacoDetails from './Componentes/TacoDetails';
import Header from './Componentes/Header/Header';

=======
import { Route, Routes } from 'react-router-dom';
import Error from './Components/Error/Error';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import MealDetails from './Components/MealDetails/MealDetails';
import SearchByIngredient from './Components/IngredientPage/SearchByIngredient/SearchByIngredient';
import SearchByName from './Components/SearchByName/SearchByName';
import IngredientRecipesPage from './Components/IngredientPage/IngredientRecipesPage/IngredientRecipesPage';

// Programa principal
>>>>>>> origin/johnny
function App() {
  return (
    <div className="App">
      <header>
<<<<<<< HEAD
        <Header />
        <nav>
          <ul>
            <li><Link to="/searchPage">SearchPage</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </nav>
      </header>
      <p>Mi aplicación de react</p>

      {/* Esto de abajo no está "pintado,son solo indicaciones de las rutas" */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/tacos/:nombreDelTaco" element={<Tacos />}>
          <Route path="details" element={<TacoDetails />} />
        </Route>
        <Route path="*" element={<h1>Lo sentimos!! no hemos encontrado la ruta que has específicado</h1>} />
=======
        {/* Incluimos el componente Header */}
        <Header />
      </header>
      <Routes>
        {/* La ruta raiz será el componente Home */}
        <Route path="/" element={<Home />} />
        {/* La ruta /searchByName incluirá el componente SearchByName */}
        <Route path="/searchByName" element={<SearchByName />} />
        {/* La ruta /searchByIngredient incluirá el componente SearchByIngredient */}
        <Route path="/searchByIngredient" element={<SearchByIngredient />} />
        {/* Esta ruta /meal/id incluirá el componente MealDetails con su id corresponiendte */}
        <Route
          path="/meal/:id"
          element={<MealDetails />}
        />
        {/* La ruta /ingredient-recipes/ingredient incluirá el componente
        IngredientRecipesPage con el resultado de las comidas que contienen ese ingrediente */}
        <Route
          path="/ingredient-recipes/:ingredient"
          element={<IngredientRecipesPage />}
        />
        {/* Cualquier ruta introducida que no sea alguna de las de arriba
        informará al usuario de que la página no se ha encontrado */}
        <Route
          path="*"
          element={<Error />}
        />
>>>>>>> origin/johnny
      </Routes>
    </div>
  );
}

export default App;
