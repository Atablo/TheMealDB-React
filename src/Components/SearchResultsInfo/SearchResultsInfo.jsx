import PropTypes from 'prop-types';
import React from 'react';
import './SearchResultsInfo.css';

export default function SearchResultsInfo({ numResultados }) {
  return (

    numResultados === 0 ? (
      <div className="infoPanel error">
        <p>No se encontraron resultados</p>
      </div>
    ) : (
      <div className="infoPanel success">
        <p>Número de resultados: {numResultados}</p>
      </div>
    )
  );
}
SearchResultsInfo.propTypes = {
  numResultados: PropTypes.number.isRequired,
};
