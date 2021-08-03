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

fetch("http://localhost:3000/api/furniture")
  .then((productsList) => productsList.json())
  .then((productsList) => {
    tableauProducts(productsList);
  });

function tableauProducts(productsList) {
  const mainProduct = document.getElementById("products_list");
  productsList.forEach((productList) => {
    const divProduct = document.createElement("div");
    divProduct.innerHTML = `
    <div class="box">
    <a href="produit.html?id=${productList._id}">        
    <img src="${productList.imageUrl}" alt="${productList.name}">
    </a>
        <h3>${productList.name}</h3>
              <p><strong>${productList.price / 100} €</strong></p>
              <p class="product_description">${productList.description}</p>
            </div>`;

    mainProduct.appendChild(divProduct);
  });
}
