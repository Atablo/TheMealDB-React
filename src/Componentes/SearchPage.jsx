import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  // esta sería la página donde yo saco todas las comidas que coincidan con el nombre y
  // Por cada una de ellas que me llegue tengo que hacer esto
  const tacos = [
    'pollo',
    'kebab',
    'cerdo',
    'salmon',
    'vegetarian',
    'vegan',

  ];
  return (
    <div>
      <h1>SearchPage</h1>
      <ul>
        {tacos.map((taco) => (
          <li key={taco}>
            <Link to={`/tacos/${taco}`}>{taco}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {tacos.map((taco) => (
          <li key={taco}>
            <Link to={`/tacos/${taco}`}>{taco}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {tacos.map((taco) => (
          <li key={taco}>
            <Link to={`/tacos/${taco}`}>{taco}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {tacos.map((taco) => (
          <li key={taco}>
            <Link to={`/tacos/${taco}`}>{taco}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {tacos.map((taco) => (
          <li key={taco}>
            <Link to={`/tacos/${taco}`}>{taco}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
