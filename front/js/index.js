// FETCH QUI VA APPELER L'AJOUT DE PRODUIT
const url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => addProduct(data));

// FONCTION AJOUT DE PRODUIT
function addProduct(product) {
  // CONSTANTES QUI VONT RÉCUPÉRER LES DONNÉES
  // const id = dataProducts[0]._id;
  // const imageUrl = dataProducts[0].imageUrl;
  // const altTxt = dataProducts[0].altTxt;
  // const name = dataProducts[0].name;
  // const description = dataProducts[0].description;

  console.log(product);

  // BOUCLE FOREACH
  product.forEach((productNum) => {
    console.log("Produit numéro : ", productNum);

    const { _id, imageUrl, altTxt, name, description } = productNum;

    // FONCTIONS APPELER (CRÉATION)
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
  if (items != null) {
    items.appendChild(pI);
  }
}

// Va fabriquer une balise <img> à l'intérieur de son parent #
function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// Va fabriquer une balise <h3> et une classe "productName"
function tagH3(name) {
  const heading3 = document.createElement("h3");
  heading3.textContent = name;
  heading3.classList.add("productName");
  return heading3;
}

// Va fabriquer une balise <p> et une classe "productDescription"
function tagParagraph(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
}
