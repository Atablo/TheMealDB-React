// Declaro las variables del input y del botón para la busqueda de los ingredientes
// const nombreIngrediente = document.querySelector('#nombreIngrediente');
// const busquedaIngrediente = document.querySelector('#searchByIngredient');

// Declaro las variables para luego pintar los platos en estos
// const plantillaCard = document.querySelector('#meal').content;
// const divCards = document.querySelector('#results');

// Variable para almacenar las options del datalist
// const datalistOptions = document.querySelector('#datalistOptions');

// url de los platos de la API
const urlIngredients = 'https://www.themealdb.com/api/json/v1/1/';
const listIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const urlComidas = 'https://www.themealdb.com/api/json/v1/1/search.php';

// Variable que incluirá en nombre de ingrediente que usaremos más tarde
// let nombreIngrediente2;

// Array de paises
// const regiones = [
//   'British',
//   'American',
//   'French',
//   'Canadian',
//   'Jamaican',
//   'Chinese',
//   'Dutch',
//   'Egyptian',
//   'Greek',
//   'Indian',
//   'Irish',
//   'Italian',
//   'Japanese',
//   'Kenyan',
//   'Malaysian',
//   'Mexican',
//   'Moroccan',
//   'Croatian',
//   'Norwegian',
//   'Portuguese',
//   'Russian',
//   'Argentinian',
//   'Spanish',
//   'Slovakian',
//   'Thai',
//   'Arabian',
//   'Vietnamese',
//   'Turkish',
//   'Syrian',
//   'Argelian',
//   'Tunisian',
//   'Polish',
//   'Filipino',
// ];

// Array del código de paises
// const banderaPaises = [
//   'gb',
//   'us',
//   'fr',
//   'ca',
//   'jm',
//   'cn',
//   'nl',
//   'eg',
//   'gr',
//   'in',
//   'ie',
//   'it',
//   'jp',
//   'ke',
//   'my',
//   'mx',
//   'ma',
//   'hr',
//   'no',
//   'pt',
//   'ru',
//   'ar',
//   'es',
//   'sk',
//   'th',
//   'sa',
//   'vn',
//   'tr',
//   'sy',
//   'dz',
//   'tn',
//   'pl',
//   'ph',
// ];

// Array de etiquetas
// const etiquetas = [
//   'Rice',
//   'Sidedish',
//   'Speciality',
//   'Fruity',
//   'Pudding',
//   'Dessert',
//   'Snack',
//   'Treat',
//   'Summer',
//   'Dairy',
//   'Tart',
//   'Cake',
//   'Sweet',
//   'Breakfast',
//   'Greasy',
//   'Unhealthy',
//   'Calorific',
//   'BBQ',
//   'Bun',
//   'Baking',
//   'Heavy',
//   'Nutty',
//   'Light ',
//   'Desert',
//   'Caramel',
//   'Soup',
//   'Dinnerparty',
//   'Chocolate',
//   'Vegetables',
//   'Egg',
//   'Glazed',
//   'Fish',
//   'Seafood',
//   'Shellfish',
//   'Pie',
//   'Warm',
//   'Mainmeal',
//   'Speciality',
//   'Snack',
//   'Strongflavor',
//   'Alcoholic',
//   'Meat',
//   'Datenight',
//   'Expensive',
//   'Cheasy',
//   'Chilli',
//   'Curry',
//   'Spicy',
//   'Savory',
//   'Stew',
//   'Vegan',
//   'Paella',
//   'Mild',
//   'Pulse',
//   'Pasta',
//   'Fresh',
//   'Pancake',
//   'Onthego',
//   'Sausages',
// ];

/// ///////////////////////////////////////////////////////////////////////////////////////
/// ///////////////////////FUNCIONES ASÍNCRONAS///////////////////////////////////////////
/// ///////////////////////////////////////////////////////////////////////////////////////

// Función asíncrona para obtener los platos por nombre
export async function getIngredientsByName(name) {
  // Creamos una variable que sea igual a "urlIngredients" + "filter.php?i=" + el nombre
  // que introduzca el usuario
  const urlFetch = `${urlIngredients}filter.php?i=${name}`;
  // Response coge el argumento que le pasamos y contiene la respuesta
  const response = await fetch(urlFetch);
  // Que recupera el archivo json a través de la red
  const json = await response.json();
  // Y devuelve ese objeto para utilizarlo
  return json;
}

// Función asíncrona para obtener todos los ingrendientes
export async function getAllIngredients() {
  // Creamos una variable que sea igual a "listIngredients"
  const urlFetch = listIngredients;
  // Response coge el argumento que le pasamos y contiene la respuesta
  const response = await fetch(urlFetch);
  // Que recupera el archivo json a través de la red
  const json = await response.json();
  // Y devuelve ese objeto para utilizarlo
  return json;
}

// Función asíncrona para obtener los platos aleatoriamente
export async function showRandomMeals() {
  // Creamos una variable que sea igual a la url de la API que nos muestra un plato aleatorio
  const urlFetch = 'https://www.themealdb.com/api/json/v1/1/random.php';
  // Response coge el argumento que le pasamos y contiene la respuesta
  const response = await fetch(urlFetch);
  // Que recupera el archivo json a través de la red
  const json = await response.json();
  // Y devuelve ese objeto para utilizarlo
  return json;
}

export async function getMealsByName(nombreComida) {
  const urlFetch = `${urlComidas}?s=${nombreComida}`;
  const listaComidas = await fetch(urlFetch);
  const json = await listaComidas.json();
  return json;
}
