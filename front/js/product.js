// ************************************** CONSTANTES  ***********************************

// Constantes créer pour récupérer les params et récuperer le Id de chaque produit. (Ligne 5 à 7)

const linkSearch = window.location.search;
const urlParams = new URLSearchParams(linkSearch);
const productId = urlParams.get("id");

// ************************************** CONDITIONS  ***********************************

//Conditions if () de variable (portée globale) qui vont aider à créer le stock dans le localStorage.

if (productId != null) {
  var iURL = "";
  var altTEXT = "";
  var nameProd = "";
}

// ************************************** FONCTIONS FETCH  ***********************************

// Appel de la fonction fetch, requête aux serveurs pour retourner les valeurs avec leurs ID.
// Dû à nos constantes créer pour pour récupérer les params et récuperer le Id de chaque produit.
// (Ligne 25 à 27)

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => addData(res));

// ************************************** FONCTION AJOUT DE DONNÉES  ***********************************

// Fonction ajout de données. Ainsi que les fonctions qui ont servi à créer le body,
// seront regrouper à l'intérieur de cette fonction.
// Récupération de données à l'intérieur de la constante (logo).
// Constante qui récupere avec les informations de notre tableau produits. (Ligne 36 à 47)

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

// Fonction qui va créer un élément image dans son parent et ajouter la source et le texte de l'image.
// (Ligne 54 à 60)

function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  parent.appendChild(image);
}

// ******************************** FONCTION AJOUT DE TITRE DANS LE DIV #TITLE ********************************

// Fonction qui va nommer la balise <h1> avec le nom de son produit. (Ligne 66 à 69)

function nameTitle(name) {
  const h1 = document.querySelector("#title");
  h1.textContent = name;
}

// ******************************* FONCTION AJOUT Du PRIX DANS LA BALISE SPAN *******************************

// Fonction qui va nommer la balise <span> de son prix de produit. (Ligne 75 à 77)

function spanPrice(price) {
  const span = document.querySelector("#price");
  span.textContent = price;
}

// **************************** FONCTION AJOUT DE LA DESCRIPTION DANS LA BALISE P *******************************

// Fonction qui va nommer la balise <p> de sa description. (Ligne 84 à 87)

function tagParagraph(description) {
  const paragraph = document.querySelector("#description");
  paragraph.textContent = description;
}

// ************************************** FONCTION CHOIX DE COULEURS *****************************************

// Fonction qui va permettre le choix de couleurs disponible selon son produit. (Ligne 96 à 102)

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
// Si quantité et prix ne sont pas selectionner retour vers faire un choix avant de valider.
// Constante key pour selectionner un produit independemment identique,
// selon son ID mais avec une couleur différente. (Ligne 112 à 138)

const button = document.querySelector("#addToCart");
button.addEventListener("click", () => {
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
