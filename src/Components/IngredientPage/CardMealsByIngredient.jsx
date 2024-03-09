import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getIngredientsByName,
  getMealsByName,
} from '../../services/searchByIngredient';
import MealList from '../MealList/MealList';
import FiltersBox from '../FiltersBox/FiltersBox';
import SearchResultsInfo from '../SearchResultsInfo/SearchResultsInfo';

// Componente encargado de mostrar la lista de cards y filtrar las comidas
export default function CardMealsByIngredient({ nameIngredient }) {
  // Creamos un useState de la lista original que almacene las comidas
  const [mealList, setMealList] = useState([]);

  // Creamos otro useState que almacenará lo mismo que mealList pero como copia
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const onMealList = (plato) => {
    setMealList((currentMeals) => [...currentMeals, plato.meals[0]]);
    setListaFiltrada((currentMeals) => {
      const newListaFiltrada = [...currentMeals, plato.meals[0]];
      setResultsCount(newListaFiltrada.length);
      return newListaFiltrada;
    });
  };

  useEffect(() => {
    if (nameIngredient) {
      setMealList([]);
      setListaFiltrada([]);
      getIngredientsByName(nameIngredient).then((meals) => {
        if (meals.meals) {
          // Por cada array meals del objeto meals:
          meals.meals.forEach((meal) => {
            getMealsByName(meal.strMeal).then((plato) => {
              onMealList(plato);
              setSearchButtonClicked(true);
            });
          });
        }
      });
    }
  }, [nameIngredient]);

  const applyFilters = (
    categoriaSeleccionada,
    regionSeleccionada,
    etiquetaSelccionada,
  ) => {
    // hacemos una copia del array original y trabajamos con ella
    // setListaFiltrada([...listaOriginal]);
    let listaAux = [...mealList];
    /*  Aquí haremos las comprobaciones */
    if (categoriaSeleccionada !== '--') {
      listaAux = listaAux.filter(
        (item) => item.strCategory === categoriaSeleccionada,
      );
    }
    if (regionSeleccionada !== '--') {
      listaAux = listaAux.filter((item) => item.strArea === regionSeleccionada);
    }
    if (etiquetaSelccionada !== '--') {
      /* Para las etiqueta será distinto,pues hay varias etiquetas que puede tener una comida */
      // eslint-disable-next-line max-len
      listaAux = listaAux.filter((item) => {
        if (item.strTags) {
          return item.strTags
            .toUpperCase()
            .includes(etiquetaSelccionada.toUpperCase());
        }
        return false; // Devolver false si item.strTags no existe o es null
      });
    }
    /** Aquí hay duda!! como puedo volver a almacenar el array orignal??? */
    setListaFiltrada(listaAux);

    // una vez acabadas las comprobaciones insertaremos ese array
  };

  const resetFilters = (
    setCategoriaSeleccionada,
    setRegionSeleccionada,
    setEtiquetaSeleccionada,
  ) => {
    setListaFiltrada(mealList);
    setResultsCount(mealList.length);
    setCategoriaSeleccionada('--');
    setRegionSeleccionada('--');
    setEtiquetaSeleccionada('--');
  };

  return (
    <div>
      {resultsCount || nameIngredient ? (
        <>
          <div className="container">
            <FiltersBox
              // le voy a pasar la lisa original,
              // el seteador(para que imprima correctamente)
              // y además el metodo para cuando lo reseteen
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              className="w-75"
            />
            <SearchResultsInfo
              numResultados={resultsCount}
              searchButtonClicked={searchButtonClicked}
            />
          </div>
          <MealList mealsToPrint={listaFiltrada} />
        </>
      ) : (
        <SearchResultsInfo
          numResultados={resultsCount}
          searchButtonClicked={searchButtonClicked}
        />
      )}
    </div>
  );
}

CardMealsByIngredient.propTypes = {
  nameIngredient: PropTypes.string,
};

CardMealsByIngredient.defaultProps = {
  nameIngredient: '',
};
