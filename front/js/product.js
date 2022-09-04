// ************************************** CONSTANTES  ***********************************

// Fonction pour récupérer les params et récuperer le Id de chaque produit. (ligne 5 à 7)

const linkSearch = window.location.search;
const urlParams = new URLSearchParams(linkSearch);
const productId = urlParams.get("id");

// ************************************** CONDITIONS  ***********************************

// CONDITIONS DE VARIABLE (PORTÉE GLOBALE) POUR STOCKER DANS LE LOCAL STORAGE

if (productId != null) {
  // var valuePrice = 0; // enlever prix du localstorage
  var iURL = "";
  var altTEXT = "";
  var nameProd = "";
}

// ************************************** FONCTIONS FETCH  ***********************************

// Appel de la fonction fetch, requête aux serveurs qui va retourner les informations de l'API.
// (ligne 25 à 27)

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => addData(res));

// ************************************** FONCTION AJOUT DE DONNÉES  ***********************************

// Récupération de données à l'intérieur de la constante logo.
// Informations de valeurs de produits. (ligne 34 à 45)

function addData(logo) {
  const { altTxt, colors, description, imageUrl, name, price } = logo;
  altTEXT = altTxt;
  iURL = imageUrl;
  nameProd = name;
  tagImage(imageUrl, altTxt);
  nameTitle(name);
  spanPrice(price);
  valuePrice = price;
  tagParagraph(description);
  chooseColors(colors);
}

// ************************************* FONCTION CREATION TAG IMAGE *************************************

// Fonction qui va créer image dans son parent. (ligne 51 à 57)

function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  parent.appendChild(image);
}

// ******************************** FONCTION AJOUT DE TITRE DANS LE DIV #TITLE ********************************

// Fonction qui va nommer la balise <h1>. (ligne 63 à 66)

function nameTitle(name) {
  const h1 = document.querySelector("#title");
  h1.textContent = name;
}

// ******************************* FONCTION AJOUT Du PRIX DANS LA BALISE SPAN *******************************

// Fonction qui va nommer la balise <span>. (ligne 72 à 75)

function spanPrice(price) {
  const span = document.querySelector("#price");
  span.textContent = price;
}

// **************************** FONCTION AJOUT DE LA DESCRIPTION DANS LA BALISE P *******************************

// Fonction qui va nommer la balise <p>. (ligne 81 à 84)

function tagParagraph(description) {
  const paragraph = document.querySelector("#description");
  paragraph.textContent = description;
}

// ************************************** FONCTION CHOIX DE COULEURS *****************************************

// Fonction qui va permettre le choix de couleurs. (ligne 90 à 99)

function chooseColors(colors) {
  const choice = document.querySelector("#colors");

  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    choice.appendChild(option);
  });
}

// ************************************** FONCTION ÉVENNEMENT *****************************************

// Fonction évennement lors du click sur la balise <button>
// Choix de la couleur du produit et quantité de produits
// Si quantité et prix ne sont pas selectionner
// Constante key pour selectionner independemment un produit identique selon une couleur différente.

const button = document.querySelector("#addToCart");
button.addEventListener("click", (e) => {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("SVP, choisissez une couleur et une quantité");
    return;
  }

  const key = `${productId}-${color}`;

  // Stock dans le local Storage
  const dataObject = {
    id: productId,
    color: color,
    quantity: Number(quantity),
    name: nameProd,
    //  price: valuePrice,
    imageUrl: iURL,
    altTxt: altTEXT,
  };

  localStorage.setItem(key, JSON.stringify(dataObject));
  alert("Votre produit a été ajouté au panier");
  window.location.href = "index.html";
});
