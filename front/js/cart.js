//array pour les produits du panier
let showCart = [];

//variables pour le prix final et la quantité totale
let totalQty = 0;
let totalPrice = 0;

//tableau récap des infos du client
let infosClient = {firstName,lastName,address,city,email}


//fonction pour faciliter l'écriture
function newElement(element) {
    return document.createElement(element);
}
function getElement(element) {
     return document.getElementById(element);
}

//si un panier est trouvé dans le local storage alors on affichera les produits
if (localStorage.getItem('localCart')) {
    showCart = JSON.parse(localStorage.getItem('localCart'));

    // boucle pour afficher l'ensemble des produits
    for (let produit of showCart) {

        //insertion du produit
        let elArticle = getElement('cart__items');
        let newArticle = newElement('article');
        elArticle.appendChild(newArticle);
        newArticle.className = 'cart__item';
        newArticle.setAttribute('data-id', produit.idProduit);
        newArticle.setAttribute('data-color', produit.couleurProduit);

        //insertion de l'image
        let newDiv = newElement('div');
        let newImg = newElement('img');
        newArticle.appendChild(newDiv);
        newDiv.className = "cart__item__img"
        newDiv.appendChild(newImg);
        newImg.src = produit.imgProduit;
        newImg.alt = produit.descriptionProduit;

        //div pour les détails du produit
        let newDivContent = newElement('div');
        newArticle.appendChild(newDivContent);
        newDivContent.className = 'cart__item__content';

        let newDivDetails = newElement('div');
        newDivContent.appendChild(newDivDetails);
        newDivDetails.className = 'cart__item__content__description';

        //insertion du nom, de la couleur et du prix
        let newH2 = newElement('h2');
        let newColor = newElement('p');
        let newPrice = newElement('p');

        newDivDetails.appendChild(newH2).innerHTML = produit.nomProduit;
        newDivDetails.appendChild(newColor).innerHTML = produit.couleurProduit;
        newDivDetails.appendChild(newPrice).innerHTML = produit.prixProduit + " €";

        //création des élèments pour gérer la quantité des produits, et du bouton supprimer
        let newDivSettings = newElement('div');
        newDivContent.appendChild(newDivSettings);
        newDivSettings.className = 'cart__item__content__settings';

        let newDivQty = newElement('div');
        let newDivQtyP = newElement('p');
        let newInputQty = newElement('input');
        newDivSettings.appendChild(newDivQty);
        newDivSettings.appendChild(newDivQtyP).innerHTML = "Qté : ";
        newDivSettings.appendChild(newInputQty);
        newInputQty.className = "itemQuantity";
        newInputQty.setAttribute('type','number');
        newInputQty.setAttribute('name','itemQuantity');
        newInputQty.setAttribute('value',produit.qtyProduit);
        newInputQty.setAttribute('min','1');
        newInputQty.setAttribute('max','100');

        //si l'utilisateur modifie le champ quantité, alors les changements sont pris en compte dans le localstorage
        newInputQty.addEventListener('change', function(event){
            produit.qtyProduit = event.target.value;
            localStorage.setItem('localCart', JSON.stringify(showCart));
            //refresh pour afficher le bon prix final
            window.location.reload();
        })

        //bouton supprimer
        let newDivDel = newElement('div');
        let newPDel = newElement('p');
        newDivSettings.appendChild(newDivDel);
        newDivDel.className = 'cart__item__content__settings__delete';
        newDivDel.appendChild(newPDel).innerHTML ="Supprimer";
        newPDel.className ="deleteItem";

        //si l'utilisateur clique sur le bouton alors nous allons chercher l'index du canapé et le supprimer du panier
        newPDel.addEventListener('click', function(){
            let indexOfProduit = showCart.indexOf(produit);
            showCart.splice(indexOfProduit,1);
            //prise en compte du changement dans le localstorage
            localStorage.setItem('localCart', JSON.stringify(showCart));
            //si panier vide, alors on supprime le fichier local
            if(showCart.length == 0) {
                localStorage.clear();
            }
            //mise a jour du prix et de l'affichage
            window.location.reload();
        })

        //afficher la quantité total de canapé
        totalQty = parseInt(produit.qtyProduit) + parseInt(totalQty);
        let displayTotalQty = getElement('totalQuantity');
        if (totalQty > 1) {

            //mettre article au pluriel si plusieurs canapé
            let articlePluriel = getElement('articles');
            articlePluriel.innerHTML = ("articles");
        }
        displayTotalQty.innerText = totalQty;

        //calcul du prix final
        totalPrice = parseInt(produit.qtyProduit)*parseInt(produit.prixProduit) + parseInt(totalPrice);
        let displaytotalPrice = getElement('totalPrice');
        displaytotalPrice.innerText = totalPrice;
    }
} else {
    let messagePanier = document.querySelector("#cartAndFormContainer h1");
    messagePanier.innerText =("VOTRE PANIER EST VIDE");
}

function checkFormEntry (inputToCheck,regexName,regexAddress,regexMail) {
    inputToCheck.forEach(function(item) {
        item.addEventlistener('input', function() {
            if (['firstName','lastName','city'].includes(item.id)) {
                if (item.value.match(regexName)) {
                    let inputId = item.id + "ErrorMsg";
                    getElement(inputId).innerText = ("");
                    return true;
                } else {
                    let inputId = item.id + "ErrorMsg";
                    getElement(inputId).innerText = ("Veuillez rentrer un/e " + item.id + " valide");
                    return false;
                }
            } else if (item.id == 'address') {
                if (item.value.match(regexAddress)) {
                    let inputId = item.id + "ErrorMsg";
                    getElement(inputId).innerText = ("");
                    return true;
                } else {
                    let inputId = item.id + "ErrorMsg";
                    getElement(inputId).innerText = ("Veuillez rentrer une " + item.id + " valide");
                    return false;
                }
            } else if (item.id == 'email') {
                if (item.value.match(regexMail)) {
                    let inputId = item.id + "ErrorMsg";
                    getElement(inputId).innerText = ("");
                    return true;
                } else {
                    let inputId = item.id + "ErrorMsg";
                    getElement(inputId).innerText = ("Veuillez rentrer un " + item.id + " valide");
                    return false;
                }
            }
        })
    })
}

let regexName = /(^|\s)[a-zA-Z',.-\s]{1,25}(?=\s|$)((?!\W)[a-zA-Z',.-\s]{1,25}(?=\s|$))?/;
let regexAddress = /^\d+\s[A-z]+\s[A-z]+/;
let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let getAllInput = document.querySelectorAll('.cart__order input:not(#order)');

checkFormEntry(getAllInput,regexName,regexAddress,regexMail);