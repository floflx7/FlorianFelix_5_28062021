const numeroCommande = localStorage.getItem("numeroCommande");
const montantCommande = localStorage.getItem("montantCommande");
const contactCommande = localStorage.getItem("contactCommande");
const numeroParse = JSON.parse(numeroCommande);
const contactParse = JSON.parse(contactCommande);
console.log(numeroCommande);
console.log(numeroParse.order);
console.log(contactParse.contact);
const recapitulatifCommande = document.getElementById("recapitulatifCommande");
const recapDiv = document.createElement("div");

recapDiv.innerHTML = `
<div class="Box">
<div class="row justify-content-center ">
                Numéro :
                <strong>${numeroParse.order}</strong></div>
            
            <div class="row justify-content-center">
                Total :
                <strong>${montantCommande} €</strong></div> 
            <hr>
            <div class="row justify-content-center "><strong>Adresse de livraison :</strong></div>
            <div class="row justify-content-center ">
        
        ${contactParse.contact.address}, 
        
        ${contactParse.contact.city} </div>
        <div class="row justify-content-center "><strong>Contact :</strong></div>
        <div class="row justify-content-center ">
        ${contactParse.contact.email} </div>
        <hr>
            <a
      role="button"
      class="btn_panier text-center text-uppercase "
      href="./index.html"
      >Accueil</a
    >
        </div>
</div>
`;

recapitulatifCommande.appendChild(recapDiv);

localStorage.clear();
