let productBasket = JSON.parse(localStorage.getItem("achatProduit"));

const productName = document.getElementById("productH2Count");
const h2Name = document.createElement("h2");
h2Name.classList.add("h2", "text-center", "text-primary");
if (productBasket) {
  if (productBasket.length >= 1) {
    constructionPanier(productBasket);
  } else {
    const h2Text = `Panier vide.`;
    h2Name.innerHTML = h2Text;
    productName.appendChild(h2Name);
    const productBasketNone = document.getElementById("productBasketList");
    const divProductItemNone = document.createElement("div");
    divProductItemNone.classList.add("row", "p-0", "m-0", "align-items-center");
    const productBasketNoneContent = `
    <div class="col text-center">
    <p>Le panier est vide</p>
    <a href="index.html" class="btn btn-block">revenir à l'accueil</a></div>
    `;
    divProductItemNone.innerHTML = productBasketNoneContent;
    productBasketNone.appendChild(divProductItemNone);
  }
}

function constructionPanier() {
  i = 0;
  productTotal = 0;
  const productBasketItem = document.getElementById("productBasketList");
  const divProductItem = document.createElement("div");
  divProductItem.classList.add("row", "align-items-center");
  productBasket.forEach((productItem) => {
    const productBasketItemContent = `            
              <div class="img_panier col-2 p-1"><img src="${productItem.productImageUrl}" alt="${productItem.productName}" class="w-100 "></div>
              <div class="col-md-2 p-1">1x ${productItem.productName}</div>
              <div class=" col-md-2 p-1">Varnish: "${productItem.productVarnish}"</div>
              <div class="col-2  p-1">${productItem.productPrice} €</div>
              `;
    divProductItem.innerHTML = productBasketItemContent;
    productBasketItem.appendChild(divProductItem);
    i++;
    productTotal = productTotal + productItem.productPrice;
    console.log(productTotal);
  });
  const productBasketTotal = document.getElementById("productBasketTotal");
  const divProductBasketTotal = document.createElement("div");
  const ProductBasketTotalContent = `
                <div class="col-6 p-0 m-0">pour un total de </div>
                <div class="col-6 p-0 m-0 text-right">${teddyTotalBasket}.00 €</div>`;
  divProductBasketTotal.innerHTML = ProductBasketTotalContent;
  productBasketTotal.appendChild(divProductBasketTotal);
}

const divProductBasketButtons = document.createElement("div");

divProductBasketButtons.setAttribute("id", ConfirmDeleteBasket);
const productBasketButtonContent = `
        <div class="col-sm-12 col-md-6 p-1"><a href="#" class="btn btn-success btn-block" id="validerAchat">Passer la commande</a></div>
        <div class="col-sm-12 col-md-6 p-1"><a href="#" class="btn btn-danger btn-block" id="supprimerProduct">Vider panier</a></div>`;
divProductBasketButtons.innerHTML = productBasketButtonContent;
productBasketTotal.appendChild(divProductBasketButtons);

const DeleteBasket = document.getElementById("supprimerProduct");
DeleteBasket.addEventListener("click", function (event) {
  event.preventDefault();
  $("#EmptyBasket").modal("show");
});

const ConfirmEmptyBasket = document.getElementById("ConfirmDeleteBasket");
ConfirmEmptyBasket.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  window.location.href = "panier.html";
});

const validerAchat = document.getElementById("validerAchat");
validerAchat.addEventListener("click", function (event) {
  event.preventDefault();
  $("#FormCommand").modal("show");
});

function displaySumPanier(productBasket) {
  let total = 0;
  for (i = 0; i < data[i].length; i++) {
    total += Number(data[i].price / 100);
  }
  console.log(data[i]);
}
