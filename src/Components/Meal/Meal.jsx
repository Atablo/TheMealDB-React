import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Meal.css';

export default function Meal({ recipe }) {
  const getColorForTag = (tag) => {
    const tagColors = {
      Rice: 'bg-rice',
      rice: 'bg-rice',
      Alcoholic: 'bg-alcoholic',
      BBQ: 'bg-bbq',
      Baking: 'bg-baking',
      Breakfast: 'bg-breakfast',
      Bun: 'bg-bun',
      Calorific: 'bg-calorific',
      Caramel: 'bg-caramel',
      Cheasy: 'bg-cheasy',
      Chilli: 'bg-chilli',
      Chocolate: 'bg-chocolate',
      Curry: 'bg-curry',
      Dairy: 'bg-dairy',
      Datenight: 'bg-datenight',
      Desert: 'bg-desert',
      Dessert: 'bg-dessert',
      Dinnerparty: 'bg-dinnerparty',
      Egg: 'bg-egg',
      Expensive: 'bg-expensive',
      Fish: 'bg-fish',
      Fresh: 'bg-fresh',
      Fruity: 'bg-fruity',
      Glazed: 'bg-glazed',
      Greasy: 'bg-greasy',
      Heavy: 'bg-heavy',
      Light: 'bg-light',
      Mainmeal: 'bg-mainmeal',
      Meat: 'bg-meat',
      Mild: 'bg-mild',
      Nutty: 'bg-nutty',
      Onthego: 'bg-onthego',
      Pancake: 'bg-pancake',
      Pasta: 'bg-pasta',
      Pie: 'bg-pie',
      Pork: 'bg-pork',
      Pudding: 'bg-pudding',
      Pulse: 'bg-pulse',
      Sausages: 'bg-sausages',
      Savory: 'bg-savory',
      Seafood: 'bg-seafood',
      Shellfish: 'bg-shellfish',
      SideDish: 'bg-sidedish',
      Paella: 'bg-paella',
      Snack: 'bg-snack',
      soup: 'bg-soup',
      Speciality: 'bg-speciality',
      Spicy: 'bg-spicy',
      Stew: 'bg-stew',
      Strongflavor: 'bg-strongflavor',
      Summer: 'bg-summer',
      Sweet: 'bg-sweet',
      Tart: 'bg-tart',
      Treat: 'bg-treat',
      UnHealthy: 'bg-unhealthy',
      Vegan: 'bg-vegan',
      Vegetables: 'bg-vegetables',
      Vegetarian: 'bg-vegetarian',
      Beef: 'bg-beef',
      Lamb: 'bg-lamb',
      Chicken: 'bg-chicken',
      Warm: 'bg-warm',
      Side: 'bg-side',
      Casserole: 'bg-casserole',
      Cake: 'bg-cake',
      Starter: 'bg-starter',
      Sandwich: 'bg-sandwich',
      Warming: 'bg-warming',
      MainMeal: 'bg-mainmeal',
      DinnerParty: 'bg-dinnerparty',
      HangoverFood: 'bg-hangoverfood',
      Brunch: 'bg-brunch',
      Christmas: 'bg-christmas',
      Miscellaneous: 'bg-miscellaneous',
      Salad: 'bg-salad',
      Halloween: 'bg-halloween',
      Fusion: 'bg-fusion',

    };

    return tagColors[tag] || 'bg-secondary';
  };

  return (
    <Link to={`/meal/${recipe.idMeal}`} className="text-decoration-none">
      <div className="card">
        <div className="row">
          <div className="col-sm-6">
            <img
              src={recipe.strMealThumb}
              className="h-100 card-img w-100"
              alt={recipe.strMeal}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="col-sm-6">
            <div className="card-body h-100">
              <div className="d-flex justify-content-between shadow p-3 rounded-5">
                <div className={`w-50 d-flex justify-content-center rounded-4 align-items-center ${getColorForTag(recipe.strCategory)}`}>
                  <strong className="align-items-center type ">{recipe.strCategory}</strong>
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
              <div className="row flex-wrap justify-content-center align-content-stretch align-items-end shadow rounded-3 m-2 mt-3">
                <h5 className="m-0 bg-info-subtle rounded-2 p-2 text-center">Tags</h5>
                <div className="tags-container d-flex flex-wrap justify-content-center align-items-stretch text-center rounded-3 tags py-4">
                  {recipe.strTags ? recipe.strTags.split(',').map((tag) => (
                    <span key={tag} className="badge bg-secondary m-1">{tag.trim()}</span>
                  )) : 'No tags'}
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
    idMeal: PropTypes.string,
  }),
};

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
