/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { getMealsByName } from '../../services/searchByName';
import MealList from '../MealList/MealList';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';
import FiltersBox from '../FiltersBox/FiltersBox';

export default function SearchByName() {
  const [formField, setFormField] = useState();
  const [listaOriginal, setListaOriginal] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const countResults = (results) => {
    if (results) { setResultsCount(results.length); } else { setResultsCount(0); }
  };

  const formFieldHandler = (event) => {
    setFormField(event.target.value);
  };
  const searchMealsByName = () => {
    getMealsByName(formField).then(
      (json) => {
        setListaOriginal(json.meals);
        setListaFiltrada(json.meals);
        countResults(json.meals);
        // esto es para poner lo de la búsqueda a true
        setSearchButtonClicked(true);
      },
    );
  };
  // numereo de los resultados
  useEffect(() => {
    setResultsCount(listaFiltrada.length);
  }, [listaFiltrada]);

  const applyFilters = (categoriaSeleccionada, regionSeleccionada, etiquetaSelccionada) => {
    // hacemos una copia del array original y trabajamos con ella
    // setListaFiltrada([...listaOriginal]);
    let listaAux = [...listaOriginal];
    /*  Aquí haremos las comprobaciones */
    if (categoriaSeleccionada !== '--') {
      listaAux = (listaAux.filter((item) => item.strCategory === categoriaSeleccionada));
    }
    if (regionSeleccionada !== '--') {
      listaAux = (listaAux.filter((item) => item.strArea === regionSeleccionada));
    }
    if (etiquetaSelccionada !== '--') {
      /* Para las etiqueta será distinto,pues hay varias etiquetas que puede tener una comida */
      // eslint-disable-next-line max-len
      listaAux = (listaAux.filter((item) => {
        if (item.strTags) {
          return item.strTags.toUpperCase().includes(etiquetaSelccionada.toUpperCase());
        }
        return false; // Devolver false si item.strTags no existe o es null
      }));
    }
    /** Aquí hay duda!! como puedo volver a almacenar el array orignal??? */
    setListaFiltrada(listaAux);
    // una vez acabadas las comprobaciones insertaremos ese array
  };

  const resetFilters = (setCategoriaSeleccionada, setRegionSeleccionada, setEtiquetaSeleccionada) => {
    setListaFiltrada(listaOriginal);
    setResultsCount(listaOriginal.length);
    setCategoriaSeleccionada('--');
    setRegionSeleccionada('--');
    setEtiquetaSeleccionada('--');
  };
  return (
    <>
      <div>
        <h1 className="text-center">Seach a meal by it&apos;s name</h1>
      </div>
      <div className="row w-75 mx-auto">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search by Name"
          onChange={formFieldHandler}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={searchMealsByName}
          aria-label="Search"
        >
          <p className="mb-0 fw-bold">Search <CiSearch /></p>

        </button>
      </div>

      <div className="container">
        {/* Esto es para que si existe algo más en la lista lo pinte */}
        {resultsCount
          ? (
            <>
              <FiltersBox
                // le voy a pasar la lisa original,
                // el seteador(para que imprima correctamente)
                // y además el metodo para cuando lo reseteen
                applyFilters={applyFilters}
                resetFilters={resetFilters}
              />
              <SearchResultsInfo
                numResultados={resultsCount}
                searchButtonClicked={searchButtonClicked}
              />
              <MealList mealsToPrint={listaFiltrada} />
            </>
          )
          : (
            <SearchResultsInfo
              numResultados={resultsCount}
              searchButtonClicked={searchButtonClicked}
            />
          )}
      </div>
    </>
  );
}
