// ************************************** FONCTION LOAD DATA *******************************************

// Fonction qui va appeler la fonction fetch afin d'avoir la liste de produits sur le bon port.
// attendre le lien pendant le reste du site s'éxecute en même temps.
// On va recevoir la promesse qui contient le tableau contenant les données de nos produits.
// (Ligne 9 à 17)
// Appel de la fonction asynchrome qui va s'executer. (Ligne 22)

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

//Fonction ajout de produit. Ainsi que les fonctions qui ont servi à créer le body,
// seront regrouper à l'intérieur de cette fonction.
// Création d'éléments et ajouts des (fonctions) éléments enfants. (Ligne 30 à 47)

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

// Création de fonction qui sera appeler à la création de la balise <a>. (Ligne 53 à 57).

function createAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

// ************************************** FONCTION CREATION DE L'ID #ITEMS *************************************

// Création de fonction qui sera appeler à la création du id #items. (Ligne 63 à 66)

function parentId(pI) {
  const items = document.querySelector("#items");
  items.appendChild(pI);
}

// ************************************** FONCTION CREATION DE BALISE <img> ***********************************

// Fonction qui va fabriquer une balise <img>. (Ligne 72 à 77)

function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// ************************************** FONCTION CREATION DE HEADING ***********************************

// Fonction qui va fabriquer une balise <h3> et ajouter une classe "productName". (Ligne 83 à 88)

function tagH3(name) {
  const heading3 = document.createElement("h3");
  heading3.textContent = name;
  heading3.classList.add("productName");
  return heading3;
}

// ************************************** FONCTION CREATION DE TAG <p> ***********************************

// Fonction qui va fabriquer une balise <p> et ajouter une classe "productDescription".
// (Ligne 95 à 100)

function tagParagraph(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
}
