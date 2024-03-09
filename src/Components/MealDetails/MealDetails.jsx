import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Error from '../Error/Error';
import MealList from '../MealList/MealList';
import { establishFlag, getMealDetailsById } from '../../services/Async Functions/AsyncFunctions';

function MealDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mealData, setMealData] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const data = await getMealDetailsById(id);
        if (data.meals && data.meals.length > 0) {
          setMealData(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchMealDetails();
  }, [id]);

  // Dentro de la función fetchRelatedRecipes
  const fetchRelatedRecipes = async (ingredient) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();

      if (data.meals) {
        const idMeals = data.meals.map((meal) => meal.idMeal);

        const detailedRecipes = await Promise.all(idMeals.map(async (idMeal) => {
          try {
            const detailResponse = await getMealDetailsById(idMeal);
            return detailResponse.meals ? detailResponse.meals[0] : null;
          } catch (error) {
            console.error(`Error fetching details for meal ${idMeal}:`, error);
            return null;
          }
        }));

        const filteredDetailedRecipes = detailedRecipes.filter((recipe) => recipe !== null);

        setRelatedRecipes(filteredDetailedRecipes);
      }
    } catch (error) {
      console.error('Error fetching related recipes:', error);
    }
  };

  const handleIngredientClick = (ingredient) => {
    navigate(`/ingredient-recipes/${ingredient}`);
  };

  const handleIngredientKeyDown = (event, ingredient) => {
    if (event.key === 'Enter') {
      fetchRelatedRecipes(ingredient);
    }
  };

  if (!mealData) {
    return <Error />;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push({ ingredient, measure });
    }
  }

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
                          src={`${establishFlag(mealData.strArea)}`}
                          alt={mealData.strArea}
                          className="ml-2 mr-2 d-sm-flex countryFlag"
                        />
                      </div>
                    </div>
                    <div className="row flex-wrap justify-content-center shadow rounded-3 m-2 mt-4">
                      <h4 className="card-title mb-4 bg-info-subtle rounded-2 p-2 text-center">Ingredients</h4>
                      {ingredients.map((ingredient, index) => (
                        <div
                          key={`${ingredient.ingredient}-${ingredient.measure}`}
                          className="ingredient col-1 col-sm-1 col-lg-2 col-xl-2 my-2 text-center ingredient-container"
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

      {/* Display related recipes */}
      {relatedRecipes.length > 0 && (
        <div className="row flex-wrap justify-content-center shadow rounded-3 m-2 mt-4">
          <h4 className="card-title mb-4 bg-info-subtle rounded-2 p-2 text-center">Related Recipes</h4>
          <MealList mealsToPrint={relatedRecipes} />
        </div>
      )}
    </div>
  );
}

export default MealDetails;
