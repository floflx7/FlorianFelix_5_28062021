const numeroCommande = localStorage.getItem("numCommande");
const montantCommande = localStorage.getItem("montantCommande");
const test = JSON.parse(numeroCommande);
console.log(numeroCommande);
console.log(test.order);
const recapitulatifCommande = document.getElementById("recapitulatifCommande");
const recapDiv = document.createElement("div");

recapDiv.innerHTML = `
<div class="Box">
<div class="row justify-content-center ">
                Numéro :
                <strong>${test.order}</strong></div>
            
            <div class="row justify-content-center">
                Total :
                <strong>${montantCommande} €</strong></div> 
            <hr>
            <a
      role="button"
      class="btn_panier_vide text-center text-uppercase "
      href="./index.html"
      >Accueil</a
    >
        </div>
</div>
`;

recapitulatifCommande.appendChild(recapDiv);

localStorage.clear();
