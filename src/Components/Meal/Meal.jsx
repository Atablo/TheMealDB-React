import React, { useEffect, useState } from 'react';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php?number=10');
        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals);
        } else {
          console.error('No se encontraron recetas en la respuesta de la API');
        }
      } catch (error) {
        console.error('Error fetching random recipes:', error);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {recipes.map((recipe) => (
          <a key={recipe.idMeal} href={recipe.strSource} target="_blank" rel="noreferrer" className="text-decoration-none">
            <div className="card">
              <div className="row">
                <div className="col-sm-4">
                  <img
                    src={recipe.strMealThumb}
                    className="h-100 card-img w-100"
                    alt={recipe.strMeal}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-sm-8">
                  <div className="card-body">
                    <div className="d-flex justify-content-between shadow p-3 rounded-5">
                      <div className="bg-warning w-50 d-flex justify-content-center rounded-4 align-items-center">
                        <strong className="align-items-center type text-light">SIDE</strong>
                      </div>
                      <div className="w-50 d-flex justify-content-center align-items-center">
                        <div className="w-50 d-flex justify-content-center align-items-center d-none d-md-flex">
                          <strong className="fs-6 country">{recipe.strArea}</strong>
                        </div>
                        <img src={recipe.strAreaThumb} alt="" className="ml-2 mr-2 d-sm-flex countryFlag" />
                      </div>
                    </div>
                    <h5 className="card-title mt-3 d-flex justify-content-center">
                      {recipe.strMeal}
                    </h5>
                    <div className="row flex-wrap justify-content-center align-content-stretch shadow rounded-3 m-2 mt-3">
                      <h5 className="mb-4 bg-info-subtle rounded-2 p-2 text-center">Tags</h5>
                      <div className="tags d-flex flex-wrap justify-content-center align-items-center text-center rounded-3 tags-container py-4">
                        {recipe.strTags ? recipe.strTags.split(',').map((tag) => (
                          <span key={tag} className="badge bg-secondary m-1">{tag.trim()}</span>
                        )) : 'No tags'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
