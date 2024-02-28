import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Componentes/Home';
import SearchPage from './Componentes/SearchPage';
import Tacos from './Componentes/Tacos';
import TacoDetails from './Componentes/TacoDetails';
import Header from './Components/Header/Header';
import MealList from './Componentes/MealList';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/searchPage">SearchPage</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <p>Mi aplicación de react</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/searchByName" element={<SearchPage />} />
        <Route path="/tacos/:nombreDelTaco" element={<Tacos />}>
          <Route path="details" element={<TacoDetails />} />
        </Route>
        <Route
          path="*"
          element={(
            <h1>
              Lo sentimos!! no hemos encontrado la ruta que has especificado
            </h1>
          )}
        />
      </Routes>
      <MealList />
    </div>
  );
}

export default App;
