const cart = [];

//Appel de la fonction. (ligne 14)
getBasket(cart);

// Boucle forEach pour la création pour que chaque produit soit ajouter à l'intérieur du panier
cart.forEach((item) => displayProductBasket(item));

// ********************************************** SAVE BASKET ***********************************************

function getBasket(cart) {
  const nbOfProducts = localStorage.length;
  for (let i = 0; i < nbOfProducts; i++) {
    const product = localStorage.getItem(localStorage.key(i));
    const parseTable = JSON.parse(product);
    cart.push(parseTable);
  }
}
// *********************************************************************************************************
const url = "http://localhost:3000/api/products";
const nbOfProducts = localStorage.length;

fetch(url)
  .then((result) => result.json())
  .then((data) => {
    for (let i = 0; i < nbOfProducts; i++) {
      console.log(data[i]._id);
      console.log(data);
    }
  })
  .catch((err) => console.log(err));

// ******************************** FONCTION AJOUT DANS LE LOCALSTORAGE *********************************

// Fonction pour la mise à jour de la quantité et du prix dans le panier. (ligne 27 à 38)

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
  saveBasket(item);
}
// ******************************** FONCTION SAUVEGARDE DANS LE LOCALSTORAGE *********************************

// Fonction pour la sauvegarde des produits dans le localStorage. (ligne 44 à 48)

function saveBasket(item) {
  saveUpdate = JSON.stringify(item);
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, saveUpdate);
}
// Fonction pour mettre le produit dans le localstorage.
//(.parse) Pour transformer la chaine de caractère en tableau. (ligne 14 à 21)

// ******************************************* FONCTION RETIRER DU PANIER ************************************

// Fonction pour retirer un produit du panier. (ligne 54 à 57)

function removeFromBasket(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

// ********************************************* BASKET PRICE & QUANTITY ************************************

// Fonction pour savoir le prix total et le prix. (ligne 63 à 73)

function displayTotalQuantity() {
  let total = 0;
  let totalQuantity = document.querySelector("#totalQuantity");

  cart.forEach((product) => {
    let totalUnitQuantity = total + product.quantity;
    total = totalUnitQuantity;
  });

  totalQuantity.textContent = total;
}

// ***************************************** FONCTION DISPLAY TOTAL PRICE ***********************************

// Fonction pour le prix total du prix. Produit multiplier par sa quantité. (ligne 79 à 89)

function displayTotalPrice() {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");

  cart.forEach((product) => {
    const totalUnitPrice = product.price * product.quantity;
    total = total + totalUnitPrice;
  });

  totalPrice.textContent = total;
}

// ******************************************** DISPLAY PRODUCT BASKET **************************************

// Fonction display product basket qui va regrouper toutes les autres petites fonctions (ligne 95 à 107)

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
  saveBasket(item);
}

// ******************************************** SECTION ID "#cart__items" ***********************************

// Fonction section parent ID et création enfant <article> (ligne 113 à 115)

function idParentArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

// ******************************************** TAG PARENT ARTICLE ********************************************

// Fonction qui va créer la balise parent article. (ligne 121 à 127)

function tagParentArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

// ******************************************** DIV cart__item__img *******************************************

//Fonction qui va créer une div puis une classe dans la balise <img>. (ligne 133 à 137)

function divCartImg() {
  const divId = document.createElement("div");
  divId.classList.add("cart__item__img");
  return divId;
}

// ********************************************** TAG IMAGE *************************************************

// Fonction qui va fabriquer une balise <img> à l'intérieur de son parent #. (ligne 143 à 148)

function tagImage(item) {
  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  return image;
}

// ******************************************** DIV cart__item__content ***************************************

// Fonction qui rappelle les fonctions dèja créer pour la création d'éléments.
// Et fonction création d'enfants dans la div. (ligne 155 à 165)

function divCartContent(item) {
  const constCartContent = document.createElement("div");
  constCartContent.classList.add("cart__item__content");

  const description = divCartDescription(item);
  const settings = divSettings(item);

  constCartContent.appendChild(description);
  constCartContent.appendChild(settings);
  return constCartContent;
}

// ******************************************** DIV cart__item__content__description ***************************

// Fonction première enfant de la div (cart__item__content).
//  Création des éléments <div>, <h2> et <p> et création des éléments enfants. (ligne 172 à 192)

function divCartDescription(item) {
  const divCartItemContent = document.createElement("div");
  divCartItemContent.classList.add("cart__item__content");

  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;

  const paragraphColor = document.createElement("p");
  paragraphColor.textContent = item.color;

  const paragraphPrice = document.createElement("p");
  paragraphPrice.textContent = item.price + " € ";

  description.appendChild(h2);
  description.appendChild(paragraphColor);
  description.appendChild(paragraphPrice);
  return description;
}

// ******************************************** DIV cart__item__content__settings__quantity *******************

// Fonction div "cart__item__content__settings" parente des autres éléments
//  Création des éléments <div>, <p> et <input> et ainsi que création des éléments enfants.
//  // Fonction ajout ou retrait de valeur dans le panier. (ligne 200 à 225)

function divSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");

  const paragraph = document.createElement("p");
  paragraph.textContent = "Qté :";
  quantity.appendChild(paragraph);

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;

  input.addEventListener("input", () => addBasket(item.id, input.value, item));

  quantity.appendChild(input);
  settings.appendChild(quantity);
  divSettingsDelete(settings, item);
  return settings;
}

// ************************************ DIV cart__item__content__settings__delete ****************************

// Fonction création d'éléments ainsi que suppression d'éléments. (ligne 231 à 242)

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

// ******************************************** FONCTION REMOVE FROM BASKET *************************************

// Fonction qui va servir à supprimer un éléments du panier. (ligne 248 à 258)

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

// ********************************************** FONCTION REMOVE FROM PAGE ***********************************

// Fonction qui va servir à supprimer un éléments de la page. (ligne 264 à 269)

function removeFromPageBasket(item) {
  const productRemove = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  productRemove.remove();
}

// ************************************************** TAG FORM ************************************************

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

// *********************************************** SUBMIT FORM ************************************************

/* Fonction qui va faire appel à la fonction fetch, rappeler d'autres fonctions pour :
 * Éviter le raffrachissement de la page.
 * Envoyer un message retour sur le formulaire.
 * Retourner les champs du formulaire qui sont invalide.
 * Rappel de la fonction requestBody().
 */

function submitForm(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Veuillez passer vos articles dans le panier");
    return;
  }

  if (fNameInvalid()) return;
  if (lNameInvalid()) return;
  if (formInvalid()) return;
  if (emailInvalid()) return;

  const body = requestBody();

  const promise = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  promise.then(async (response) => {
    try {
      const contenu = await response.json();
      const orderId = contenu.orderId;
      window.location.href =
        "../html/confirmation.html" + "?orderId=" + orderId;
    } catch (e) {
      console.error(e);
    }
  });
}

// ******************************************* FONCTION REQUEST BODY *******************************************

// Fonction qui va servir à saisir et récuperer les champs obligatoire du formulaire. (ligne 324 à 344)

function requestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIds(),
  };

  return body;
}

// ************************************************** FONCTION GET IDS *****************************************

// Fonction pour récupérer uniquement le id sans la couleur du produit. (ligne 350 à 361)

function getIds() {
  const nbOfProducts = localStorage.length;
  const ids = [];

  for (let i = 0; i < nbOfProducts; i++) {
    const key = localStorage.key(i);

    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}

// *************************************** FONCTION FIRST NAME INVALID ****************************************

// Fonction qui va retourner le champ firstName du formulaire s'il est invalide.

function fNameInvalid() {
  const fName = document.querySelector("#firstName").value;
  const regex = /^[a-zA-Z ]+$/;
  if (regex.test(fName) === false) {
    alert("veuillez entrez des chaines de caractères s'il vous plait");
    return true;
  } else {
    return false;
  }
}

// *************************************** FONCTION LAST NAME INVALID ******************************************

// Fonction qui va retourner le champ laststName du formulaire s'il est invalide.

function lNameInvalid() {
  const lName = document.querySelector("#lastName").value;
  const regex = /^[a-zA-Z ]+$/;
  if (regex.test(lName) === false) {
    alert("veuillez entrez des chaines de caractères s'il vous plait");
    return true;
  } else {
    return false;
  }
}

// ************************************* FONCTION FIRST NAME INVALID ******************************************

// Fonction qui va retourner les champs du formulaire qui sont invalide.

function formInvalid() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("veuillez remplir les champs obligatoires");
      return true;
    } else {
      return false;
    }
  });
}

// ************************************** FONCTION EMAIL INVALID *******************************************

// Fonction qui va retourner le champ email du formulaire s'il est invalide.

function emailInvalid() {
  const email = document.querySelector("#email").value;
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(email) === false) {
    alert("veuillez entrez vodre adresse email s'il vous plait");
    return true;
  } else {
    return false;
  }
}
