const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetch("http://localhost:3000/api/furniture/" + id)
  .then((productPicked) => productPicked.json())
  .then((productPicked) => {
    BoxProduct(productPicked);
    addProductToBasketAndRedirect(productPicked);
    varnishProductOptions(productPicked);
  });

function BoxProduct(productPicked) {
  const productBox = document.getElementById("productBox");
  const divBox = document.createElement("div");
  divBox.innerHTML = `
          <div class="Box">
        <img src="${productPicked.imageUrl}" alt="${productPicked.name}"
      <div class="product_description">
        <h2>${productPicked.name}</h2>
          <p div class="description">${productPicked.description}</p>
            <form id="AddToBasket">
              <div class="form-group row text-center input-group is-invalid m-0 py-0 pb-3">
                  <select class="form-control-sm col-5 p-0" id="productVarnish" required>
                    </select>
                        <p class="card-text col-5 text-right font-weight-bold pr-0 pl-1"><strong>${
                          productPicked.price / 100
                        } €</strong></p>  
                    </div>
                    <button type="submit" name="add"  id="ok" >Ajouter au panier</button>
                    <div class="confirmation_produit">
                    <p>produit ajouté au panier</p>
                    <a href="index.html" id="index">accueil</a>
                    <a href="panier.html" id="panier">panier</a>
                    </div>
                </form>
                
            </div>
        </div>`;
  productBox.appendChild(divBox);
}

function varnishProductOptions(productPicked) {
  const productVarnishs = productPicked.varnish;
  const productVarnish = document.getElementById("productVarnish");
  productVarnishs.forEach((varnish) => {
    const varnishOption = document.createElement("option");
    varnishOption.setAttribute("value", varnish);
    varnishOption.innerHTML = varnish;
    productVarnish.appendChild(varnishOption);
  });
}

function addProductToBasketAndRedirect(productPicked) {
  const button_product = document.getElementById("ok");
  button_product.addEventListener("click", function (event) {
    event.preventDefault();

    productAcheter = {
      productName: productPicked.name,
      productVarnish: productVarnish.value,
      productId: productPicked._id,
      productQuantity: 1,
      productPrice: productPicked.price / 100,
      productImageUrl: productPicked.imageUrl,
    };
    confirmation();
    addToBasketGoToIndex();
    addToBasketGoToBasket();
  });
}

function confirmation() {
  const button_product = document.getElementById("ok");
  const confirmationProduit = document.querySelector(".confirmation_produit");
  button_product.addEventListener("click", function (event) {
    event.preventDefault();
    confirmationProduit.style.display = "block";
    button_product.style.display = "none";
  });
}

function addToBasketGoToIndex() {
  const button_product = document.getElementById("ok");
  button_product.addEventListener("click", function (event) {
    firstAdd();
  });
}

function addToBasketGoToBasket() {
  const button_product = document.getElementById("ok");
  button_product.addEventListener("click", function (event) {
    firstAdd();
  });
}

function firstAdd() {
  productToBasket = JSON.parse(localStorage.getItem("achatProduit"));
  if (productToBasket) {
    thenRedirect();
  } else {
    productToBasket = [];
    thenRedirect();
  }
}

function thenRedirect() {
  productToBasket.push(productAcheter);
  localStorage.setItem("achatProduit", JSON.stringify(productToBasket));
}
