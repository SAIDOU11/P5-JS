const url = "http://localhost:3000/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => addProduct(data));

function addProduct(dataProduct) {
  const id = dataProduct[0]._id;
  const imageUrl = dataProduct[0].imageUrl;
  const altTxt = dataProduct[0].altTxt;
  const name = dataProduct[0].name;
  const description = dataProduct[0].description;

  const article = tagArticle();
  const image = tagImage(imageUrl, altTxt);
  const anchor = createAnchor(id);
  const heading3 = tagH3(name);
  const paragraph = tagParagraph(description);

  inChild(anchor);
  anchor.appendChild(article);

  article.appendChild(image);
  article.appendChild(heading3);
  article.appendChild(paragraph);
  console.log(anchor);
}

function createAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

function inChild(iC) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(iC);
  }
}

// Va fabriquer une balise <article>
function tagArticle() {
  const article = document.createElement("article");
  const paragraph = tagParagraph();

  return article;
}

// Va fabriquer une balise <img>
function tagImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// Va fabriquer une balise <h3>
function tagH3(name) {
  const heading3 = document.createElement("h3");
  heading3.textContent = name;
  heading3.classList.add("productName");
  return heading3;
}

// Va fabriquer une balise <p>
function tagParagraph(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
}

/*

  (index.js) - 
  {
    ligne 1 à 5 -

      Appel fetch vers notre url des API - 

      Va nous permettre de récupérer nos produits vers notre lien API -

      On va vérifier le résultat attendu en se positionnant sur le bon post
      et lancer le test pour voir notre liste sur le port 3000 -
     }


      {
    ligne 7 à 11 -
        Fonction Ajout de produit - 
        Va nous permettre de récupérer le produit de notre choix dans le tableau
      }


      {
    ligne 13 à 17 -
      Fonction de createAnchor -
      Va nous permettre de créer un élément  -
      }


      {
    ligne 19 à 24 -
      Fonction inChild
      à l'intérieur de notre div #items notre fonction va placer la fonction createAnchor.
      }



    
  */
