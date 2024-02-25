import React from 'react';
import { useParams } from 'react-router-dom';

export default function TacoDetails() {
  const { nombreDelTaco } = useParams();
  return (
    <div>
      <h1>
        Detalles del  taco:
        {' '}
        {nombreDelTaco}
      </h1>
    </div>
  );
}
