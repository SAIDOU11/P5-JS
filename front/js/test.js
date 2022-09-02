// fetch(`http://localhost:3000/api/products`)
//   .then((file) => file.json())
//   .then((data) => console.log(data));

// .then;
// async (response) => {
//   try {
//     response.json().then((res) => displayTotalPrice(res));
//   } catch (error) {
//     console.log(error);
//   }
// };

// ************************************** FONCTION LOAD DATA *******************************************

// Fonction qui va appeler la fonction fetch afin d'avoir la liste de produits sur le bon port.
// Appel de la fonction
// (ligne 7 à 15)

const getPriceFromData = async () => {
  const url = "http://localhost:3000/api/products";
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      document.getElementById("totalPrice").innerHTML(`${data.price}`);
    })
    .catch((err) => console.log(err));
};

getPriceFromData();

// findPrice(allProducts){
//   allProducts.forEach((product) => {
//   const { _id, imageUrl, altTxt, name, price, description } = product;

// }
//   )
// }
