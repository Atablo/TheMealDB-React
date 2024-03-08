import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { region, getAllCategories } from '../../services/searchByName';
import { etiquetas } from '../../services/searchByIngredient';

// eslint-disable-next-line max-len
export default function FiltersBox({ applyFilters, resetFilters }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('--');
  const [regionSeleccionada, setRegionSeleccionada] = useState('--');
  const [etiquetaSelccionada, setEtiquetaSeleccionada] = useState('--');
  // función para obtener las categorías y su array para ir guardándolas
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((json) => setCategories(json.meals));
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
  // Función para aplicar los filtros

  return (
    <div
      className="alert alert-primary mt-3 mb-2 text-center"
      role="alert"
      id="filtros"
    >
      <h2 className="mb-4">Filters</h2>
      <div className="w-75 mx-auto">
        <div className="row">
          <div className="col-md-4 mb-3">
            <p className="form-label">Country</p>
            <select
              className="form-select text-center"
              id="pais"
              onChange={handleSelectedCountry}
              value={regionSeleccionada}
            >
              <option value="--">--</option>
              {region.map((regionItem) => (
                <option value={regionItem} key={regionItem}>
                  {regionItem}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <p className="form-label">Meal category</p>
            <select
              className="form-select text-center"
              id="categoria"
              onChange={handleSelectedCategory}
              value={categoriaSeleccionada}
            >
              <option value="--">--</option>
              {console.log(categories)}
              {categories.map((category) => (
                <option value={category.strCategory} key={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <p className="form-label">Tags</p>
            <select
              className="form-select text-center"
              id="etiqueta"
              onChange={handleSelectedTag}
              value={etiquetaSelccionada}
            >
              <option value="--">--</option>
              {etiquetas.map((etiqueta) => (
                <option value={etiqueta} key={etiqueta}>
                  {etiqueta}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        className="btn btn-success mt-4"
        id="applyFilters"
        type="button"
        onClick={() => applyFilters(
          categoriaSeleccionada,
          regionSeleccionada,
          etiquetaSelccionada,
        )}
      >
        Apply Filters
      </button>
      <button
        className="btn btn-danger mt-4 ms-2"
        id="resetFilters"
        type="button"
        onClick={() => resetFilters(
          setCategoriaSeleccionada,
          setRegionSeleccionada,
          setEtiquetaSeleccionada,
        )}
      >
        Reset Filters
      </button>
    </div>
  );
}

FiltersBox.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};
