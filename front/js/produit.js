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
  const addProductToLocalStorage = document.getElementById("ok");
  addProductToLocalStorage.addEventListener("click", function (event) {
    event.preventDefault();
    $("#productAlertMessage").modal("show");

    productAcheter = {
      productName: productPicked.name,
      productVarnish: productVarnish.value,
      productId: productPicked._id,
      productQuantity: 1,
      productPrice: productPicked.price / 100,
      productImageUrl: productPicked.imageUrl,
    };
    modalAddProductToBasket(productPicked);
    addToBasketGoToIndex();
    addToBasketGoToBasket();
  });
}

function modalAddProductToBasket(productPicked) {
  const productAlertMessage = document.getElementById("productAlertMessage");
  const productAlertMessageP = document.createElement("div");
  productAlertMessageP.classList.add("modal-dialog");
  productAlertMessageP.innerHTML = `
        <div class="modal-content">
            <div class="modal-header" text-center>
                <h3 class="modal-title h5" id="productAlertMessageModalTitle ">Produit ajouter au panier</h3>
            </div>
            <div class="modal-footer">
            <div class="row w-100 justify-content-spacebetween">
                <div class="col-6"><a href="index.html" class="btn btn-success btn-block" id="continuerAchat">Continuer achats</a></div>
                <div class="col-6"><a href="panier.html" class="btn btn-success btn-block" id="finaliserAchat">Voir mon panier</a></div>
            </div>
        </div>
    </div>`;
  productAlertMessage.appendChild(productAlertMessageP);
}

function addToBasketGoToIndex() {
  addProductGoIndex = document.getElementById("continuerAchat");
  addProductGoIndex.addEventListener("click", function (event) {
    firstAdd();
  });
}

function addToBasketGoToBasket() {
  const addProductGoBasket = document.getElementById("finaliserAchat");
  addProductGoBasket.addEventListener("click", function (event) {
    firstAdd();
  });
}

function firstAdd() {
  productAuPanier = JSON.parse(localStorage.getItem("achatProduit"));
  if (productAuPanier) {
    thenRedirect();
  } else {
    productAuPanier = [];
    thenRedirect();
  }
}

function thenRedirect() {
  productAuPanier.push(productAcheter);
  localStorage.setItem("achatProduit", JSON.stringify(productAuPanier));
}
