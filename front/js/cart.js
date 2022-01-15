//array pour les produits du panier
let showCart = [];

//variables pour le prix final et la quantité totale
let totalQty = 0;
let totalPrice = 0;

//variable pour récupérer le prix via l'id du kanap dans l'api
let idKanap;

//variables pour vérifier les champs de formulaire
let regexName = /(^|\s)[a-zA-Z',.-\s]{1,25}(?=\s|$)((?!\W)[a-zA-Z',.-\s]{1,25}(?=\s|$))?/;
let regexAddress = /[A-Za-z0-9'\.\-\s\,]/;
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
        //recup de l'id du canapé ciblé
        idKanap = produit.idProduit;

        //méthode fetch pour récupérer le prix du canapé à afficher dans le panier
        fetch('http://localhost:3000/api/products/' + idKanap)
            .then(function(result) {
                if (result.ok) {
                    return result.json();
                }
            })
            .then(function(value) {
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
                newDivDetails.appendChild(newPrice).innerHTML = value.price + "€";

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
                totalPrice = parseInt(produit.qtyProduit)*parseInt(value.price) + parseInt(totalPrice);
                let displaytotalPrice = getElement('totalPrice');
                displaytotalPrice.innerText = totalPrice;
            })
            .catch(function(err){
                console.log(err);
            });
    }
        

    //vérification par regex des entrées utilisateurs
    let inputFirstName = getElement('firstName');
    checkInputUser(inputFirstName,regexName);

    let inputLastName = getElement('lastName');
    checkInputUser(inputLastName,regexName);

    let inputCity = getElement('city');
    checkInputUser(inputCity,regexName);

    let inputAddress = getElement('address');
    checkInputUser(inputAddress,regexAddress);

    let inputEmail = getElement('email');
    checkInputUser(inputEmail,regexMail);

    //déclenchement de la récup de la commande et la requete POST pour récup l'IDorder
    let btnCommander = getElement('order');
    btnCommander.addEventListener('click',createContactDetails);

//instruction else pour la page confirmation
} else {
    //récupération de l'ID order préalablement renseigné dans l'url
    let idURL = new URL(document.location).searchParams;
    let idProduct = idURL.get("orderId");
    //affichage du numéro de commande
    let messagePanier = getElement('orderId');
    messagePanier.innerText =idProduct;
}


//définition de la fonction de vérification regex
function checkInputUser (inputField,regex) {
    //la vérif commence dès lors que l'utilisateur modifie un champ
    inputField.addEventListener('input', function(userInput) {
        //renvoi un message d'erreur si les infos ne respectent pas le regex et ou si champ vide
        if (!userInput.target.value.match(regex) || userInput.target.value == '') {
            let inputError = getElement(inputField.id+ "ErrorMsg");
            inputError.innerText = ('Veuillez renseigner correctement ce champ');
        }else{
            let inputError = getElement(inputField.id+ "ErrorMsg");
            inputError.innerText = ('');
        }
    })
}

//définition de la fonction pour récup données commande et envoi de requete POST
function createContactDetails (e) {
    e.preventDefault();

    //récup des données clients
    let inputFirstName = getElement('firstName');
    let inputLastName = getElement('lastName');
    let inputCity = getElement('city');
    let inputAddress = getElement('address');
    let inputEmail = getElement('email');

    //récup des données du panier
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
    //création du formulaire pour l'envoi POST
    let products = productID;
    const order = {contact,products};

    //fetch pour l'envoi des données
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
        //récupération du numéro de commande
        //insertion de celui ci dans les params de l'URL
        //renvoi vers la page confirmation avec le numéro de commande
        //suppression du localstorage pour afficher les bonnes informations sur la page confirmation
        let idOrder=data.orderId;
        document.location.href = `./confirmation.html?orderId=${idOrder}`;
        localStorage.clear();
    })
    .catch(function(err) {
        alert('fetch error');
    });
}