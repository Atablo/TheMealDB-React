import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { region, getAllCategories } from '../../services/searchByName';
import { etiquetas } from '../../services/searchByIngredient';

export default function FiltersBox({ mealsToPrint, setMealsToPrint, searchMealsByName }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('--');
  const [regionSeleccionada, setRegionSeleccionada] = useState('--');
  const [etiquetaSelccionada, setEtiquetaSeleccionada] = useState('--');
  // función para obtener las categorías y su array para ir guardándolas
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then(
      (json) => setCategories(json.meals),
    );
  }, []);

  // voy a ordenar los arrays que no obtengo mediante funciones
  region.sort();
  etiquetas.sort();

  // Para capturar los inpuuts...

  const handleSelectedCountry = (e) => {
    setRegionSeleccionada(e.target.value);
  };

  const handleSelectedCategory = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleSelectedTag = (e) => {
    setEtiquetaSeleccionada(e.target.value);
  };

  // hago copia de la lista para utilizarla luego
  const originalList = [...mealsToPrint];
  let filteredMeals = [...mealsToPrint];
  // Función para aplicar los filtros
  const applyFilters = () => {
    // hacemos una copia del array original y trabajamos con ella

    /*  Aquí haremos las comprobaciones */
    if (categoriaSeleccionada !== '--') {
      filteredMeals = filteredMeals.filter((item) => item.strCategory === categoriaSeleccionada);
    }
    if (regionSeleccionada !== '--') {
      filteredMeals = filteredMeals.filter((item) => item.strArea === regionSeleccionada);
    }
    if (etiquetaSelccionada !== '--') {
      /* Para las etiqueta será distinto,pues hay varias etiquetas que puede tener una comida */
      // eslint-disable-next-line max-len
      filteredMeals = filteredMeals.filter((item) => {
        if (item.strTags) {
          return item.strTags.toUpperCase().includes(etiquetaSelccionada.toUpperCase());
        }
        return false; // Devolver false si item.strTags no existe o es null
      });
    }
    /** Aquí hay duda!! como puedo volver a almacenar el array orignal??? */

    // una vez acabadas las comprobaciones insertaremos ese array
    setMealsToPrint(filteredMeals);
    filteredMeals = [...originalList];// volvemos a poner el array original
    console.log(filteredMeals);
  };

  const resetFilters = () => {
    searchMealsByName();
    setCategoriaSeleccionada('--');
    setRegionSeleccionada('--');
    setEtiquetaSeleccionada('--');
  };
  return (
    <div className="alert alert-primary mt-3 mb-2 text-center" role="alert" id="filtros">
      <h2 className="mb-4">Filters</h2>
      <div className="w-75 mx-auto">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="pais" className="form-label">Country</label>
            <select className="form-select text-center" id="pais" onChange={handleSelectedCountry}>
              <option selected>--</option>
              {
                                    region.map((regionItem) => (

                                      <option key={regionItem}>{regionItem}</option>

                                    ))
                                }
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="categoria" className="form-label">Meal category</label>
            <select className="form-select text-center" id="categoria" onChange={handleSelectedCategory}>
              <option selected>--</option>
              {console.log(categories)}
              {
                                    categories.map((category) => (

                                      <option
                                        key={category.strCategory}
                                      >
                                        {category.strCategory}
                                      </option>

                                    ))
                                }
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="etiqueta" className="form-label">Tags</label>
            <select className="form-select text-center" id="etiqueta" onChange={handleSelectedTag}>
              <option selected>--</option>
              {
                                    etiquetas.map((etiqueta) => (

                                      <option key={etiqueta}>{etiqueta}</option>

                                    ))
                                }
            </select>
          </div>
        </div>
      </div>

      <button className="btn btn-success mt-4" id="applyFilters" type="button" onClick={applyFilters}>Apply Filters</button>
      <button className="btn btn-danger mt-4 ms-2" id="resetFilters" type="button" onClick={resetFilters}>Reset Filters</button>
    </div>
  );
}

FiltersBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  mealsToPrint: PropTypes.arrayOf(PropTypes.object),
  searchMealsByName: PropTypes.func.isRequired,
  setMealsToPrint: PropTypes.func.isRequired,
};
FiltersBox.defaultProps = {
  mealsToPrint: [], // Valor por defecto para mealsToPrint
};
