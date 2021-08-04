let productBasket = JSON.parse(localStorage.getItem("achatProduit"));

const productName = document.getElementById("titrePage");

if (productBasket) {
  if (productBasket.length >= 1) {
    constructionPanier();
  } else {
    const h2Text = `Panier vide.`;
    h2Name.innerHTML = h2Text;
    productName.appendChild(h2Name);

    const divProductItemNone = document.createElement("div");

    const productNoneContent = `
    <p>Le panier est vide</p>
    <a href="index.html" class="btn btn-block">revenir à l'accueil</a>
    `;
    divProductItemNone.innerHTML = productNoneContent;
    productNone.appendChild(divProductItemNone);
  }
}

function constructionPanier() {
  i = 0;
  productTotal = 0;
  const productBasketItem = document.getElementById("productBasketList");

  productBasket.forEach((productItem) => {
    const divProductItem = document.createElement("div");
    const productBasketItemContent = `            
              <div class="box_panier d-flex align-items-center">
            <div class="img_panier"><img src="${productItem.productImageUrl}" alt="${productItem.productName}" class="w-100"></div>
              <div class="col-md-2 p-1 ">${productItem.productName}</div>
              <div class=" col-md-2 p-1 ">Vernis:"${productItem.productVarnish}"</div>
              <div class="col-2  p-1"><strong>${productItem.productPrice} €</strong></div></div>
              <hr>
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
                
                total: <strong>${productTotal} €</strong>`;
  divProductBasketTotal.innerHTML = ProductBasketTotalContent;
  productBasketTotal.appendChild(divProductBasketTotal);
}

const divProductBasketButtons = document.createElement("div");

divProductBasketButtons.setAttribute("id", ConfirmDeleteBasket);
const productBasketButtonContent = `
        <div class="boutons_panier">
<a href="#" class="btn_panier" id="validerAchat">Passer la commande</a>
       <a href="#" class="btn_panier"id="supprimerProduct">Vider le panier</a></div>`;
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
