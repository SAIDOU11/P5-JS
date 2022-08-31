const cart = [];

//Appel de la fonction. (ligne )
saveBasket(cart);

// Boucle forEach pour la création pour que chaque produit soit ajouter à l'intérieur du panier
cart.forEach((item) => displayProductBasket(item));

// ********************************************** DISPLAY BASKET ***********************************************
/*  Fonction pour mettre le produit dans le localstorage. 
(.parse) Pour transformer la chaine de caractère en tableau.
 (ligne )
*/

function saveBasket(cart) {
  const nbOfProducts = localStorage.length;
  for (let i = 0; i < nbOfProducts; i++) {
    const product = localStorage.getItem(localStorage.key(i));
    const parseTable = JSON.parse(product);
    cart.push(parseTable);
  }
}

/* Fonction pour la mise à jour de la quantité et du prix dans le panier
 */
function addBasket(id, item) {
  const findProduct = cart.find((product) => product.id == id);
  if (findProduct != undefined) {
    findProduct.quantity++;
  } else {
    findProduct.quantity = 1;
  }
  divSettings(item);
  displayTotalPrice();
  displayTotalQuantity();
  getBasket(item);
}

// FONCTION SAUVEGARDE DANS LE LOCALSTORAGE
function getBasket(item) {
  saveUpdate = JSON.stringify(item);
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, saveUpdate);
}

//
function removeFromBasket(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

// ********************************************** BASKET PRICE & QUANTITY ***********************************************

//
function displayTotalQuantity() {
  let total = 0;
  let totalQuantity = document.querySelector("#totalQuantity");
  // FONCTION FOREACH
  cart.forEach((product) => {
    let totalUnitQuantity = total + product.quantity;
    total = totalUnitQuantity;
  });
  totalQuantity.textContent = total;
}

//
function displayTotalPrice() {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");
  // FONCTION FOREACH
  cart.forEach((product) => {
    const totalUnitPrice = product.price * product.quantity;
    total = total + totalUnitPrice;
  });
  totalPrice.textContent = total;
}
/* Fonction qui va regrouper toutes les autres petites fonctions
 (ligne .. à .. ) 
 */

// ******************************************** BASKET PRICE & QUANTITY ***************************************

function displayProductBasket(item) {
  const article = tagParentArticle(item);
  const divId = divCartImg();
  const image = tagImage(item);
  const constCartContent = divCartContent(item);
  divId.appendChild(image);
  article.appendChild(divId);
  article.appendChild(constCartContent);
  idParentArticle(article);
  displayTotalQuantity();
  displayTotalPrice();
  getBasket(item);
}

// ******************************************** SECTION ID "#cart__items" **************************************
// Fonction section parent ID
function idParentArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

// ******************************************** TAG PARENT ARTICLE ********************************************

// Fonction qui va créer la balise parent article
function tagParentArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

// ******************************************** DIV cart__item__img *******************************************
/*
Fonction qui va créer une div puis une classe dans la balise <img>
*/
function divCartImg() {
  const divId = document.createElement("div");
  divId.classList.add("cart__item__img");

  return divId;
}

// Fonction qui va fabriquer une balise <img> à l'intérieur de son parent #
function tagImage(item) {
  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  return image;
}

// ******************************************** DIV cart__item__content ****************************************
/*
Fonction qui rappelle les fonctions dèja créer pour lé création d'éléments. 
Et fonction création d'enfants dans la div.
*/
function divCartContent(item) {
  // Création de div et Ajout de class
  const constCartContent = document.createElement("div");
  constCartContent.classList.add("cart__item__content");

  // Fonction rappel de fonction
  const description = divCartDescription(item);
  const settings = divSettings(item);

  // création des éléments enfants
  constCartContent.appendChild(description);
  constCartContent.appendChild(settings);
  return constCartContent;
}
// ******************************************** DIV cart__item__content__description ***************************

// Première enfant de la div cart__item__content
function divCartDescription(item) {
  // Création de div et Ajout de class
  const divCartItemContent = document.createElement("div");
  divCartItemContent.classList.add("cart__item__content");
  // Création de div "cart__item__content__description" et Ajout de class
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  // création des éléments
  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  // création des éléments
  const paragraphColor = document.createElement("p");
  paragraphColor.textContent = item.color;
  // création des éléments
  const paragraphPrice = document.createElement("p");
  paragraphPrice.textContent = item.price + " € ";
  // création des éléments enfants
  description.appendChild(h2);
  description.appendChild(paragraphColor);
  description.appendChild(paragraphPrice);
  return description;
  //
}

// ******************************************** DIV cart__item__content__settings ******************************

// ******************************************** DIV cart__item__content__settings__quantity ******************************
// Fonction div "cart__item__content__settings" parente des autres éléments

function divSettings(item) {
  // Création de div parente et Ajout de class
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  // Création de div firstChild et Ajout de class
  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");

  // création des éléments et ajout de l'élément enfant
  const paragraph = document.createElement("p");
  paragraph.textContent = "Qté :";
  quantity.appendChild(paragraph);

  // création des éléments input
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  // Fonction ajout ou retrait de valeur dans le panier
  input.addEventListener("input", () => addBasket(item.id, input.value, item));

  // création des éléments enfants
  quantity.appendChild(input);
  settings.appendChild(quantity);
  divSettingsDelete(settings, item);
  return settings;
}

// ************************************ DIV cart__item__content__settings__delete ****************************

function divSettingsDelete(settings, item) {
  const suppress = document.createElement("div");
  suppress.classList.add("cart__item__content__settings__delete");
  suppress.addEventListener("click", () => deletFromBasket(item));

  const paragraphInDiv = document.createElement("p");
  paragraphInDiv.classList.add("deleteItem");
  paragraphInDiv.textContent = "Supprimer";
  suppress.appendChild(paragraphInDiv);
  settings.appendChild(suppress);
}

function deletFromBasket(item) {
  const productDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );
  cart.splice(productDelete, 1);
  displayTotalQuantity();
  displayTotalPrice();
  removeFromBasket(item);
  removeFromPageBasket(item);
}

function removeFromPageBasket(item) {
  const productRemove = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  productRemove.remove();
}

/*

 item {
// // altTxt: "Photo d'un canapé jaune et noir, quattre places";
// // color: "Black/Yellow";
// // id: "415b7cacb65d43b2b5c1ff70f3393ad1";
// // imageUrl: "http://localhost:3000/images/kanap02.jpeg";
// // price: 120;
// // quantity: 1;
// // name :
 } 

 */
