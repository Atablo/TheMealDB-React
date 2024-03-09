/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { getMealsByName } from '../../services/searchByName';
import MealList from '../MealList/MealList';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';
import FiltersBox from '../FiltersBox/FiltersBox';

export default function SearchByName() {
  /* Ahora vamos a declarar a continuación todos los useState necesarios
  para el funcionamiento de este componente */
  /* El useState que maneja el estado del formulario */
  const [formField, setFormField] = useState();
  /* El useState con el que rellenaremos un p en caso de que el usuario
  no haya introducido nada */
  const [formEmptyError, setFormEmptyError] = useState('');
  /* Aquí creamos el array de la lista original que es la que obtenemos de hacer la consulta
  a la api */
  const [listaOriginal, setListaOriginal] = useState();
  /** Aquí haremos la lista filtrada que en un principio será una copia de la lista original */
  const [listaFiltrada, setListaFiltrada] = useState([]);
  /** Este es un useState utilizado para guardar el número de resultado que hemos obtenido */
  const [resultsCount, setResultsCount] = useState(0);
  /** Este es un estado para indicar si se ha pulsado el botón */
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  /** Esta es la función que cuenta resultados, si existe algun resultado entonces establecera
   * el contador de resultados a la longitud del mismo ,si no estableceremos el contador a 0
   */
  const countResults = (results) => {
    if (results) { setResultsCount(results.length); } else { setResultsCount(0); }
  };

  /** Aquí hacemos el manejador del formulario donde el usuario escribirá y actualizamos
   * el useState relativo al formulario
   */
  const formFieldHandler = (event) => {
    setFormField(event.target.value);
  };
  /** Aquí hacemos el searchMealsByName */
  const searchMealsByName = () => {
    /* Si el campo de texto no está vacío entonces vamos a vaciar la variable que  iría dentro de la p */
    if (formField) {
      setFormEmptyError('');
      /* Y además realizamos la búsqueda */
      getMealsByName(formField).then(
        (json) => {
          /** Una vez realizada la búsqueda
           *  establecemos el useState de la lista original
           *  y también la lista filtrada, la establecemos igual que la original.
           *
           */
          setListaOriginal(json.meals);
          setListaFiltrada(json.meals);
          countResults(json.meals);
          // esto es para poner lo de la búsqueda a true
          setSearchButtonClicked(true);
        },
      );
    } else {
      /* Si no hay ningún valor en el input le ponemos un mennsaje en el p */
      setFormEmptyError('You did not introduce a meal name.Try again please');
    }
  };
  /* ahora cada vez que cambiemos la lista filtrada establecemos el contador a longitud
      de la lista filtrada,si no tiene nada esta lista le ponemos a 0,cuando cambie la lista
      filtrada volveremos a actualizar el valor del resultsCount */
  useEffect(() => {
    if (listaFiltrada) {
      setResultsCount(listaFiltrada.length);
    } else {
      setResultsCount(0);
    }
  }, [listaFiltrada]);

  const applyFilters = (categoriaSeleccionada, regionSeleccionada, etiquetaSelccionada) => {
    // hacemos una copia del array original y trabajamos con ella
    let listaAux = [...listaOriginal];
    /*  Aquí haremos las comprobaciones filtrando por categoría,por region y etiqueta  */
    if (categoriaSeleccionada !== '--') {
      listaAux = (listaAux.filter((item) => item.strCategory === categoriaSeleccionada));
    }
    if (regionSeleccionada !== '--') {
      listaAux = (listaAux.filter((item) => item.strArea === regionSeleccionada));
    }
    if (etiquetaSelccionada !== '--') {
      /* Para las etiqueta será distinto,pues hay varias etiquetas que puede tener una comida */
      listaAux = (listaAux.filter((item) => {
        /* si el item tiene etiquetas comprobamos si contiene la eiqueta que ha selecionado y retornamos
        si es o no igual  */
        if (item.strTags) {
          return item.strTags.toUpperCase().includes(etiquetaSelccionada.toUpperCase());
        }
        return false; // Devolver false si item.strTags no existe o es null
      }));
    }
    /** establecemos la lista filtrada a ese array que hemos filtrado */
    setListaFiltrada(listaAux);
  };

  /* resetFilters sirve para que el hijo(filtersBox) le pase los seter de categoría,región y etiqueta */
  const resetFilters = (setCategoriaSeleccionada, setRegionSeleccionada, setEtiquetaSeleccionada) => {
    /* establecemos la lista filtrada  a la lista original para que me pinte la lisa que me ha salido
    limpia de la búsqueda */
    setListaFiltrada(listaOriginal);
    /* también volvemos a resetear la longitud de los resultados mostrados */
    setResultsCount(listaOriginal.length);
    /* Y establecemos todos los campos del formulario a su valor inicial */
    setCategoriaSeleccionada('--');
    setRegionSeleccionada('--');
    setEtiquetaSeleccionada('--');
  };
  /* Hacemos aquí el manejador de evenos,de modo qu esi pulsan el botón enter también busque al hacer enter */
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      searchMealsByName();
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center">Search a meal by it&apos;s name</h1>
      </div>
      <div className="row container mx-auto w-50 rounded justify-content-center">
        {/* En el input onemos el onChange para ir almacenando siempre el valor
          y el onKeyUp para manejar el evento si la tecla es enter */}
        <input
          type="text"
          className="w-50 me-1 rounded-left"
          name=""
          id=""
          placeholder="Search by Name"
          onChange={formFieldHandler}
          onKeyUp={handleKeyUp}
        />
        {/* También manejamos el evento de click para que busque */}
        <button
          type="button"
          className="btn btn-primary w-25 rounded-left"
          onClick={searchMealsByName}
          aria-label="Search"
        >
          {/* Este es el icono de la lupa */}
          <p className="mb-0 fw-bold rounded-right">Search <CiSearch /></p>

        </button>
      </div>
      <div className="container">
        {/* Esto es para que si existe algo en la lista renderice una cosa y si no
        otra */}

        {(listaOriginal ? (
          <>
            {/* Como tal,si existe algo dentro de la lista le ponemos el mensaje */}
            <p className="text-danger text-center">{formEmptyError}</p>
            <FiltersBox
            /* Le paso la función de aplicar filtros,el resetear filtros, el contador de Resultados y
            el resetar filtros */
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              countResults={countResults}
              className="w-75"
            />
            {/* Imprimimos también el número de los resultados obtenidos */}
            <SearchResultsInfo
              numResultados={resultsCount}
              searchButtonClicked={searchButtonClicked}
            />
            {/* E imprimimos la lista filtrada */}
            <MealList mealsToPrint={listaFiltrada} />
          </>
        ) : (
          <>
            {/* Si no hemos obtenido ningún resultado establecemos el mensaje de error
            (que no estará vacío) y lo imprimimos,junto con el resutls info */}
            <p className="text-danger text-center">{formEmptyError}</p>
            <SearchResultsInfo
              numResultados={resultsCount}
              searchButtonClicked={searchButtonClicked}
            />
          </>
        ))}

      </div>
    </>
  );
}
