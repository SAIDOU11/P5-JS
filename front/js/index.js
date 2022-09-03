// ************************************** FONCTION LOAD DATA *******************************************

// Fonction qui va appeler la fonction fetch afin d'avoir la liste de produits sur le bon port.
// Appel de la fonction
// (ligne 7 à 15)

let dataTable = [];

const loadData = async () => {
  const url = "http://localhost:3000/api/products";
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataTable = data;
      addProducts(dataTable);
    })
    .catch((error) => console.error(error));
};

loadData();

// ************************************** FONCTION AJOUT DE PRODUITS *******************************************

//Fonction ajout de produit. Nos fonctions seront regrouper à l'intérieur de cette fonction.
// Création d'éléments et ajouts des fonctions enfants. (ligne 22 à 39)

function addProducts(dataTable) {
  dataTable.forEach((product) => {
    const { _id, imageUrl, altTxt, name, description } = product;

    const anchor = createAnchor(_id);
    const article = document.createElement("article");
    const image = tagImage(imageUrl, altTxt);
    const heading3 = tagH3(name);
    const paragraph = tagParagraph(description);

    parentId(anchor);
    anchor.appendChild(article);

    article.appendChild(image);
    article.appendChild(heading3);
    article.appendChild(paragraph);
  });
}

// ************************************** FONCTION CREATION DE L'ANCRE <a> *************************************

// Création de fonction qui sera appeler à la création de la balise <a>. (ligne 45 à 49).

function createAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

// ************************************** FONCTION CREATION DE L'ID #ITEMS *************************************

// Création de fonction qui sera appeler à la création du id #items. (ligne 55 à 58)

function parentId(pI) {
  const items = document.querySelector("#items");
  items.appendChild(pI);
}

// ************************************** FONCTION CREATION DE BALISE <img> ***********************************

// Fonction qui va fabriquer une balise <img>. (ligne 64 à 69)

function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// ************************************** FONCTION CREATION DE HEADING ***********************************

// Fonction qui va fabriquer une balise <h3> et ajouter une classe "productName". (ligne 75 à 80)

function tagH3(name) {
  const heading3 = document.createElement("h3");
  heading3.textContent = name;
  heading3.classList.add("productName");
  return heading3;
}

// ************************************** FONCTION CREATION DE TAG <p> ***********************************

// Fonction qui va fabriquer une balise <p> et ajouter une classe "productDescription".
// (ligne 87 à 92)

function tagParagraph(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
}
