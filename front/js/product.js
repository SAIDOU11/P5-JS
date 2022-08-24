const linkSearch = window.location.search;
const urlParams = new URLSearchParams(linkSearch);
const productId = urlParams.get("id");

// FONCTION FETCH POUR FAIRE UNE REQUETE AUX SERVEURS QUI VA RETOURNER LES INFORMATIONS DE L'API
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => addData(res));

// FONCTION AJOUT DE DONNÉES.. NOS FONCTIONS SERONT REGROUPER À l'INTERIEUR DE CETTE FONCTION

// RÉCUPÉRATION DE DONNÉES À l'INTERIEUR LA CONSTANTE (LOGO)
function addData(logo) {
  const { altTxt, colors, description, imageUrl, name, price } = logo;
  tagImage(imageUrl, altTxt);
  nameTitle(name);
  spanPrice(price);
  tagParagraph(description);
  chooseColors(colors);
}

// FONCTION AJOUT IMAGE DANS SON PARENT .ITEM__IMG
function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}

// FONCTION AJOUT DE TITRE DANS LE DIV #TITLE
function nameTitle(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

// FONCTION AJOUT Du PRIX DANS LA BALISE SPAN
function spanPrice(price) {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}

// FONCTION AJOUT DE LA DESCRIPTION DANS LA BALISE P
function tagParagraph(description) {
  const paragraph = document.querySelector("#description");
  if (paragraph != null) paragraph.textContent = description;
}

// FONCTION QUI VA PERMETTRE DE CHOISIR ENTRE TROIS DIFFÉRENTES COULEURS DE CANAPÉ
// BOUCLE FOREACH POUR CREER L'OPTION AFIN DE CHOISIR ENTRE UNE DES COULEURS
function chooseColors(colors) {
  const choice = document.querySelector("#colors");
  if (choice != null)
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      choice.appendChild(option);
    });
}
