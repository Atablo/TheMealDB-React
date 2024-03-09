import { region, countryFlags } from '../DataArrays/DataArrays';

// url de los platos de la API
const urlIngredients = 'https://www.themealdb.com/api/json/v1/1/';
const listIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const urlComidas = 'https://www.themealdb.com/api/json/v1/1/search.php';

const listCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

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

export async function getMealDetailsById(idMeal) {
  try {
    const urlFetch = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const response = await fetch(urlFetch);

    if (!response.ok) {
      throw new Error(`Error al obtener detalles del plato. Código de estado: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error; // Puedes manejar el error según tus necesidades
  }
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
