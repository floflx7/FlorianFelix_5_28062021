// appel de l'Api avec fetch

fetch("http://localhost:3000/api/furniture")
  .then((productsList) => productsList.json())
  .then((productsList) => {
    tableauProducts(productsList);
  });

// Création de la fonction visant à créer des box avec les informations des produits
function tableauProducts(productsList) {
  const mainProduct = document.getElementById("products_list");
  productsList.forEach((productList) => {
    const divProduct = document.createElement("div");
    divProduct.innerHTML = `
    <div class="box">
    <a href="produit.html?id=${productList._id}">        
    <img src="${productList.imageUrl}" alt="${productList.name}">
    </a>
        <h3>${productList.name}</h3>
              <p><strong>${productList.price / 100} €</strong></p>
              <p class="product_description">${productList.description}</p>
            </div>`;

    mainProduct.appendChild(divProduct);
  });
}
