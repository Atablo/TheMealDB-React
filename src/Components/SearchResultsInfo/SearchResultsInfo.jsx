import PropTypes from 'prop-types';
import React from 'react';
import './SearchResultsInfo.css';

export default function SearchResultsInfo({
  numResultados,
  searchButtonClicked,
}) {
  /* Aqui lo que pretendo hacer es un condicional de 3 opciones,
  para que al inicio no me muestre ningún mensaje,cuando haya pulsado un botón
  y no haya resultados muestre otro distinto y por último si no se dan esas opciones
  devuelvo null para no pintar nada */
  if (numResultados > 0 && searchButtonClicked) {
    return (
      <div className="infoPanel--success mx-auto my-3 w-100">
        <p className="my-0 fs-5">Results number: {numResultados}</p>
      </div>
    );
  }
  if (numResultados === 0 && searchButtonClicked) {
    return (
      <div className="infoPanel--error mx-auto my-3 w-100">
        <p className="my-0 fs-5">No results found</p>
      </div>
    );
  }
  return null;
}
/* Aquí pongo la declaración de propType */
SearchResultsInfo.propTypes = {
  numResultados: PropTypes.number.isRequired,
  searchButtonClicked: PropTypes.bool.isRequired,
};
