// let dataProducts = [];

// const dataFetch = async () => {
//   await fetch(`http://localhost:3000/api/products`)
//     .then((res) => res.json())
//     .then((data) => {
//       dataProducts = data;
//       console.table(dataProducts);
//     })
//     .catch((error) => console.error(error));
// };

// const displayProducts = async () => {
//   await dataFetch();
// };

// displayProducts();
// const displayCart = async () => {};

// displayCart();

//

// QUI PERMET D'ENREGISTRER LE PANIER DANS LE LOCALSTORAGE
//(basket) QUEL PANIER ON VEUT ENREGISTRER

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// ON VA RECUPERER UN ITEM de la fonction saveBasket ("basket")

function getBasket() {
  return JSON.parse(localStorage.getItem("basket"));
}

// FONCTION AJOUT AU PANIER
function addBasket(product) {
  let basket = getBasket(); // RECUPERER LE PANIER QUI EXISTE DANS LE LOCALSTORAGE
  basket.push(product); // ON LUI AJOUTE LE PRODUIT
  saveBasket(basket); // ON ENREGISTRE LE NOUVEAU PANIER
}

// *********************************************************************************************************

/*


function getBasket(cart) {
  const url = "http://localhost:3000/api/products";
  fetch(url)
    .then((result) => result.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
for (let i = 0; i < nbOfProducts; i++) {  
  const nbOfProducts = localStorage.length; //storage but from fetch id not from local
 
    const product = localStorage.getItem(localStorage.key(i));
    const parseTable = JSON.parse(product);
    cart.push(parseTable);
}
} 



// *********************************************************************************************************

function addBasket(id, item) {

let basket =   setBasket(item);

  const findProduct = cart.find((product) => product.id == id);
  if (findProduct != undefined) {
    findProduct.quantity++;
  } else {
    findProduct.quantity = 1;
  }
  divSettings(item);
  displayTotalPrice(price);
  displayTotalQuantity();

}

// *********************************************************************************************************

 const url = "http://localhost:3000/api/products";
  fetch(url)
    .then((result) => result.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
*/
