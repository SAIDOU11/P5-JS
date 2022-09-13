// ************************************** CONSTANTE  ***********************************
// Tableau vide pour récupérer les informations de la fonction getBasket sous forme de tableau.

const cart = [];

// ********************************************** GET BASKET ***********************************************
// Fonction asynchrome afin d'attentre la réponse du fetch pour en ensuite récupérer le panier.
//L'associer au localstorage.
//(.parse) Pour transformer la chaine de caractère en tableau.
// Récupération du même ID afin de récupérer le prix du produit qui n'apparaît pas dans le localstorage.
// Boucle forEach pour que chaque produit hérite de la fonction à son arriver dans le panier.
// (Ligne 15 à 26)
//Appel de la fonction. (Ligne 28)

async function getBasket(cart) {
  const nbOfProducts = localStorage.length;
  for (let i = 0; i < nbOfProducts; i++) {
    const product = localStorage.getItem(localStorage.key(i));
    const parseTable = JSON.parse(product);
    const idProduct = parseTable.id;
    const pullId = await getJSON(idProduct);
    parseTable.price = pullId.price;
    cart.push(parseTable);
  }
  cart.forEach((item) => displayProductBasket(item));
}

getBasket(cart);

// ******************************************* ASYNC FONCTION **********************************************

// Fonction asynchrome afin d'attentre la réponse du fetch
// Recevoir le produit par l'ID associer au produit selectionner dans le localstorage.
// (Ligne 36 à 42)

async function getJSON(idProduct) {
  return await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
}

// ******************************** FONCTION AJOUT DANS LE PANIER *********************************

// Fonction ajout de produit dans le panier.
// Fonction qui va nous permettre d'ajouter le produit.
// Ainsi qu'ajouter les fonctions dont on aura besoin pour ajuster notre panier.
// (Ligne 51 à 65)

function addBasket(id, item) {
  let findProduct = localStorage.length;
  findProduct = cart.find((product) => product.id == id);
  if (findProduct != undefined) {
    findProduct.quantity;
  } else {
    findProduct.quantity = 1;
  }
  findProduct.push(item);
  divSettings(item);
  displayTotalPrice();
  displayTotalQuantity();
  updateTotalFinal(newValue, item, id);
  saveToLocalStorage(item);
}

// ******************************** FONCTION SAUVEGARDE DANS LE LOCALSTORAGE *********************************

// Fonction pour la sauvegarde du panier dans le localStorage.
// Chaque produits selectionner et sauvegarger dans le localstorage.
// (Ligne 73 à 77)

function saveToLocalStorage(item) {
  const saveUpdate = JSON.stringify({
    id: item.id,
    altTxt: item.altTxt,
    color: item.color,
    imageUrl: item.imageUrl,
    name: item.name,
    quantity: item.quantity,
  });
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, saveUpdate);
}

// ******************************************* FONCTION RETIRER DU PANIER ************************************

// Fonction pour retirer un produit du panier. (Ligne 83 à 86)

function removeFromBasket(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

// ********************************************* BASKET PRICE & QUANTITY ************************************

// Fonction pour savoir la quantité de produit dans le panier. (Ligne 92 à 102)

function displayTotalQuantity() {
  let total = 0;
  const totalQuantity = document.querySelector("#totalQuantity");

  cart.forEach((product) => {
    let totalUnitQuantity = total + product.quantity;
    total = totalUnitQuantity;
  });

  totalQuantity.textContent = total;
}

// ***************************************** FONCTION DISPLAY TOTAL PRICE ***********************************

// Fonction créer pour le prix total du panier. Produit multiplier par sa quantité. (Ligne 108 à 118)

async function displayTotalPrice() {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");

  cart.forEach((product) => {
    const totalUnitPrice = product.price * product.quantity;
    total = total + totalUnitPrice;
  });

  totalPrice.textContent = total;
}

//************************************** UPDATE TOTAL FINAL  *************************************************

// Fonction pour la mise à jour de la quantité et le prix total du panier.  (Ligne 124 à 137)

function updateTotalFinal(item, newValue, id) {
  const itemUpdate = cart.find((item) => item.id === id);

  itemUpdate = item.quantity;
  itemUpdate = Number(newValue);

  const itemTotal = item.price * item.quantity;
  const totalPrice = document.querySelector("#totalPrice");

  const totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.textContent = item.quantity;

  totalPrice.textContent = itemTotal;
}

// ******************************************** DISPLAY PRODUCT BASKET **************************************

// Fonction display product basket qui va regrouper toutes les autres petites fonctions.
// Fonction qui va créer l'ensemble du body. (Ligne 144 à 155)

function displayProductBasket(item) {
  const article = tagParentArticle(item);
  const divId = divCartImg();
  const image = tagImage(item);
  const constCartContent = divCartContent(item);
  divId.appendChild(image);
  article.appendChild(divId);
  article.appendChild(constCartContent);
  // item.price = null;
  idParentArticle(article);
  displayTotalQuantity();
  displayTotalPrice();
}

// ******************************************** SECTION ID "#cart__items" ***********************************

// Fonction section parent ID et création enfant <article> (Ligne 161 à 163)

function idParentArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

// ******************************************** TAG PARENT ARTICLE ********************************************

// Fonction qui va créer la balise parent article. (Ligne 169 à 175)

function tagParentArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

// ******************************************** DIV cart__item__img *******************************************

//Fonction qui va créer une div puis une classe dans la balise <img>. (Ligne 181 à 185)

function divCartImg() {
  const divId = document.createElement("div");
  divId.classList.add("cart__item__img");
  return divId;
}

// ********************************************** TAG IMAGE *************************************************

// Fonction qui va fabriquer une balise <img> à l'intérieur de son parent #. (Ligne 191 à 196)

function tagImage(item) {
  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  return image;
}

// ******************************************** DIV cart__item__content ***************************************

// Fonction qui rappelle les fonctions dèja créer pour la création d'éléments.
// Et fonction création d'enfants dans la div. (Ligne 203 à 213)

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
//  Création des éléments <div>, <h2> et <p> et création des éléments enfants. (Ligne 220 à 240)

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
// Fonction ajout ou retrait de valeur dans le panier. (Ligne 248 à 278)

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

  input.name = "itemQuantity";
  input.min = 1;
  input.max = 100;
  input.value = item.quantity;
  input.classList.add("itemQuantity");

  input.addEventListener("change", (e) => {
    item.quantity = Number(e.target.value);

    if (item.quantity < 1 || item.quantity > 100) {
      alert("Veuillez saisir une quantité entre 1 et 100");
      return;
    }

    displayTotalQuantity();
    displayTotalPrice();
    saveToLocalStorage(item);
  });

  quantity.appendChild(input);
  settings.appendChild(quantity);
  divSettingsDelete(settings, item);
  return settings;
}

// ************************************ DIV cart__item__content__settings__delete ****************************

// Fonction création d'éléments ainsi que suppression d'éléments. (Ligne 284 à 295)

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

// Fonction qui va servir à supprimer un éléments du panier. (Ligne 301 à 309)

function deletFromBasket(item) {
  const productDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );

  cart.splice(productDelete, 1);
  displayTotalQuantity();
  displayTotalPrice();
  removeFromBasket(item);
  removeFromPageBasket(item);
  saveToLocalStorage(item);
}

// ********************************************** FONCTION REMOVE FROM PAGE ***********************************

// Fonction qui va servir à supprimer un éléments de la page. (Ligne 315 à 320)

function removeFromPageBasket(item) {
  const productRemove = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  productRemove.remove();
}

// *********************************************** SUBMIT FORM ************************************************

/* Fonction qui va faire appel à la fonction fetch pour récuper le numéro de commande,
 * rappeler d'autres fonctions pour :
 * Éviter le raffrachissement de la page.
 * Envoyer un message retour sur le formulaire.
 * Retourner les champs du formulaire qui sont invalide.
 * Rappel de la fonction requestBody().
 * Renvoie vers la page confirmation si tout est correct. (Ligne 333 à 369)
 */

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

function submitForm(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Veuillez passer vos articles dans le panier");
    return;
  }

  fNameInvalid();
  lNameInvalid();
  cityInvalid();
  emailInvalid();
  addressInValid();
  if (formInvalid()) return;

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

// Fonction qui va servir à saisir et récuperer les champs obligatoire du formulaire. (Ligne 375 à 395)

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

// Fonction pour récupérer uniquement le id sans la couleur du produit. (Ligne 401 à 411)

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

// Fonction qui va retourner le champ firstName du formulaire s'il est invalide. (Ligne 417 à 426)

function fNameInvalid() {
  const fName = document.querySelector("#firstName").value;
  const errorFirstName = document.querySelector("#firstNameErrorMsg");

  if (fName.length === 0) {
    errorFirstName.innerHTML = "Veuillez entrez votre prénom ";
    return false;
  }
  if (!fName.match(/^[a-zA-Z ]+$/)) {
    errorFirstName.innerHTML =
      "Veuillez entrez votre prénom sans utilisez de chiffres";
    return false;
  }
  errorFirstName.innerHTML = "Valide";
  return true;
}

// *************************************** FONCTION LAST NAME INVALID ******************************************

// Fonction qui va retourner le champ laststName du formulaire s'il est invalide. (Ligne 432 à 441)

function lNameInvalid() {
  const lName = document.querySelector("#lastName").value;
  const errorLastName = document.querySelector("#lastNameErrorMsg");

  if (lName.length === 0) {
    errorLastName.innerHTML = "Veuillez entrez votre nom ";
    return false;
  }
  if (!lName.match(/^[a-zA-Z ]+$/)) {
    errorLastName.innerHTML =
      "Veuillez entrez votre nom sans utilisez de chiffres";
    return false;
  }
  errorLastName.innerHTML = "Valide";
  return true;
}

// ************************************* FONCTION CITY INVALID ******************************************

function cityInvalid() {
  const city = document.querySelector("#city").value;
  const errorCity = document.querySelector("#cityErrorMsg");

  if (city.length === 0) {
    errorCity.innerHTML = "Veuillez entrez votre Ville ";
    return false;
  }
  if (!city.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    errorCity.innerHTML =
      "Veuillez entrez votre Ville sans utilisez de chiffres où d'éspaces";
    return false;
  }
  errorCity.innerHTML = "Valide";
  return true;
}
// ************************************* FONCTION FORM INVALID ******************************************

// Fonction qui va retourner les champs du formulaire qui sont invalide. (Ligne 447 à 457)

function formInvalid() {
  const order = document.querySelector("#order").value;

  order.forEach((input) => {
    if (input.value === "") {
      setError(order, "Veuillez remplir le formulaire s'il vous plait");
    } else {
      setSuccess(order);
    }
  });
}

// ************************************** FONCTION EMAIL INVALID  *******************************************************

// Fonction qui va retourner le champ email du formulaire s'il est invalide. (Ligne 463 à 472)

function emailInvalid() {
  const email = document.querySelector("#email").value;
  const errorEmail = document.querySelector("#emailErrorMsg");

  if (email.length === 0) {
    errorEmail.innerHTML = "Veuillez entrez votre adresse mail ";
    return false;
  }
  if (!email.match(/^[A-Za-z0-9+_.-]+@(.+)$/)) {
    errorEmail.innerHTML = "Veuillez entrez une adresse mail valide";
    return false;
  }
  errorEmail.innerHTML = "Valide";
  return true;
}

function addressInValid() {
  const userAddress = document.querySelector("#address").value;
  const errorAddress = document.querySelector("#addressErrorMsg");

  if (userAddress.length === 0) {
    errorAddress.innerHTML = "Veuillez entrez une adresse";
    return false;
  }
  if (!userAddress.match(/^\s*\S+(?:\s+\S+){2}/)) {
    errorAddress.innerHTML = "Veuillez entrez une adresse valide";
    return false;
  }
  errorAddress.innerHTML = "Valide";
  return true;
}
