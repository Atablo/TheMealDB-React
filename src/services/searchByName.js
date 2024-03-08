// eslint-disable-next-line max-len
// Ponemos todos los url necesarios para construir los diferentes url más tarde a los que haremos fetch
const urlComidas = 'https://www.themealdb.com/api/json/v1/1/search.php';
// eslint-disable-next-line no-unused-vars
const urlFotoIngredientes = 'https://www.themealdb.com/images/ingredients/';
const listCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

// arrays para ver la correspondencia entre  la abreviación del pais y
// la abreviación de las banderas según la API
// eslint-disable-next-line no-unused-vars
export const region = [

  'American',

  'Argelian',

  'Argentinian',

  'Arabian',

  'British',

  'Canadian',

  'Chinese',

  'Croatian',

  'Dutch',

  'Egyptian',

  'Filipino',

  'French',

  'Greek',

  'Indian',

  'Irish',

  'Italian',

  'Jamaican',

  'Japanese',

  'Kenyan',

  'Malaysian',

  'Mexican',

  'Moroccan',

  'Norwegian',

  'Polish',

  'Portuguese',

  'Russian',

  'Slovakian',

  'Spanish',

  'Syrian',

  'Thai',

  'Tunisian',

  'Turkish',

  'Vietnamese',

];
// eslint-disable-next-line no-unused-vars
const countryFlags = [
  'us',
  'dz',
  'ar',
  'sa',
  'gb',
  'ca',
  'cn',
  'hr',
  'nl',
  'eg',
  'ph',
  'fr',
  'gr',
  'in',
  'ie',
  'it',
  'jm',
  'jp',
  'ke',
  'my',
  'mx',
  'ma',
  'no',
  'pl',
  'pt',
  'ru',
  'sk',
  'es',
  'sy',
  'th',
  'tn',
  'tr',
  'vn',
];

/// //////////////////////////////////////////Busqueda por nombre///////////////////////////////
// Funcion asincrona para obtener todas las comidas que contengan el nombre que le hemos escrito
// eslint-disable-next-line max-len
// La url de la que haremos fetech será la variable URLComidas + ?s= + lo que queramos,pues ?s= es para declarar la variable
// en la url del nombre de comida
export async function getMealsByName(nombreComida) {
  const urlFetch = `${urlComidas}?s=${nombreComida}`;
  const listaComidas = await fetch(urlFetch);
  const json = await listaComidas.json();
  return json;
}

/// /////////////////////////////////////////Obtención de todas las categorías////////////////
// funcion para obtener todas las categorías que pondremos en el filtro
export async function getAllCategories() {
  const urlFetch = listCategories;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

export function establishFlag(nombrePais) {
  // tenemos que buscar el pais en el array de regiones y obtener el indice
  const indice = region.indexOf(nombrePais);
  // con ese indice sacamos la abreviación
  const countryAbrev = countryFlags[indice];
  // y establecemos esa abreviación en la url que nos traerá la abreviatura correspondiente
  return `https://www.themealdb.com/images/icons/flags/big/32/${countryAbrev}.png`;
}
