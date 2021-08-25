const numeroCommande = localStorage.getItem("commande");
const montantCommande = localStorage.getItem("montantCommande");

console.log(numeroCommande);

const recapitulatifCommande = document.getElementById("recapitulatifCommande");
const recapDiv = document.createElement("div");
recapDiv.classList.add("col-12", "col-md-8", "col-lg-6", "mb-3");
recapDiv.innerHTML = `
    <div class="row">
                <div class="col-sm-4 col-md-3 text-center">Numéro :</div>
                <div class="col user-select-all">${numeroCommande}</div>
            </div>
            <div class="row">
                <div class="col-sm-4 col-md-3">Montant :</div>
                <div class="col">${montantCommande} €</div> 
            </div>
        </div>
        
    `;
recapitulatifCommande.appendChild(recapDiv);

localStorage.clear();
