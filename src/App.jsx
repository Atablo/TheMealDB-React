import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Componentes/Home';
import SearchPage from './Componentes/SearchPage';
import Tacos from './Componentes/Tacos';
import TacoDetails from './Componentes/TacoDetails';
import Header from './Components/Header/Header';
import SearchByIngredient from './Components/IngredientPage/SearchByIngredient';
import Meal from './Components/Meal/Meal';
import SearchByName from './Components/SearchByName/SearchByName';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      {/* Esto de abajo no está "pintado,son solo indicaciones de las rutas" */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/searchByName" element={<SearchByName />} />
        <Route path="/searchByIngredient" element={<SearchByIngredient />} />
        <Route path="/meal/:id" element={<Meal />} />
        <Route path="/tacos/:nombreDelTaco" element={<Tacos />}>
          <Route path="details" element={<TacoDetails />} />
        </Route>
        <Route
          path="*"
          element={(
            <h1>
              Lo sentimos!! no hemos encontrado la ruta que has específicado
            </h1>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
