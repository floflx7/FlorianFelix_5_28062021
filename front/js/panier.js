// Récupération des produits choisis
let productBasket = JSON.parse(localStorage.getItem("achatProduit"));

// Création du tableau products
let products = [];

const productName = document.getElementById("titrePage");
const h2Name = document.createElement("h2");
const emptyBasket = document.getElementById("emptyBasket");

// Création d'une condition, panier vide ou création du panier
if (productBasket < 1) {
} else {
  emptyBasket.classList.add("d-none");
  constructionPanier();
}

// Création du panier
function constructionPanier() {
  i = 0;
  productTotal = 0;
  const productBasketItem = document.getElementById("productBasketList");

  // Pour chaques produits afficher:
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

    // Création de productTotal (prix total)
    productTotal = productTotal + productItem.productPrice;

    // id de produit récupérer et envoi vers le tableau products
    products.push(productItem.productId);
  });

  // Affichage de productTotal
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

  const formulaireShow = document.querySelector(".box_panier_entier");
  const validerAchat = document.getElementById("validerAchat");
  const divBox = document.createElement("div");
  validerAchat.addEventListener("click", function (event) {
    event.preventDefault();
    divBox.innerHTML = `
    <div class="form_box">
    <button class="fermerFormulaire">Annuler</button>
    <form action="confirmation_commande.html" class="formulaireCommande">
            <h3>Formulaire de commande</h3>
            
            <div class="align-items-center">
              <hr />
              <div class="form-group row">
                <label for="formNom" class="col-sm-2 col-form-label">Nom</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control form-control-sm bg-light"
                    id="formNom"
                    required
                  />
                </div>
                <label for="formPrenom" class="col-sm-2 col-form-label"
                  >Prenom</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control form-control-sm bg-light"
                    id="formPrenom"
                    required
                  />
                </div>
                <label for="formAdress" class="col-sm-2 col-form-label"
                  >Adresse</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control form-control-sm bg-light"
                    id="formAdress"
                    required
                  />
                </div>
                <label for="formAdress" class="col-sm-2 col-form-label"
                  >Ville</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control form-control-sm bg-light"
                    id="formCity"
                    required
                  />
                </div>
                <label for="formEmail" class="col-sm-2 col-form-label"
                  >E-mail</label
                >
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control form-control-sm bg-light"
                    id="formEmail"
                    required
                  />
                </div>
                <button id="formSubmit" class="btn_panier" type="submit">
                  confirmer commande
                </button>
              </div>
            </div>
          </form>
          </div>
    `;
    formulaireShow.appendChild(divBox);
  });

  function fermerFormulaireAnd() {
    const fermerFormulaire = document.querySelector(".fermerFormulaire");
    const formBox = document.getElementsByClassName("form_box");
    fermerFormulaire.addEventListener("click", function (event) {
      event.preventDefault();
      formBox.style.display = "none";
    });
  }
  

  const regexFirstName =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

  const regexLastName =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

  const regexCity =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;

  const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

  const myForm = document.getElementById("formSubmit");
  myForm.addEventListener("click", function (event) {
    event.preventDefault();

    const contact = {
      firstName: document.getElementById("formNom").value,
      lastName: document.getElementById("formPrenom").value,
      address: document.getElementById("formAdress").value,
      city: document.getElementById("formCity").value,
      email: document.getElementById("formEmail").value,
    };

    if (
      regexFirstName.test(contact.firstName) == true ||
      regexLastName.test(contact.lastName) == true ||
      regexCity.test(contact.city) == true ||
      regexAddress.test(contact.adress) == true ||
      regexMail.test(contact.mail) == true
    ) {
      let result = { contact, products };

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
        .then((response) => {
          let numeroCommande = {
            order: response.orderId,
          };

          let contactCommande = {
            contact: contact,
          };

          localStorage.setItem(
            "numeroCommande",
            JSON.stringify(numeroCommande)
          );
          localStorage.setItem(
            "contactCommande",
            JSON.stringify(contactCommande)
          );

          window.location = "confirmation_commande.html";
          localStorage(clear);
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
