//récupération de l'ID lié au canapé sélectionné
let idURL = new URL(document.location).searchParams;
let idProduct = idURL.get("id");

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
            newOption.value = i;
            newOption.innerHTML = i;
        }

        //récupération des données pour le localcache
        let optionProducts = {
            productID : value._id,
            productName : value.name,
            productPrice : value.price,
            productColor : colorPicked.value,
            productQty : qtyPicked.value
        }

        console.log(optionProducts);
    })
    .catch(function(err) {
        console.log("erreur de récupération API");
    });



    let idURL = new URL(document.location).searchParams;
let idProduct = idURL.get("id");

const colorPicked = document.getElementById("colors");
const qtyPicked = document.getElementById('quantity');



fetch('http://localhost:3000/api/products/' + idProduct)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        document.getElementById('title').innerHTML = value.name;
        document.getElementById('price').innerHTML = value.price;
        document.getElementById('description').innerHTML = value.description;

        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = value.imageUrl;
        productImg.alt = value.altTxt;

        for ( let i of value.colors) {
        let newOption = document.createElement("option");
        document.getElementById("colors").appendChild(newOption);
        newOption.value = i;
        newOption.innerHTML = i;
        }

        let optionProducts = {
            productID : value._id,
            productName : value.name,
            productPrice : value.price,
            productColor : colorPicked.value,
            productQty : qtyPicked.value
        }

        console.log(optionProducts);

        let btnCart = document.getElementById("addToCart");
        btnCart.addEventListener('click', function() {
            if (qtyPicked.value > 0  && qtyPicked.value <=100 && qtyPicked !=0) {
                qtyPicked.addEventListener('input',function(qty) {
                    optionProducts.productQty = qty.target.value;
                    console.log("test");
                })
            } else {
                console.log("error");
            }
        })
    })
    .catch(function(err) {

    });