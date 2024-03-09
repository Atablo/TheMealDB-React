import React, { useState } from 'react';
import IngredientInput from '../IngredientInput/IngredientInput';
import CardMealsByIngredient from '../CardMealsByIngredient/CardMealsByIngredient';

// Componente que se encarga de la busqueda por ingrediente
export default function SearchByIngredient() {
  // Creamos un useState que almacene el nombre del ingrediente introducido por el usuario
  const [ingredient, setIngredient] = useState();

  return (
    <div className="mx-auto">
      <div className="flex-column w-40">
        <div className="w-50 mx-auto">
          <div>
            <h1 className="text-center">
              Search a meal by it&apos;s ingredient
            </h1>
          </div>
          {/* Incluimos el componente IngredientInput pasandole el setIngredient del useState */}
          <IngredientInput onNameIngredientChange={setIngredient} />
        </div>
        {/* Incluimos el componente CardMealsByIngredient pasandole el ingredient del useState */}
        <CardMealsByIngredient nameIngredient={ingredient} />
      </div>
    </div>
  );
}
