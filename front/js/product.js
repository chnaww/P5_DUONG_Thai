//récupération de l'ID lié au canapé sélectionné
let idURL = new URL(document.location).searchParams;
let idProduct = idURL.get("id");

//définition variables client
let productColorPick = document.getElementById('colors');
let productQtyPick = document.getElementById('quantity');

//localStorage.clear();

//requet GET avec l'ID du canapé
fetch('http://localhost:3000/api/products/' + idProduct)
    .then(function(result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then (function(value) {
        console.table(value);
        //récupération du nom du canapé
        let productTitle = document.getElementById('title');
        productTitle.innerHTML = value.name;

        //récupération du prix du canapé
        let productPrice = document.getElementById('price');
        productPrice.innerHTML = value.price;

        //récupération du description du canapé
        let productDescription = document.getElementById('description');
        productDescription.innerHTML = value.description;

        //intégration de l'image du canapé
        let productImg = document.createElement("img");
        let selectImg = document.querySelector(".item__img");

        selectImg.appendChild(productImg);

        //attribut de l'image
        productImg.src = value.imageUrl;
        productImg.alt = value.altTxt;

        //boucle pour afficher les différents choix de couleur
        for ( let color of value.colors) {
            let newOption = document.createElement("option");
            let selectOption = document.getElementById("colors");

            selectOption.appendChild(newOption);
            newOption.value = color;
            newOption.innerHTML = color;
        }
        //ajout au panier
        //ajout d'un event au click sur le bouton ajout panier
        let addToCart = document.getElementById('addToCart')
        addToCart.addEventListener('click', function(event) {

            //verifier que les champs couleur et quantité soient bien renseignés
            if (productQtyPick.value > 0 && productQtyPick.value <= 100 && productColorPick.value != '') {  

                choixCouleur = productColorPick.value;
                choixQty = productQtyPick.value;

                //récupérer les données du produit choisi par le client
                let produitChoisi = {
                    idProduit : idProduct,
                    nomProduit : value.name,
                    imgProduit : value.imageUrl,
                    imgAltProduit : value.altTxt,
                    prixProduit : value.price,
                    couleurProduit : choixCouleur,
                    qtyProduit : choixQty
                }

                //création du array panier
                let cart = [];

                //vérifier si le panier existe déjà dans le localstorage
                if(localStorage.getItem('localCart')){

                    // récupération du fichier Json panier local
                    cart = JSON.parse(localStorage.getItem('localCart'));

                    //vérifier si le produit(nom et couleur) existe dans le panier
                    let sameProduct = cart.find(el => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
                    
                    // mise à jour de la quantité du produit
                    if (sameProduct) {
                        let newQty = parseInt(sameProduct.qtyProduit) + parseInt(choixQty);
                        sameProduct.qtyProduit = newQty;
                        localStorage.setItem('localCart', JSON.stringify(cart));
                        console.table(cart);

                    // sinon ajouter le nouveau produit dans le panier
                    } else {
                        cart.push(produitChoisi);
                        localStorage.setItem('localCart', JSON.stringify(cart));
                        console.table(cart);
                    }
                
                // si il n'y a rien dans le localstorage, créer le panier
                } else {
                    cart.push(produitChoisi);
                    localStorage.setItem('localCart', JSON.stringify(cart));
                    console.table(cart);
                }
            } else {
                alert ("error");
            }
        })
    })
    .catch(function(err) {
        console.log("erreur de récupération API");
    });