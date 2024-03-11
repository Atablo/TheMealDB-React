import React from 'react';
import RamdomMealList from '../RandomMealList/RandomMealList';

// Componente que se encarga de mostrar la página de inicio al entrar a la app
export default function Home() {
  return (
    <div>
      <div className="container">
        <div className="row flex-wrap justify-content-center m-2 mt-4">
          <h4 className="card-title mb-4 bg-info-subtle rounded-2 p-2 text-center">
            {/* Mostramos el texto con el ingrediente de la URL */}
            Welcome to the biggest food database!!
          </h4>
        </div>
      </div>
      {/* Incluimos el componente RandomMealList en la Home
      para que muestre las comidas aleatorias */}
      <RamdomMealList />
    </div>
  );
}
