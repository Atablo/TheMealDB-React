import PropTypes from 'prop-types';
import React from 'react';
import './SearchResultsInfo.css';

export default function SearchResultsInfo({ numResultados, searchButtonClicked }) {
  /* Aqui lo que pretendo hacer es un condicional de 3 opciones,
  para que al inicio no me muestre ningún mensaej */
  if (numResultados > 0 && searchButtonClicked) {
    return (
      <div className="infoPanel success">
        <p>Número de resultados: {numResultados}</p>
      </div>
    );
  }
  if (numResultados === 0 && searchButtonClicked) {
    return (
      <div className="infoPanel error">
        <p>No se encontraron resultados</p>
      </div>
    );
  } return null;
}

SearchResultsInfo.propTypes = {
  numResultados: PropTypes.number,
  searchButtonClicked: PropTypes.bool,
};

SearchResultsInfo.defaultProps = {
  numResultados: '',
  searchButtonClicked: '',
};
