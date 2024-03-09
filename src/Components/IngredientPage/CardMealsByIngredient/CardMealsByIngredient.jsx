import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getIngredientsByName,
  getMealsByName,
} from '../../../services/searchByIngredient';
import MealList from '../../MealList/MealList';
import FiltersBox from '../../FiltersBox/FiltersBox';
import SearchResultsInfo from '../../SearchResultsInfo/SearchResultsInfo';

// Componente encargado de mostrar la lista de cards y filtrar las comidas
export default function CardMealsByIngredient({ nameIngredient }) {
  // Creamos un useState de la lista original que almacene las comidas
  const [mealList, setMealList] = useState([]);

  // Creamos otro useState que almacenará lo mismo que mealList pero como copia
  const [listaFiltrada, setListaFiltrada] = useState([]);
  // Creamos un useState para contar el numero de resultados
  const [resultsCount, setResultsCount] = useState(0);
  // Creamos un useState para comprobar si se ha clickado el botón de búsqueda
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  // Creo una función que le paso una comida
  const onMealList = (plato) => {
    // Hacemos que el mealList contenga los meals desestructurados, mas la comida actual
    setMealList((currentMeals) => [...currentMeals, plato.meals[0]]);
    // Repetimos el proceso con la listaFiltrada
    setListaFiltrada((currentMeals) => {
      // Creamos una variable que almacene los meals desestructurados, mas la comida actual
      const newListaFiltrada = [...currentMeals, plato.meals[0]];
      // Hacemos que el resultsCount sea igual al numero de comidas que haya
      setResultsCount(newListaFiltrada.length);
      // Devolvemos la nueva listaFiltrada para que sea listaFiltrada
      return newListaFiltrada;
    });
  };

  // Hacemos un useEffect que se ejecute cuando cambie el nombre del ingrediente
  useEffect(() => {
    // Si el nombre del ingrediente introducido no está vacio
    if (nameIngredient) {
      // Vaciamos el mealList
      setMealList([]);
      // Vaciamos la listaFiltrada
      setListaFiltrada([]);

      // Obtenemos todos las comidas con ese ingrediente
      getIngredientsByName(nameIngredient).then((meals) => {
        // Si el array de meals no está vacio:
        if (meals.meals) {
          // Por cada array meals del objeto meals:
          meals.meals.forEach((meal) => {
            // Obtenemos todos las comidas con datos de la comida concreta
            getMealsByName(meal.strMeal).then((plato) => {
              // LLamamos a la funcion onMealList pasandole la comida
              onMealList(plato);
              // Cambiamos searchButtonClicked a true
              setSearchButtonClicked(true);
            });
          });
          // Si el array de meals se encuentra vacio:
        } else {
          // Cambiamos searchResultsCount a 0
          setResultsCount(0);
          // Y searchButtonClicked a true
          setSearchButtonClicked(true);
        }
      });
    }
  }, [nameIngredient]);

  // Creamos una funcion para aplicar filtros que recibe la categoriaSeleccionada,
  // regionSeleccionada y etiquetaSelccionada
  const applyFilters = (
    categoriaSeleccionada,
    regionSeleccionada,
    etiquetaSelccionada,
  ) => {
    // hacemos una copia del array original y trabajamos con ella
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
      listaAux = listaAux.filter((item) => {
        // En caso de que tenga tags
        if (item.strTags) {
          // Devolvemos los tags pasados en mayusculas y que coincidan con la seleccionada
          return item.strTags
            .toUpperCase()
            .includes(etiquetaSelccionada.toUpperCase());
        }
        return false; // Devolver false si item.strTags no existe o es null
      });
    }
    // Una vez hayamos hecho todas las comprobaciones con los filtros lo igualamos a listaFiltrada,
    // una vez acabadas las comprobaciones insertaremos ese array
    setListaFiltrada(listaAux);
  };

  // Creamos una variable que reinicie los filtros pasandole los valores
  const resetFilters = (
    setCategoriaSeleccionada,
    setRegionSeleccionada,
    setEtiquetaSeleccionada,
  ) => {
    // Igualamos la listaFiltrada a la lista original
    setListaFiltrada(mealList);
    // Igualamos el conteo a la longitud de los elementos de la lista original
    setResultsCount(mealList.length);
    // Reseteamos todos los filtros
    setCategoriaSeleccionada('--');
    setRegionSeleccionada('--');
    setEtiquetaSeleccionada('--');
  };

  return (
    <div>
      {/* Operador ternario que si se cumple que si el nombre
      de ingrediente no está vacio y el array tiene elementos: */}
      {nameIngredient && listaFiltrada.length > 0 ? (
        <>
          <div className="container">
            {/* Incluimos el componente FiltersBox */}
            <FiltersBox
              // Le pasamos el applyFilters
              // y el resetFilters
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              className="w-75"
            />
            {/* Incluimos el componente SearchResultsInfo */}
            <SearchResultsInfo
              // Le pasamos el contador de resultados
              numResultados={resultsCount}
              // y la variable de si el boton está clickado
              searchButtonClicked={searchButtonClicked}
            />
          </div>
          {/* Incluimos el componente Mealist pasandole la lista de comidas */}
          <MealList mealsToPrint={listaFiltrada} />
        </>
      ) : (
        // En caso de que no se cumpla:
        <div className="container">
          {/* Incluimos el componente SearchResultsInfo */}
          <SearchResultsInfo
            // Le pasamos el contador de resultados
            numResultados={resultsCount}
            // y la variable de si el boton está clickado
            searchButtonClicked={searchButtonClicked}
          />
        </div>
      )}
    </div>
  );
}

// Ponemos los propTypes indicando que el parametro nameIngredient
CardMealsByIngredient.propTypes = {
  nameIngredient: PropTypes.string,
};

// Y también ponemos los propTypes por defecto
CardMealsByIngredient.defaultProps = {
  nameIngredient: '',
};
