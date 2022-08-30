/* FONCTION ASYNCHRONE VA RETOURNER LA PROMESSE 
(AWAIT) VA ATTENDRE QUE LA RESOLUTION DE LA PROMESSE FETCH SOIT ARRIVER AVANT D'AGIR
*/

const loadData = async () => {
  const url = "http://localhost:3000/api/products";
  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => addProducts(data));
}; /* ******************************* 

rajouter catch. 
enlever price localstorage

  ******************************* */
loadData();

// FONCTION AJOUT DE PRODUIT.. NOS FONCTIONS SERONT REGROUPER Á l'INTERIEUR DE CETTE FONCTION
function addProducts(allProducts) {
  // BOUCLE FOREACH .. POUR CHAQUE PRODUIT ON VA EXERCER LA FONCTION
  // POUR QUE TOUS LES ÉLÉMENTS DU TABLEAU SOIT AFFICHER DE LA MÊME MANIERE
  allProducts.forEach((product) => {
    const { _id, imageUrl, altTxt, name, description } = product;

    // // FONCTIONS APPELER POUR LA CRÉATION DU DIV DE CHAQUE BALISE
    const anchor = createAnchor(_id);
    const article = document.createElement("article");
    const image = tagImage(imageUrl, altTxt);
    const heading3 = tagH3(name);
    const paragraph = tagParagraph(description);

    // PARENT ID # DANS L'ANCRE <A>
    parentId(anchor);
    anchor.appendChild(article);

    // AJOUT D'ENFANTS
    article.appendChild(image);
    article.appendChild(heading3);
    article.appendChild(paragraph);
  });
}

// Création de fonction qui sera appeler à la création de la balise <a>
function createAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

// Création de fonction qui sera appeler à la création du id #items
function parentId(pI) {
  const items = document.querySelector("#items");
  items.appendChild(pI);
}

// Fonction qui va fabriquer une balise <img> à l'intérieur de son parent #
function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// Fonction qui va fabriquer une balise <h3> et une classe "productName"
function tagH3(name) {
  const heading3 = document.createElement("h3");
  heading3.textContent = name;
  heading3.classList.add("productName");
  return heading3;
}

// Fonction qui va fabriquer une balise <p> et une classe "productDescription"
function tagParagraph(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
}
