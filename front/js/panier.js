// Récupération des produits choisis
let productBasket = JSON.parse(localStorage.getItem("achatProduit"));
let nombreProduct = JSON.parse(localStorage.getItem("nombreProduits"));

// Création du tableau products
let products = [];

const productName = document.getElementById("titrePage");
const h2Name = document.createElement("h2");
const emptyBasket = document.getElementById("emptyBasket");

// Création d'une condition, si un produit ou plus dans le tableau déclencher productToBasket sinon afficher panier vide
if (nombreProduct != null) {
  constructionPanier();
} else {
  const titre_panier = document.querySelector(".titre_panier");
  document.querySelector(".box_panier_entier").innerHTML = `
  <div class="panier_vide">
  <h1 class="align-items-center">Votre panier est vide <i class="fas fa-times"></i></h1>
  <a role="button"class="btn_panier text-center text-uppercase "
  href="index.html">ACCUEIL</a></div>`;
  titre_panier.style.display = "none";
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
              <div class="">Vernis: "${productItem.productVarnish}"</div>
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

  //Affichage bouton vider panier
  const divProductBasketButtons = document.createElement("div");
  divProductBasketButtons.setAttribute("id", ConfirmDeleteBasket);
  const productBasketButtonContent = `
        <div class="boutons_panier">
<a href="#" class="btn_panier" id="validerAchat">Passer la commande</a>
       <a href="#" class="btn_panier"id="supprimerProduct">Vider le panier</a></div>`;
  divProductBasketButtons.innerHTML = productBasketButtonContent;
  productBasketTotal.appendChild(divProductBasketButtons);

  // Afficher modal vider panier ou non
  const viderPanier = document.getElementById("supprimerProduct");
  viderPanier.addEventListener("click", function (event) {
    event.preventDefault();
    $("#EmptyBasket").modal("show");
  });

  // Local storage clear et redirection vers index.html
  const confirmViderPanier = document.getElementById("ConfirmDeleteBasket");
  confirmViderPanier.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "index.html";
  });

  // Affichage du formulaire de commande
  const formulaireShow = document.querySelector(".formulaireCommande");
  const validerAchat = document.getElementById("validerAchat");
  validerAchat.addEventListener("click", function (event) {
    event.preventDefault();
    formulaireShow.style.display = "block";
  });

  // Bouton annuler formulaire
  const fermerFormulaire = document.querySelector(".fermerFormulaire");
  fermerFormulaire.addEventListener("click", function (event) {
    event.preventDefault();
    formulaireShow.style.display = "none";
    $("#form")[0].reset();
  });

  // Regex pour vérification du formulaire
  const regexFirstName =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

  const regexLastName =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

  const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

  const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

  // bouton submit formulaire
  const myForm = document.getElementById("formSubmit");
  myForm.addEventListener("click", function (event) {
    event.preventDefault();

    // Objet contact
    const contact = {
      firstName: document.getElementById("formNom").value,
      lastName: document.getElementById("formPrenom").value,
      address: document.getElementById("formAdress").value,
      city: document.getElementById("formCity").value,
      email: document.getElementById("formEmail").value,
    };

    //Vérification des champs du formulaire avec regex
    if (
      regexFirstName.test(contact.firstName) == true &&
      regexLastName.test(contact.lastName) == true &&
      regexCity.test(contact.city) == true &&
      regexAddress.test(contact.address) == true &&
      regexMail.test(contact.email) == true
    ) {
      // Création objet result regroupant contact et products id
      let result = { contact, products };

      // Méthode POST
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
          // Création de l'objet numeroCommande récupération de orderId
          let numeroCommande = {
            order: response.orderId,
          };

          // Création de l'objet contactCommande
          let contactCommande = {
            contact: contact,
          };

          //Envoi de productTotal et des objets numeroCommande, dans le local storage
          localStorage.setItem(
            "numeroCommande",
            JSON.stringify(numeroCommande)
          );
          localStorage.setItem(
            "contactCommande",
            JSON.stringify(contactCommande)
          );

          localStorage.setItem("montantCommande", productTotal);

          //On vide le local storage
          window.location = "confirmation_commande.html";
          localStorage(clear);
        })
        .catch((error) => {
          console.error("error", error);
        });
      //Si le formulaire n'est pas correctement rempli affichage d'une alert
    } else {
      console.log(contact);
      alert("Veuillez correctement remplir le formulaire");
      return false;
    }
  });
}
