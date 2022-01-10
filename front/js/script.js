fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {  
        console.log(value);
        for (let i of value) {
            let newA = document.createElement("a");
            let newArticle = document.createElement("article");
            let newImg = document.createElement("img");
            let newH3 = document.createElement("h3");
            let newP = document.createElement("p");
            let elt = document.getElementById("items");

            elt.appendChild(newA).appendChild(newArticle);
            newA.setAttribute("href", "./product.html?id=" + i._id);
            newArticle.appendChild(newImg);
            newArticle.appendChild(newH3);
            newArticle.appendChild(newP);
            newImg.setAttribute("src", i.imageUrl);
            newImg.setAttribute("alt", i.altTxt);
            newH3.setAttribute("class", "productName");
            newH3.innerHTML = i.name;
            newP.setAttribute("class", "productDescription");
            newP.innerHTML = i.description;
        }
    }) 
    .catch(function(err) {

    });