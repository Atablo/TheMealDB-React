import React, { useState, useEffect } from 'react';
import { getAllIngredients } from '../../services/searchByIngredient';

export default function DatalistIngredients() {
  const [allIngredient, setAllIngredient] = useState([]);

  useEffect(() => {
    getAllIngredients().then((ingredients) => {
      setAllIngredient(ingredients.meals);
    });
  }, []);

  return (
    <datalist id="datalistOptions">
      {allIngredient.map((ingredient) => (
        <option key={ingredient.idIngredient} value={ingredient.strIngredient}>
          {' '}
        </option>
      ))}
    </datalist>
  );
}
