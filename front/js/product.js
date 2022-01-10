//récupération de l'ID lié au canapé sélectionné
let idURL = new URL(document.location).searchParams;
let idProduct = idURL.get("id");

//définition variables client
let productColorPick = document.getElementById('colors');
let productQtyPick = document.getElementById('quantity');

//requet GET avec l'ID du canapé
fetch('http://localhost:3000/api/products/' + idProduct)
    .then(function(result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then (function(value) {
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
        let addToCart = document.getElementById('addToCart')
        addToCart.addEventListener('click', function(event) {

            if (productQtyPick.value > 0 && productQtyPick.value <= 100 && productColorPick.value != '') {  

                console.log(productColorPick.value);
                console.log(productQtyPick.value);

                let produitChoisi = {
                    idProduit : idProduct,
                    nomProduit : value.name,
                    prixProduit : value.price
                }

                
                //recup json, si vide cree tableau, sinon ajouter element
                //boucle verifier si produit deja existant, si couleur existant, si non ajout au tableau
                //si non incrémentation qty
                let objJson = JSON.stringify(produitChoisi);
                localStorage.setItem("details", objJson);

                let getObj = localStorage.getItem("details");
                let objParseJson = JSON.parse(getObj);
                alert(objParseJson.prixProduit)

            }else {

            alert ('error');

            }
        })
    })
    .catch(function(err) {
        console.log("erreur de récupération API");
    });