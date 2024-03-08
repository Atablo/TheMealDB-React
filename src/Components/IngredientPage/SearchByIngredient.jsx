import React, { useState } from 'react';
import IngredientInput from './IngredientInput';
import CardMealsByIngredient from './CardMealsByIngredient';

export default function SearchByIngredient() {
  const [ingredient, setIngredient] = useState();

  return (
    <div className="mx-auto">
      <div className="flex-column w-40 py-2">
        <div className="w-75 mx-auto">
          <IngredientInput onNameIngredientChange={setIngredient} />
        </div>
        <CardMealsByIngredient nameIngredient={ingredient} />
      </div>
    </div>
  );
}
