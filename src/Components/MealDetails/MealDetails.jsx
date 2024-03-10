import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Error from '../Error/Error';
import MealList from '../MealList/MealList';
import { establishFlag, getMealDetailsById } from '../../services/Async Functions/AsyncFunctions';

// Función encargado de mostrar la página de detalles de una comida específica
function MealDetails() {
  // Creamos una variable para navegar a la página
  const navigate = useNavigate();
  // Creamos una variable para obtener el id de la comida
  const { id } = useParams();
  // Creamos un useState para almacenar la comida específica
  const [mealData, setMealData] = useState(null);
  // Creamos un useState para almacenar la lista de comidas con el ingrediente que se seleccione
  const [relatedRecipes, setRelatedRecipes] = useState([]);

  // Creamos un useEffect para cargar la pagina de detalles
  // de la comida y que se ejecute cada vez que el id cambie
  useEffect(() => {
    // Creamos una funcion que sea asincrona
    const fetchMealDetails = async () => {
      try {
        // Obtenemos la comida específica pasandole el id
        const data = await getMealDetailsById(id);
        // En caso de que la lista no esté vacia y sea mayor que 0
        if (data.meals && data.meals.length > 0) {
          // Asignamos la comida a mealData
          setMealData(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    // Ejecutamos la función declarada anteriormente
    fetchMealDetails();
  }, [id]);

  // Creamos otra funcion asincrona pasandole el nombre del ingrediente
  const fetchRelatedRecipes = async (ingredient) => {
    try {
      // Hacemos una solicitud a la API para que nos traiga los platos con dicho ingrediente
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      // Lo pasamos a json guardandolo en data
      const data = await response.json();

      // Si la lista no está vacia:
      if (data.meals) {
        // Guardamos los ids de las comidas en idMeals
        const idMeals = data.meals.map((meal) => meal.idMeal);
        // Creamos una variable que espere a que se almacenen todas las promesas de lo siguiente:
        const detailedRecipes = await Promise.all(idMeals.map(async (idMeal) => {
          try {
            // Creamos una variable que guarde la lista de comidas dando su id
            const detailResponse = await getMealDetailsById(idMeal);
            // Devolvemos la lista en caso de que no esté vacia, y si lo esta devolvemos null
            return detailResponse.meals ? detailResponse.meals[0] : null;
          } catch (error) {
            console.error(`Error fetching details for meal ${idMeal}:`, error);
            return null;
          }
        }));

        // Filtramos las comidas quitando todos las comidas vacias
        const filteredDetailedRecipes = detailedRecipes.filter((recipe) => recipe !== null);

        // Asignamos filteredDetailedRecipes (la lista de comidas fitrada) a relatedRecipes
        setRelatedRecipes(filteredDetailedRecipes);
      }
    } catch (error) {
      console.error('Error fetching related recipes:', error);
    }
  };

  // Funcion que controla cuándo se hace clic en el ingrediente
  const handleIngredientClick = (ingredient) => {
    navigate(`/ingredient-recipes/${ingredient}`);
  };

  //CREO QUE NO SIRVE PARA NADA PORQUE NO HAY ENTER, SOLO HAY CLIC (EL DE ARRIBA)
  const handleIngredientKeyDown = (event, ingredient) => {
    if (event.key === 'Enter') {
      fetchRelatedRecipes(ingredient);
    }
  };

  // En caso de que mealData esté vacio, lanzamos el componente de Error
  if (!mealData) {
    return <Error />;
  }

  // Creamos un array de ingrediente
  const ingredients = [];
  // Iteramos un bucle de 20
  for (let i = 1; i <= 20; i += 1) {
    // Creamos una variable que almacene el nombre del ingrediente
    const ingredient = mealData[`strIngredient${i}`];
    // Creamos una variable que almacene la cantidad usada del ingrediente (Ej: 200ml de agua)
    const measure = mealData[`strMeasure${i}`];
    // Si ninguna se encuentra vacio
    if (ingredient && measure) {
      // Agregamos ambos al array de ingredientes
      ingredients.push({ ingredient, measure });
    }
  }

  // Creamos una variable para separar las intrucciones del json por puntos.
  const instructionsArray = mealData.strInstructions.split('. ');

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <div className="border-0">
            <div className="row">
              <div className="col-6">
                <img
                  className="card-img-top img-fluid rounded-circle"
                  src={mealData.strMealThumb}
                  alt={mealData.strMeal}
                />
              </div>
              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title fw-bold">{mealData.strMeal}</h2>
                    <div className="d-flex justify-content-between shadow p-3 rounded-5 mt-3">
                      <div className="bg-warning w-50 d-flex justify-content-center rounded-4 align-items-center">
                        <strong className="align-items-center type">{mealData.strCategory}</strong>
                      </div>
                      <div className="w-50 d-flex justify-content-center align-items-center">
                        <div className="w-50 d-flex justify-content-center align-items-center d-none d-md-flex">
                          <strong className="fs-6 country">{mealData.strArea}</strong>
                        </div>
                        <img
                          // Llamamos la función de establishFlag
                          // pasandole el pais para mostrar su bandera
                          src={`${establishFlag(mealData.strArea)}`}
                          alt={mealData.strArea}
                          className="ml-2 mr-2 d-sm-flex countryFlag"
                        />
                      </div>
                    </div>
                    <div className="row flex-wrap justify-content-center shadow rounded-3 m-2 mt-4">
                      <h4 className="card-title mb-4 bg-info-subtle rounded-2 p-2 text-center">Ingredients</h4>
                      {/* Mapeamos la lista de ingredientes */}
                      {ingredients.map((ingredient, index) => (
                        <div
                          // Asignamos como key nombre_ingrediente-medidas
                          key={`${ingredient.ingredient}-${ingredient.measure}`}
                          className="ingredient col-1 col-sm-1 col-lg-2 col-xl-2 my-2 text-center ingredient-container"
                          // Si hacemos clic en un ingrediente nos ejecuta la funcion
                          // handleIngredientClick pasandole el nombre del ingrediente
                          onClick={() => handleIngredientClick(ingredient.ingredient)}
                          onKeyDown={(e) => handleIngredientKeyDown(e, ingredient.ingredient)}
                          role="button"
                          tabIndex={0}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="bg-cardbody rounded-4 p-2">
                            <img
                              src={`https://www.themealdb.com/images/ingredients/${ingredient.ingredient.split(' ').pop()}-small.png`}
                              alt=""
                              className="card-img-top img-fluid"
                            />
                          </div>
                          <p className={`ingredient${index + 1} m-0`}>{`${ingredient.measure} ${ingredient.ingredient}`}</p>
                        </div>
                      ))}

                    </div>
                  </div>
                  <div className="text-end mt-2 mb-3">
                    <a href={mealData.strSource} className="text-decoration-none pe-4" target="_blank" rel="noreferrer">
                      More information...
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-75 card mx-auto my-4">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Instructions</h2>
          {/* Mapeamos el array de las instrucciones separado por puntos */}
          {instructionsArray.map((instruction, index) => (
            <p key={instruction} className="card-text h5 fw-normal  mt-4">
              {index + 1}. {instruction}
            </p>
          ))}
          <div className="w-75 mx-auto mt-4">
            <div className="embed-responsive ratio ratio-16x9 mb-3">
              <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${mealData.strYoutube.split('v=')[1]}`} title="Meal Video" allowFullScreen />
            </div>
          </div>
        </div>
      </div>

      {/* En caso de que la lista de comidas con el
      ingrediente seleccionada sea mayor a 0 */}
      {relatedRecipes.length > 0 && (
        <div className="row flex-wrap justify-content-center shadow rounded-3 m-2 mt-4">
          <h4 className="card-title mb-4 bg-info-subtle rounded-2 p-2 text-center">Related Recipes</h4>
          {/* Ejecutamos el componente MealList pasandole la lista de comidas */}
          <MealList mealsToPrint={relatedRecipes} />
        </div>
      )}
    </div>
  );
}

// Exportamos la función como componente
export default MealDetails;
