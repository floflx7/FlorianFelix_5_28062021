// const baseURL = "http://localhost:3000/api";

// requête AJAX
// function getProducts(uri) {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", baseURL + uri);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 3) {
//       if (xhr.status == 200) {
//         const response = JSON.parse(xhr.responseText);
//         console.log(response);
//         displayProducts(response);
//       } else {
//         console.log("une erreur s'est produite");
//       }
//     }
//   };
//   xhr.send();

//   //Si le serveur ne répond pas
//   xhr.onerror = function () {
//     console.log("impossible de se connecter au serveur");
//     document.querySelector(".serverIsDown").style.display = "block";
//   };
// }

function getProducts(uri) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", baseURL + uri);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 3) {
      if (xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        displayProducts(response);
      } else {
        console.log("une erreur s'est produite");
      }
    }
  };
  xhr.send();

  //Si le serveur ne répond pas
  xhr.onerror = function () {
    console.log("impossible de se connecter au serveur");
    document.querySelector(".serverIsDown").style.display = "block";
  };
}

const titre = document.getElementById("titre_produits").innerHTML;

const prix = document.getElementById("prix_produits");

const description = document.getElementById("description");

let products = [];

const fetchProducts = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (products = data));

  console.log(products);
};

const productDisplay = async () => {
  await fetchProducts();

  document.body.innerHTML += products
    .map(
      (product) =>
        `
    <div class="box">
    <a href="./page_produit.html?_id=${product._id}"><img src="${
          product.imageUrl
        }" alt="${product.name}"></a>
    
      <h2>${product.name}</h2>
    <p>${product.price / 100}.00 €</p>
    <p>${product.description}</p>
    <a href="./page_produit.html?_id=${
      product._id
    }" class="btn btn-secondary">Acheter ce produit</a>
    </div>
  `
    )
    .join("");
};

productDisplay();
