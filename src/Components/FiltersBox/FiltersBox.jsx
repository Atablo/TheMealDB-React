import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { getAllCategories } from '../../services/Async Functions/AsyncFunctions';
import { region, etiquetas } from '../../services/DataArrays/DataArrays';

// Componente hijo que se encarga de mostrar el listado de filtros
export default function FiltersBox({ applyFilters, resetFilters }) {
  // hacemos un useState que se encargue de guardar la categoría que se ha seleccionado..
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('--');
  // ... otro que se encargue de la región seleccionada...
  const [regionSeleccionada, setRegionSeleccionada] = useState('--');
  // ...otro que se encarga de la etiqueta...
  const [etiquetaSelccionada, setEtiquetaSeleccionada] = useState('--');

  // función para obtener las categorías y las va guardando en su useState correspondiente...
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // aquí esperamos a que obtengamos todas las categorías con la función de nuestro archivo js
    // y después las establecemos en el useState de las categorías
    getAllCategories().then((json) => setCategories(json.meals));
  }, []);

  // ordenamos todos los arrays que he obtenido para que sea más facil buscar al usuario
  region.sort();
  etiquetas.sort();

  // Para capturar los inpuuts hacemos los siguientes handlers(1 por cada campo o input)

  const handleSelectedCountry = (e) => {
    setRegionSeleccionada(e.target.value);
  };

  const handleSelectedCategory = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleSelectedTag = (e) => {
    setEtiquetaSeleccionada(e.target.value);
  };

  // Ya devuelvo todo  a continuación
  return (
    /* Ahora utilizo un acordeon de ReactBootrstrap,
    para que los filtros se puedan mostrar u ocultar */
    <Accordion defaultActiveKey="1" className="filters-box mt-2">
      <Accordion.Item eventKey="0">
        {/* Establecemos la cabecera y en el cuerpo es
        donde metemos la chicha de nuestro proyecto */}
        <Accordion.Header className="text-center"> <h2 className="mb-0 w-75">Filters <span className="d-inline h5">(Click here to unfold)</span></h2></Accordion.Header>
        <Accordion.Body className="p-0">
          <div
            className="alert alert-primary mt-0 border-0 mb-0 rounded-0 text-center"
            role="alert"
            id="filtros"
          >
            <h2 className="mb-4">Filters</h2>
            <div className="w-75 mx-auto">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <p className="form-label">Country</p>
                  {/* Aquí vamos a tomar el select,y cada vez que cambie
                  almacenamos su valor en el useState correspondiente y cambiamos
                  el valor del select */}
                  <select
                    className="form-select text-center"
                    id="pais"
                    onChange={handleSelectedCountry}
                    value={regionSeleccionada}
                  >

                    <option value="--">--</option>
                    {/* Ahora imprimo las opciones de regiones según el map con el array region */}
                    {region.map((regionItem) => (
                      <option value={regionItem} key={regionItem}>
                        {regionItem}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <p className="form-label">Meal category</p>
                  {/* De nuevo manejamos el select, y cada vez que cambie
                  almacenamos su valor en el useState correspondiente y cambiamos
                  el valor del select */}
                  <select
                    className="form-select text-center"
                    id="categoria"
                    onChange={handleSelectedCategory}
                    value={categoriaSeleccionada}
                  >
                    <option value="--">--</option>
                    {/* Ahora imprimo las categorias según el map con el array de categorías
                      que hemos obtenido al inicio */}

                    {categories.map((category) => (
                      <option value={category.strCategory} key={category.strCategory}>
                        {category.strCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <p className="form-label">Tags</p>
                  {/* Ahora vamos con el select de tags, y cada vez que cambie
                  almacenamos su valor en el useState correspondiente y cambiamos
                  el valor del select */}
                  <select
                    className="form-select text-center"
                    id="etiqueta"
                    onChange={handleSelectedTag}
                    value={etiquetaSelccionada}
                  >
                    <option value="--">--</option>
                    {/* Ahora imprimo las etiquetas según el map con el array de etiquetas
                      que hemos obtenido al inicio */}
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
              /* Hacemos un onClick en el botón, que llama a  la función del padre
              a este le pasamos la categoría seleccionada,la regióno seleccionada
               y la etiqueta seleccionada */
              onClick={() => applyFilters(
                categoriaSeleccionada,
                regionSeleccionada,
                etiquetaSelccionada,
              )}
            >
              Apply Filters
            </button>
            <button
              /* Hacemos el botón de reset Filters */
              className="btn btn-danger mt-4 ms-2"
              id="resetFilters"
              type="button"
              /* Hacemos un onClick en el botón, que llama a  la función del padre
              a este le pasamos la categoría seleccionada,la regióno seleccionada
               y la etiqueta seleccionada para reestablecerlos */
              onClick={() => resetFilters(
                setCategoriaSeleccionada,
                setRegionSeleccionada,
                setEtiquetaSeleccionada,
              )}
            >
              Reset Filters
            </button>
            {/* Cerramos ahora todo el componente que habíamos hecho del acordeon */}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
/* Ponemos a continuación los propTypes */
FiltersBox.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};
