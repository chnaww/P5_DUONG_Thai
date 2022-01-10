fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {  
        for (let item of value) {
            //création du lien pour chaque canapé
            let newA = document.createElement("a")
            let eltItems = document.getElementById("items");
            eltItems.appendChild(newA);
            newA.setAttribute("href", "./product.html?id=" + item._id);

            //création de son article
            let newArticle = document.createElement("article");
            newA.appendChild(newArticle);

            //création et intégration de l'image du canapé
            let newImg = document.createElement("img");
            newArticle.appendChild(newImg);
            newImg.src = item.imageUrl;
            newImg.alt = item.altTxt;

            //création et inégration du nom du canapé
            let newH3 = document.createElement("h3");
            newArticle.appendChild(newH3);
            newH3.setAttribute("class", "productName");
            newH3.innerHTML = item.name //display canapé's name

            //création et intégration de la description du canapé
            let newP = document.createElement("p");
            newArticle.appendChild(newP);
            newP.setAttribute("class", "productDescription");
            newP.innerHTML = item.description //display canapé's description

        }
    }) 
    .catch(function(err) {
        //message d'erreur si la récupération d'API a échoué
        console.log("error fetch API");
    });