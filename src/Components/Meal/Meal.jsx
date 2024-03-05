import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Meal({ recipe }) {
  return (
    <Link
      to={recipe.strSource}
      target="_blank"
      rel="noreferrer"
      className="text-decoration-none"
    >
      <div className="card mb-3 pb-3 h-100">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={recipe.strMealThumb}
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt={recipe.strMeal}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <div className="row justify-content-between shadow p-3 rounded-5">
                <div className="col-6 bg-warning w-50 d-flex justify-content-center rounded-4 align-items-center">
                  <strong className="align-items-center type text-light">
                    {recipe.strCategory}
                  </strong>
                </div>
                <div className="col-6 w-50 d-flex justify-content-center align-items-center">
                  <div className="w-50 d-flex justify-content-center align-items-center d-none d-md-flex">
                    <strong className="fs-6 country">{recipe.strArea}</strong>
                  </div>
                  <img
                    src={recipe.strAreaThumb}
                    alt=""
                    className="ml-2 mr-2 d-sm-flex countryFlag"
                  />
                </div>
              </div>
              <h5 className="card-title mt-3 d-flex justify-content-center">
                {recipe.strMeal}
              </h5>
              <div className="row flex-wrap justify-content-center align-content-stretch align-items-end shadow rounded-3 m-2 mt-3">
                <h5 className="m-0 bg-info-subtle rounded-2 p-2 text-center">
                  Tags
                </h5>
                <div className="tags-container d-flex flex-wrap justify-content-center align-items-stretch text-center rounded-3 tags py-4">
                  {recipe.strTags
                    ? recipe.strTags.split(',').map((tag) => (
                        <span key={tag} className="badge bg-secondary m-1">
                          {tag.trim()}
                        </span>
                      ))
                    : 'No tags'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

Meal.propTypes = {
  recipe: PropTypes.shape({
    strSource: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    strAreaThumb: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
};
