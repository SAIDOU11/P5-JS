/* LOCAL STORAGE = API qui existe dans les navigateurs qui permet de conserver des données.
Un peu comme les cookies mais en plus sécuriser et plus optimiser.
L'idée c'est qu'on peut enregistrer une valeur associer à une clé.
 clé : "basket"
 valeur : c'est la variable basket

 Une fois enregistrer on peut le récuperer dans le localStorage est le réutiliser par la suite
*/

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

saveBasket("dldldl");
// JSON.stringify ça va transformer quelque chose de complèxe comme un tableau où un objet en chaine de caractère.
/* 
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return []; // Panier (tableau) est vide
  } else {
    return JSON.parse(basket);
  }
}

// JSON.parse ça va permettre de transformer la chaine de caractère en objet, en tableau où données complèxe

function addBasket(product) {
  let basket = getBasket();
  basket.push(product); // Basket est un tableau .. on pousse le produit
  saveBasket(basket);
  console.table(basket);
}



Concept du panier c'est un élément dans lequel on va avoir des produits
NB de produits indéfini.

function basketCart(){
const selectedQuantity = document.querySelector("...").value
const oldQuantity = localStorage.getitem("...").quantity || 0
const newQuantity = Number(selectedQuantity) + oldQuantity
const item = { ...item, quantity: newQuantity }
localStorage.setItem("...", JSON.stringify(item)

const div = document.createElement("div");
div.addEventListener("click", myFunction);
div.innerHTML = "super longue string HTML";
}


*/
