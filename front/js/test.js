const dataProducts = { id, imageUrl, altTxt, name, description };

dataProducts.array.forEach((products) => {});

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
