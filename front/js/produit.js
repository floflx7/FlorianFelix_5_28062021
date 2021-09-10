//Récupération id produit
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetch("http://localhost:3000/api/furniture/" + id)
  .then((productPicked) => productPicked.json())
  .then((productPicked) => {
    BoxProduct(productPicked);
    addProductToBasketAndRedirect(productPicked);
    addVarnishs(productPicked);
  });

//Création de box avec le produit choisi
function BoxProduct(productPicked) {
  const divBox = document.createElement("div");
  divBox.innerHTML = `
    <div class="Box">
      <h1>${productPicked.name}</h1>
      <img src="${productPicked.imageUrl}" alt="${productPicked.name}"
      <div class="product_description">
        <p div class="description">${productPicked.description}</p>
            <div class="prix">
              <select class="form-control-sm col-5 p-0" id="productVarnish" required>
              </select>
                  <p class="col-sm"><strong>${
                    productPicked.price / 100
                  } €</strong></p>  
                    </div>
                    <button class="btn_panier" type="submit" name="add"  id="boutonAchat" >Ajouter au panier</button>
                    <div class="confirmation_produit">
                    <p>produit ajouté au panier</p>
                    <a href="index.html" id="index">accueil</a>
                    <a href="panier.html" id="panier">panier</a>
                </div>
            </div>
      </div>`;
  productBox.appendChild(divBox);
}

//fonction qui permet d'afficher les différents vernis
function addVarnishs(productPicked) {
  const varnishOption = document.getElementById("productVarnish");
  for (let varnish of productPicked.varnish) {
    varnishOption.innerHTML += `<option value="${varnish}">${varnish}</option>`;
  }
}

//fonction qui permet d'envoyer l'object du produit vers le panier
function addProductToBasketAndRedirect(productPicked) {
  const button_product = document.getElementById("boutonAchat");
  button_product.addEventListener("click", function (event) {
    event.preventDefault();
    productObj = {
      productName: productPicked.name,
      productVarnish: productVarnish.value,
      productId: productPicked._id,
      productQuantity: 1,
      productPrice: productPicked.price / 100,
      productImageUrl: productPicked.imageUrl,
    };
    confirmation();
    ajoutProduit();
  });
}

//fonction qui permet l'affichage du boutton vers panier ou accueil
function confirmation() {
  const button_product = document.getElementById("boutonAchat");
  const confirmationProduit = document.querySelector(".confirmation_produit");
  button_product.style.display = "none";
  confirmationProduit.style.display = "block";
}

//Si produit dans productToBasket on appel la fonction envoiPanier
//sinon on créé le tableau productToBasket et appel envoiPanier
function ajoutProduit() {
  productToBasket = JSON.parse(localStorage.getItem("achatProduit"));
  if (productToBasket) {
    envoiPanier();
  } else {
    productToBasket = [];
    envoiPanier();
  }
}

//Envoi de l'objet product et de nombre produits dans le local storage
function envoiPanier() {
  const nombreProduits = productToBasket.length;
  productToBasket.push(productObj);
  localStorage.setItem("achatProduit", JSON.stringify(productToBasket));
  localStorage.setItem("nombreProduits", JSON.stringify(nombreProduits));
}
