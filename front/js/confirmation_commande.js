//Récupération des éléments du localStorage
const numeroCommande = JSON.parse(localStorage.getItem("numeroCommande"));
const montantCommande = localStorage.getItem("montantCommande");
const contactCommande = JSON.parse(localStorage.getItem("contactCommande"));
const recapitulatifCommande = document.getElementById("recapitulatifCommande");
const recapDiv = document.createElement("div");

//Affichage de la commande
recapDiv.innerHTML = `
<div class="Box_conf">
<h1 class="text-center">Commande confirmée</h1>
<i class="far fa-check-circle"></i>
<div class="row justify-content-center ">
                Numéro :
                <strong>${numeroCommande.order}</strong></div>
            
            <div class="row justify-content-center">
                Total :
                <strong>${montantCommande} €</strong></div> 
            <hr>
            <div class="row justify-content-center ">
            Adresse de livraison :</div>
            <div class="row justify-content-center ">
            <strong>${contactCommande.contact.address}, 
        ${contactCommande.contact.city}</strong> </div>
        <div class="row justify-content-center ">Contact :</div>
        <div class="row justify-content-center ">
        <strong>${contactCommande.contact.email}</strong> </div>
        <hr>
            <a
      role="button" class="btn_panier  text-center text-uppercase "
      href="./index.html">Accueil</a>
    </div>
</div>
`;

recapitulatifCommande.appendChild(recapDiv);

localStorage.clear();