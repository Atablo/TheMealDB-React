import React, { useState } from 'react';
import IngredientInput from './IngredientInput';
import CardMealsByIngredient from './CardMealsByIngredient';

export default function SearchByIngredient() {
  const [onNameIngredient, setOnNameIngredient] = useState();

  return (
    <div className="w-75 mx-auto">
      <div className="flex-column w-40 py-2">
        <IngredientInput setOnNameIngredient={setOnNameIngredient} />
        <CardMealsByIngredient onNameIngredient={onNameIngredient} />
      </div>
    </div>
  );
}
