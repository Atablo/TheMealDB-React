import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { establishFlag } from '../../services/Async Functions/AsyncFunctions';
import './Meal.css';

// Componente encargado de mostrar los cards de las comidas
export default function Meal({ recipe }) {
  // Creamos una función getColorForTag pasandole la categoria
  const getColorForTag = (tag) => {
    // Creamos una lista que tenga todas las categorias y cada uno con el color asignado
    const tagColors = {
      Rice: 'card__category--bg-rice',
      Alcoholic: 'card__category--bg-alcoholic',
      BBQ: 'card__category--bg-bbq',
      Baking: 'card__category--bg-baking',
      Breakfast: 'card__category--bg-breakfast',
      Bun: 'card__category--bg-bun',
      Calorific: 'card__category--bg-calorific',
      Caramel: 'card__category--bg-caramel',
      Cheasy: 'card__category--bg-cheasy',
      Chilli: 'card__category--bg-chilli',
      Chocolate: 'card__category--bg-chocolate',
      Curry: 'card__category--bg-curry',
      Dairy: 'card__category--bg-dairy',
      Datenight: 'card__category--bg-datenight',
      Desert: 'card__category--bg-desert',
      Dessert: 'card__category--bg-dessert',
      Dinnerparty: 'card__category--bg-dinnerparty',
      Egg: 'card__category--bg-egg',
      Expensive: 'card__category--bg-expensive',
      Fish: 'card__category--bg-fish',
      Fresh: 'card__category--bg-fresh',
      Fruity: 'card__category--bg-fruity',
      Glazed: 'card__category--bg-glazed',
      Greasy: 'card__category--bg-greasy',
      Heavy: 'card__category--bg-heavy',
      Light: 'card__category--bg-light',
      Mainmeal: 'card__category--bg-mainmeal',
      Meat: 'card__category--bg-meat',
      Mild: 'card__category--bg-mild',
      Nutty: 'card__category--bg-nutty',
      Onthego: 'card__category--bg-onthego',
      Pancake: 'card__category--bg-pancake',
      Pasta: 'card__category--bg-pasta',
      Pie: 'card__category--bg-pie',
      Pork: 'card__category--bg-pork',
      Pudding: 'card__category--bg-pudding',
      Pulse: 'card__category--bg-pulse',
      Sausages: 'card__category--bg-sausages',
      Savory: 'card__category--bg-savory',
      Seafood: 'card__category--bg-seafood',
      Shellfish: 'card__category--bg-shellfish',
      SideDish: 'card__category--bg-sidedish',
      Paella: 'card__category--bg-paella',
      Snack: 'card__category--bg-snack',
      soup: 'card__category--bg-soup',
      Speciality: 'card__category--bg-speciality',
      Spicy: 'card__category--bg-spicy',
      Stew: 'card__category--bg-stew',
      Strongflavor: 'card__category--bg-strongflavor',
      Summer: 'card__category--bg-summer',
      Sweet: 'card__category--bg-sweet',
      Tart: 'card__category--bg-tart',
      Treat: 'card__category--bg-treat',
      UnHealthy: 'card__category--bg-unhealthy',
      Vegan: 'card__category--bg-vegan',
      Vegetables: 'card__category--bg-vegetables',
      Vegetarian: 'card__category--bg-vegetarian',
      Beef: 'card__category--bg-beef',
      Lamb: 'card__category--bg-lamb',
      Chicken: 'card__category--bg-chicken',
      Warm: 'card__category--bg-warm',
      Side: 'card__category--bg-side',
      Casserole: 'card__category--bg-casserole',
      Cake: 'card__category--bg-cake',
      Starter: 'card__category--bg-starter',
      Sandwich: 'card__category--bg-sandwich',
      Warming: 'card__category--bg-warming',
      MainMeal: 'card__category--bg-mainmeal',
      DinnerParty: 'card__category--bg-dinnerparty',
      HangoverFood: 'card__category--bg-hangoverfood',
      Brunch: 'card__category--bg-brunch',
      Christmas: 'card__category--bg-christmas',
      Miscellaneous: 'card__category--bg-miscellaneous',
      Salad: 'card__category--bg-salad',
      Halloween: 'card__category--bg-halloween',
      Fusion: 'card__category--bga-fusion',
    };

    // Devolvemos el color para la categoria correspondiente y si no la hay el color será gris
    return tagColors[tag] || 'bg-secondary';
  };

  return (
    <Link to={`/meal/${recipe.idMeal}`} className="text-decoration-none">
      <div className="card h-100">
        {' '}
        {/* Agregamos la clase h-100 para establecer la altura al 100% */}
        <div className="row h-100">
          <div className="col-sm-6 object-fit-cover">
            <img
              src={recipe.strMealThumb}
              className="h-100 card-img w-100"
              alt={recipe.strMeal}
            />
          </div>
          <div className="col-sm-6 ps-0">
            <div className="card-body h-100 ps-0 d-flex flex-column justify-content-between">
              {' '}
              {/* Agregamos flex-column y justify-content-between
              para distribuir el espacio verticalmente */}
              <div className="d-flex justify-content-around shadow p-3 rounded-5">
                <div
                  className={`w-50 d-flex justify-content-center rounded-4 align-items-center ${getColorForTag(recipe.strCategory)}`}
                >
                  <strong className="align-items-center type">
                    {recipe.strCategory}
                  </strong>
                </div>
                <div className="w-50 d-flex justify-content-around align-items-center">
                  <div className="w-50 d-flex justify-content-center align-items-center d-none d-md-flex">
                    <strong className="fs-6 country">{recipe.strArea}</strong>
                  </div>
                  <img
                    src={`${establishFlag(recipe.strArea)}`}
                    alt=""
                    className="ml-2 mr-2 d-sm-flex countryFlag"
                  />
                </div>
              </div>
              <h5 className="card-title mt-3 d-flex justify-content-center text-center">
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

// Ponemos los propTypes indicando el tipo que son los parametros de recipe
Meal.propTypes = {
  recipe: PropTypes.shape({
    strSource: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    strAreaThumb: PropTypes.string,
    strTags: PropTypes.string,
    idMeal: PropTypes.string,
  }),
};

// Y tambien declaramos los propTypes por defecto
Meal.defaultProps = {
  recipe: {
    strSource: '',
    strMealThumb: '',
    strMeal: '',
    strCategory: '',
    strArea: '',
    strAreaThumb: '',
    strTags: '',
    idMeal: '',
  },
};
