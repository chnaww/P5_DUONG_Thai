let params = new URL(document.location).searchParams;
let idProduct = params.get("id");
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

        let btnCart = document.getElementById("addToCart");
        btnCart.addEventListener('click', function() {
            if (qtyPicked.value > 0  && qtyPicked.value <=100 && qtyPicked !=0) {

                
            } else {
                console.log("error");
            }
        })
    })
    .catch(function(err) {

    });