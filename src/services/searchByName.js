//Ponemos todos los url necesarios para construir los diferentes url más tarde a los que haremos fetch
const urlComidas = "https://www.themealdb.com/api/json/v1/1/search.php";
const urlFotoIngredientes = "https://www.themealdb.com/images/ingredients/";
const listCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

//arrays para ver la correspondencia entre  la abreviación del pais y la abreviación de las banderas según la API
const region = [
  "British",
  "American",
  "French",
  "Canadian",
  "Jamaican",
  "Chinese",
  "Dutch",
  "Egyptian",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Croatian",
  "Norwegian",
  "Portuguese",
  "Russian",
  "Argentinian",
  "Spanish",
  "Slovakian",
  "Thai",
  "Arabian",
  "Vietnamese",
  "Turkish",
  "Syrian",
  "Argelian",
  "Tunisian",
  "Polish",
  "Filipino",
];

const countryFlags = [
  "gb",
  "us",
  "fr",
  "ca",
  "jm",
  "cn",
  "nl",
  "eg",
  "gr",
  "in",
  "ie",
  "it",
  "jp",
  "ke",
  "my",
  "mx",
  "ma",
  "hr",
  "no",
  "pt",
  "ru",
  "ar",
  "es",
  "sk",
  "th",
  "sa",
  "vn",
  "tr",
  "sy",
  "dz",
  "tn",
  "pl",
  "ph",
];


/////////////////////////////////////////////Busqueda por nombre///////////////////////////////
//Funcion asincrona para obtener todas las comidas que contengan el nombre que le hemos escrito
//La url de la que haremos fetech será la variable URLComidas + ?s= + lo que queramos,pues ?s= es para declarar la variable
//en la url del nombre de comida
async function getMealsByName(nombreComida) {
  let urlFetch = urlComidas + "?s=" + nombreComida;
  let listaComidas = await fetch(urlFetch);
  let json = await listaComidas.json();
  return json;
}

////////////////////////////////////////////Obtención de todas las categorías////////////////
//funcion para obtener todas las categorías que pondremos en el filtro
async function getAllCategories() {
  const urlFetch = listCategories;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}
