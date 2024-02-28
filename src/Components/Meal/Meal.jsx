import React from 'react';
import { useParams } from 'react-router-dom';

export default function Meal() {
  const { id } = useParams();

  return (
    <div>Meal {id}</div>
  );
}
