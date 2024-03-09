import PropTypes from 'prop-types';
import React from 'react';
import './SearchResultsInfo.css';

export default function SearchResultsInfo({ numResultados, searchButtonClicked }) {
  /* Aqui lo que pretendo hacer es un condicional de 3 opciones,
  para que al inicio no me muestre ningún mensaej */
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
  } return null;
}

SearchResultsInfo.propTypes = {
  numResultados: PropTypes.number.isRequired,
  searchButtonClicked: PropTypes.bool.isRequired,
};
