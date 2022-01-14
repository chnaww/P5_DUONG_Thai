//array pour les produits du panier
let showCart = [];

//variables pour le prix final et la quantité totale
let totalQty = 0;
let totalPrice = 0;

let regexName = /(^|\s)[a-zA-Z',.-\s]{1,25}(?=\s|$)((?!\W)[a-zA-Z',.-\s]{1,25}(?=\s|$))?/;
let regexAddress = /^\d+\s[A-z]+\s[A-z]+/;
let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


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

        //afficher la quantité totale de canapé
        totalQty = parseInt(produit.qtyProduit) + parseInt(totalQty);
        let displayTotalQty = getElement('totalQuantity');
        if (totalQty > 1) {

            //mettre article au pluriel si plusieurs canapés
            let articlePluriel = getElement('articles');
            articlePluriel.innerHTML = ("articles");
        }
        displayTotalQty.innerText = totalQty;

        //calcul du prix final
        totalPrice = parseInt(produit.qtyProduit)*parseInt(produit.prixProduit) + parseInt(totalPrice);
        let displaytotalPrice = getElement('totalPrice');
        displaytotalPrice.innerText = totalPrice;


    }

    let inputFirstName = getElement('firstName');
    checkInputUser(inputFirstName,regexName);

    let inputLastName = getElement('lastName');
    checkInputUser(lastName,regexName);

    let inputCity = getElement('city');
    checkInputUser(city,regexName);

    let inputAddress = getElement('address');
    checkInputUser(address,regexAddress);

    let inputEmail = getElement('email');
    checkInputUser(email,regexMail);

    let btnCommander = getElement('order');
    btnCommander.addEventListener('click',createContactDetails);


} else {
    let idURL = new URL(document.location).searchParams;
    let idProduct = idURL.get("orderId");
    let messagePanier = getElement('orderId');
    messagePanier.innerText =idProduct;
}

function checkInputUser (inputField,regex) {
    inputField.addEventListener('input', function(userInput) {
        if (!userInput.target.value.match(regex) || userInput.target.value == '') {
            let inputError = getElement(inputField.id+ "ErrorMsg");
            inputError.innerText = ('Veuillez renseigner correctement ce champ');
        }else{
            let inputError = getElement(inputField.id+ "ErrorMsg");
            inputError.innerText = ('');
        }
    })
}


function createContactDetails (e) {
    e.preventDefault();
    let inputFirstName = getElement('firstName');
    let inputLastName = getElement('lastName');
    let inputCity = getElement('city');
    let inputAddress = getElement('address');
    let inputEmail = getElement('email');

    let productID = [];

    showCart.forEach(function(item){
        productID.push(item.idProduit);
    })


    let contact = {
        firstName : inputFirstName.value,
        lastName : inputLastName.value,
        address : inputAddress.value,
        city : inputCity.value,
        email : inputEmail.value
    }

    let products = productID;
    const order = {contact,products};
    console.log(order);

    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        let idOrder=data.orderId;
        document.location.href = `./confirmation.html?orderId=${idOrder}`;
        localStorage.clear();
        console.log(idOrder);
    })
    .catch(function(err) {
        alert('fetch error');
    });
}