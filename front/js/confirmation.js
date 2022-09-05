// ************************************** CONSTANTES ET APPEL FONCTIONS ***********************************

// Constantes et rappels des fonctions. (Ligne 5 à 7)

const orderId = getOrderId();
displayId(orderId);
clearLocalStorage();

// ************************************** FONCTION CREATION DE HEADING ***********************************

// Fonction pour récupérer les params et récuperer le OrderId pour notre numéro de commande.
// (Ligne  14 à 18)

function getOrderId() {
  const linkSearch = window.location.search;
  const urlParams = new URLSearchParams(linkSearch);
  return urlParams.get("orderId");
}

// ************************************** FONCTION DISPLAY ID ***********************************

// Fonction qui afficher le orderId. qu'on va afficher le numéro de bon de commande à la place de l'Id ("orderId").
// (Ligne 25 à 28)

function displayId(orderId) {
  const spanId = document.getElementById("orderId");
  spanId.textContent = orderId;
}

// ************************************** FONCTION SUPPRIMER LOCALSTORAGE  **********************************

// Fonction qui va supprimer le localStorage en fin de commande. (Ligne 34 à 37)

function clearLocalStorage() {
  const store = window.localStorage;
  store.clear();
}
