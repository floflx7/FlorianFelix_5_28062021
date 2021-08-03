const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetch("http://localhost:3000/api/furniture/" + id)
  .then((productSelected) => productSelected.json())
  .then((productSelected) => {
    ficheProduct(productSelected);
    addProductToBasketAndRedirect(productSelected);
    varnishProductOptions(productSelected);
  });

function ficheProduct(productSelected) {
  const productBox = document.getElementById("productBox");
  const divBox = document.createElement("div");
  divBox.innerHTML = `
          <div class="Box" mb-4>
        <img src="${productSelected.imageUrl}" alt="${productSelected.name}"
          <div class="product_description">
        <h2>${productSelected.name}</h2>
          <p div class="description">${productSelected.description}</p>
              
              <form id="AddToBasket">
                    <div class="form-group row text-center input-group is-invalid m-0 py-0 pb-3">
                        <select class="form-control-sm col-5 p-0" id="productVarnish" required>
                        </select>
                        <p class="card-text col-5 text-right font-weight-bold pr-0 pl-1"><strong>${
                          productSelected.price / 100
                        } €</strong></p>  
                    </div>
                    <button type="submit" name="add"  id="ok" >Ajouter au panier</button>
                </form>
            </div>
        </div>`;
  productBox.appendChild(divBox);
}

function varnishProductOptions(productSelected) {
  const productVarnishs = productSelected.varnish;
  const productVarnish = document.getElementById("productVarnish");
  productVarnishs.forEach((varnish) => {
    const varnishOption = document.createElement("option");
    varnishOption.setAttribute("value", varnish);
    varnishOption.innerHTML = varnish;
    productVarnish.appendChild(varnishOption);
  });
}

function addProductToBasketAndRedirect(productSelected) {
  const addProductToLocalStorage = document.getElementById("ok");
  addProductToLocalStorage.addEventListener("click", function (event) {
    event.preventDefault();
    $("#productAlertMessage").modal("show");

    productAcheter = {
      productName: productSelected.name,
      productVarnish: productVarnish.value,
      productId: productSelected._id,
      productQuantity: 1,
      productPrice: productSelected.price / 100,
      productImageUrl: productSelected.imageUrl,
    };
    modalAddProductToBasket(productSelected);
    addToBasketGoToIndex();
    addToBasketGoToBasket();
  });
}

function modalAddProductToBasket(productSelected) {
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
