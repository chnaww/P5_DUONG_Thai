let showCart = [];
let totalQty = 0;
let totalPrice = 0;

let infosClient = {firstName,lastName,address,city,email}

if (localStorage.getItem('localCart')) {
    showCart = JSON.parse(localStorage.getItem('localCart'));
    for (let produit of showCart) {

        let elArticle = getElement('cart__items');
        let newArticle = newElement('article');
        elArticle.appendChild(newArticle);
        newArticle.className = 'cart__item';
        newArticle.setAttribute('data-id', produit.idProduit);
        newArticle.setAttribute('data-color', produit.couleurProduit);

        let newDiv = newElement('div');
        let newImg = newElement('img');
        newArticle.appendChild(newDiv);
        newDiv.className = "cart__item__img"
        newDiv.appendChild(newImg);
        newImg.src = produit.imgProduit;
        newImg.alt = produit.descriptionProduit;

        let newDivContent = newElement('div');
        newArticle.appendChild(newDivContent);
        newDivContent.className = 'cart__item__content';

        let newDivDetails = newElement('div');
        newDivContent.appendChild(newDivDetails);
        newDivDetails.className = 'cart__item__content__description';

        let newH2 = newElement('h2');
        let newColor = newElement('p');
        let newPrice = newElement('p');

        newDivDetails.appendChild(newH2).innerHTML = produit.nomProduit;
        newDivDetails.appendChild(newColor).innerHTML = produit.couleurProduit;
        newDivDetails.appendChild(newPrice).innerHTML = produit.prixProduit + " €";

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
        newInputQty.addEventListener('change', function(event){
            produit.qtyProduit = event.target.value;
            localStorage.setItem('localCart', JSON.stringify(showCart));
            window.location.reload();
        })

        let newDivDel = newElement('div');
        let newPDel = newElement('p');
        newDivSettings.appendChild(newDivDel);
        newDivDel.className = 'cart__item__content__settings__delete';
        newDivDel.appendChild(newPDel).innerHTML ="Supprimer";
        newPDel.className ="deleteItem";
        newPDel.addEventListener('click', function(){
            let indexOfProduit = showCart.indexOf(produit);
            showCart.splice(indexOfProduit,1);
            localStorage.setItem('localCart', JSON.stringify(showCart));
            if(showCart.length == 0) {
                localStorage.clear();
            }
            window.location.reload();
        })

        totalQty = parseInt(produit.qtyProduit) + parseInt(totalQty);
        let displayTotalQty = getElement('totalQuantity');
        if (totalQty > 1) {
            let articlePluriel = getElement('articles');
            articlePluriel.innerHTML = ("articles");
        }
        displayTotalQty.innerText = totalQty;

        totalPrice = parseInt(produit.qtyProduit)*parseInt(produit.prixProduit) + parseInt(totalPrice);
        let displaytotalPrice = getElement('totalPrice');
        displaytotalPrice.innerText = totalPrice;
    }
} else {
    let messagePanier = document.querySelector("#cartAndFormContainer h1");
    messagePanier.innerText =("VOTRE PANIER EST VIDE");
}


let btnOrder = getElement('order');
btnOrder.addEventListener('click', function() {
let checkFormEmpty = document.querySelectorAll('.cart__order input');            
checkFormEmpty.forEach(function(item) {
    if (item.value == '' && item.id != "order" && item.id != "email") {
        let inputId = item.id + "ErrorMsg";
        getElement(inputId).innerText = ("Veuillez remplir ce champ. Merci !");
    } else if (item.id == 'order') {
        //rien à faire
    } else if (item.id == "email") {
        if (item.value.indexOf('@') === -1) {
            let inputId = item.id + "ErrorMsg";
            getElement(inputId).innerText = ("Veuillez renseigner un mail valide");
        } else {
            let inputId = item.id + "ErrorMsg";
            getElement(inputId).innerText = ("");
        }
    } else {
        let inputId = item.id + "ErrorMsg";
        getElement(inputId).innerText = ("");

        infosClient = {
            firstName:getElement('firstName').value,
            lastName:getElement('lastName').value,
            address:getElement('address').value,
            city:getElement('city').value,
            email:getElement('email').value
        }
    }
    })

console.log(infosClient);

})


console.table(showCart);

function newElement(element) {
    return document.createElement(element);
}

function getElement(element) {
     return document.getElementById(element);
}