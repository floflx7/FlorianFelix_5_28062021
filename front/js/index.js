// appel de l'Api avec fetch

fetch("http://localhost:3000/api/furniture")
  .then((product) => product.json())
  .then((product) => {
    displayProducts(product);
    //console.log(product);
  });

// Création de la fonction visant à créer des box avec les informations des produits
function displayProducts(product) {
  const mainProduct = document.getElementById("products_list");
  product.forEach((product) => {
    const divProduct = document.createElement("div");
    divProduct.innerHTML = `
    <div class="box">
        <img src="${product.imageUrl}" alt="${product.name}">
          <h3>${product.name}</h3>
              <p><strong>${product.price / 100} €</strong></p>
              <p class="product_description">${product.description}</p>
              <a role="button"class="btn_panier text-center text-uppercase "
              href="produit.html?id=${product._id}">Acheter</a>
            </div>`;

    mainProduct.appendChild(divProduct);
  });
}
