let productBasket = JSON.parse(localStorage.getItem("achatProduit"));

//
//let currentUrl = window.location.href;
//console.log(currentUrl);
// Trouver l'id de la commande et le prix total envoyé dans l'url
//const urlOrder = currentUrl.split("=");
//console.log(urlOrder);
//const orderId = urlOrder[1](0, urlOrder[1].length - 6);
//const orderPrice = urlOrder[2];

//console.log("orderId", orderId);

let products = [];

const productName = document.getElementById("titrePage");
const h2Name = document.createElement("h2");
const emptyBasket = document.getElementById("emptyBasket");

if (productBasket < 1) {
} else {
  emptyBasket.classList.add("d-none");
  constructionPanier();
}

function confirmation() {
  const panierVide = document.getElementsById("message_panier_vide");
  button_product.addEventListener("click", function (event) {
    event.preventDefault();
    panierVide.style.display = "block";
  });
}

function constructionPanier() {
  i = 0;
  productTotal = 0;
  const productBasketItem = document.getElementById("productBasketList");

  productBasket.forEach((productItem) => {
    const divProductItem = document.createElement("div");
    const productBasketItemContent = `            
              <div class="box_panier d-flex align-items-center ">
            <div class="img_panier"><img src="${productItem.productImageUrl}" alt="${productItem.productName}" class="w-100"></div>
              <div class="">${productItem.productName}</div>
              <div class="">Vernis:"${productItem.productVarnish}"</div>
              <div class=""><strong>${productItem.productPrice} €</strong></div></div>
              <hr>
              `;

    divProductItem.innerHTML = productBasketItemContent;
    productBasketItem.appendChild(divProductItem);
    i++;
    productTotal = productTotal + productItem.productPrice;

    products.push(productItem);
  });
  const productBasketTotal = document.getElementById("productBasketTotal");
  const divProductBasketTotal = document.createElement("div");
  const ProductBasketTotalContent = `
                <div class="total">
                total: <strong>${productTotal} €</strong>
                </div>`;
  divProductBasketTotal.innerHTML = ProductBasketTotalContent;
  productBasketTotal.appendChild(divProductBasketTotal);

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

  const formulaireShow = document.querySelector(".formulaireCommande");
  const validerAchat = document.getElementById("validerAchat");
  validerAchat.addEventListener("click", function (event) {
    event.preventDefault();
    formulaireShow.style.display = "block";
  });

  const fermerFormulaire = document.querySelector(".fermerFormulaire");
  fermerFormulaire.addEventListener("click", function (event) {
    event.preventDefault();
    formulaireShow.style.display = "none";
  });

  const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

  const regexFirstName =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

  const regexCity =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;

  const regexAdress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

  const myForm = document.getElementById("formSubmit");
  myForm.addEventListener("click", function (event) {
    event.preventDefault();

    const contact = {
      name: document.getElementById("formNom").value,
      firstName: document.getElementById("formPrenom").value,
      adress: document.getElementById("formAdress").value,
      city: document.getElementById("formCity").value,
      email: document.getElementById("formEmail").value,
    };
 
    if (
      regexName.test(contact.name) == true ||
      regexFirstName.test(contact.firstName) == true ||
      regexCity.test(contact.city) == true ||
      regexAdress.test(contact.city) == true ||
      regexMail.test(contact.mail) == true
    ) {
      const result = { contact, products };

      localStorage.setItem("montantCommande", productTotal);

      fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8 ",
        },
        body: JSON.stringify(result),
      })
        //réponse du serveur
        .then((response) => response.json())
        .then((result) => {
          let objCommande = {
            idCommande: result.orderId,
            contact: contact,
          };

          let commande = JSON.stringify(objCommande);
          localStorage.setItem("commande", commande);
        })
        .catch((error) => {
          console.error("error", error);
        });
    } else {
      alert("Veuillez correctement remplir le formulaire");
      return false;
    }
  });
}
