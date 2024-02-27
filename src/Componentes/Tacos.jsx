/* eslint-disable no-trailing-spaces */
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

export default function Tacos() {
  // eslint-disable-next-line max-len
  // con esto le meteré al taco  el nombre y la descripción que me pasen por la url,se tiene que llamar igual qu een la ruta
  // porque basicamente lo estamos cogiendo de la url
  const { nombreDelTaco } = useParams();
  return (
    <div>
      <h1>Tacos</h1>
      <p>
        Taco de  {nombreDelTaco}
      </p>
      {/* esto es para que me preserve la url anterior */}
      <Outlet />
      <Link to="details">Ver detalles</Link>

    </div>
  );
}
