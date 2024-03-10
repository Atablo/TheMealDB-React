import React from 'react';
import RamdomMealList from '../RandomMealList/RandomMealList';

// Componente que se encarga de mostrar la página de inicio al entrar a la app
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      {/* Incluimos el componente RandomMealList en la Home
      para que muestre las comidas aleatorias */}
      <RamdomMealList />
    </div>
  );
}
