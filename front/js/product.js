const linkSearch = window.location.search;
const urlParams = new URLSearchParams(linkSearch);
const productId = urlParams.get("id");

// CONDITIONS DE VARIABLE (PORTÉE GLOBALE) POUR STOCKER DANS LE LOCAL STORAGE
if (productId != null) {
  var valuePrice = 0; // enlever prix du localstorage
  var iURL = "";
  var altTEXT = "";
  var nameProd = "";
}

// FONCTION FETCH POUR FAIRE UNE REQUETE AUX SERVEURS QUI VA RETOURNER LES INFORMATIONS DE L'API
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => addData(res));

// FONCTION AJOUT DE DONNÉES..

// RÉCUPÉRATION DE DONNÉES À l'INTERIEUR LA CONSTANTE (LOGO)
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

// FONCTION AJOUT IMAGE DANS SON PARENT .ITEM__IMG
function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  parent.appendChild(image);
}

// FONCTION AJOUT DE TITRE DANS LE DIV #TITLE
function nameTitle(name) {
  const h1 = document.querySelector("#title");
  h1.textContent = name;
}

// FONCTION AJOUT Du PRIX DANS LA BALISE SPAN
function spanPrice(price) {
  const span = document.querySelector("#price");
  span.textContent = price;
}

// FONCTION AJOUT DE LA DESCRIPTION DANS LA BALISE P
function tagParagraph(description) {
  const paragraph = document.querySelector("#description");
  paragraph.textContent = description;
}

// FONCTION QUI VA PERMETTRE DE CHOISIR ENTRE TROIS DIFFÉRENTES COULEURS DE CANAPÉ
function chooseColors(colors) {
  const choice = document.querySelector("#colors");
  // BOUCLE FOREACH POUR CREER L'OPTION AFIN DE CHOISIR ENTRE UNE DES COULEURS PROPOSÉES
  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    choice.appendChild(option);
  });
}

// ÉVENNEMENT LORS DU CLICK SUR LA BALISE BUTTON
const button = document.querySelector("#addToCart");
button.addEventListener("click", (e) => {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  // SI ERREUR EST EGAL " " OU A NUL, OU BIEN QUANTITY EST EGAL A NUL OU 0.
  if (
    color == null ||
    color === "" ||
    quantity == null ||
    quantity == 0 // COMPARE STRING ET NUMBER DONC JUSTE (==)
  ) {
    alert("SVP, choisissez une couleur et une quantité");
    // POUR EVITER QUE LA PAGE NOUS ENVOIE VERS LA PAGE PANIER
    return;
  }
  // Stockage dans le localStorage
  const key = `${productId}-${color}`;
  const dataObject = {
    id: productId,
    color: color,
    quantity: Number(quantity),
    name: nameProd,
    price: valuePrice,
    imageUrl: iURL,
    altTxt: altTEXT,
  };
  // JSON.stringify pour transformer l'objet en chaine de caractère
  localStorage.setItem(key, JSON.stringify(dataObject));
  window.location.href = "cart.html";
});
