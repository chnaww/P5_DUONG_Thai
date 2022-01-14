let btnOrder = getElement('order');
btnOrder.addEventListener('click', function(e) {
    e.preventDefault();
let checkFormEmpty = document.querySelectorAll('.cart__order input');            
checkFormEmpty.forEach(function(item) {
    if (item.value == '' && item.id != "order" && item.id != "email") {
        let inputId = item.id + "ErrorMsg";
        getElement(inputId).innerText = ("Veuillez remplir ce champ. Merci !");
    } else if (item.id == 'order') {
        //rien à faire
    } else if (item.id == "email") {
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (item.value.match(mailFormat)) {
            let inputId = item.id + "ErrorMsg";
            getElement(inputId).innerText = ("");
        } else {
            let inputId = item.id + "ErrorMsg";
            getElement(inputId).innerText = ("Veuillez renseigner un mail valide");
        }
    } else {
        let inputId = item.id + "ErrorMsg";
        getElement(inputId).innerText = ("");
    }
    })

    let infosClient = {
        firstName:getElement('firstName').value,
        lastName:getElement('lastName').value,
        address:getElement('address').value,
        city:getElement('city').value,
        email:getElement('email').value
        }
},


function checkFormEntry (inputToCheck) {
    inputToCheck.forEach(function(item) {
        getElement(item.id + "ErrorMsg").innerText =("Ce champ est vide");
        item.addEventListener('input', function() {
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


function confirmOrder(element) {
    let btnOrder = getElement('order');
    console.log(element);
    btnOrder.addEventListener('click', function() {
        if (element) {
            console.log("test réussi");
        } else {
            alert("remplissez le formulaire");
        }
    })
}


function checkInput () {
    if(!el.target.value.match(regexName)) {
        console.log(checkFirstName);
        return false;
    } else {
        console.log("bravo" + el.target.value);
        return true;
    }
}

let checkFirstName = getElement('firstName');
checkFirstName.addEventListener('input', function(el) {
    if(!el.target.value.match(regexName)) {
        console.log(checkFirstName);
        return false;
    } else {
        console.log("bravo" + el.target.value);
        return true;
    }
})

!inputValue.match(regex) ||

let inputName = getElement('firstName');
inputName.addEventListener('input', function(userInput) {
    if(!userInput.target.value.match(regexName)) {
        let inputError = getElement('firstNameErrorMsg');
        inputError.innerText = ('Veuillez renseigner correctement ce champ');
    }else{
        let inputError = getElement('firstNameErrorMsg');
        inputError.innerText = ('merci ' + userInput.target.value);
    }
})


function checkInputuser (inputField,regex) {
    inputField.addEventListener('input', function(userInput) {
        if (!userInput.target.value.match(regex)) {
            let inputError = getElement(inputField.id+ "ErrorMsg");
            inputError.innerText = ('Veuillez renseigner correctement ce champ');
        }else{
            let inputError = getElement(inputField.id + "ErrorMsg");
            inputError.innerText = ('merci ' + userInput.target.value);
        }
})


function test ( {
    llala;
    return onkeydown;
})

let btnCommander = getElement('order');
btnCommander.addEventListener('click',function(event) {
    event.preventDefault();
    let checkFormEmpty = document.querySelectorAll('.cart__order input:not(#order)');
    checkFormEmpty.forEach(function(input) {
        if(input.value == '') {
            console.log('marche pas')
        } else {
            createContactDetails();
        }
    })
})



function createContactDetails () {
    let inputFirstName = getElement('firstName');
    let inputLastName = getElement('lastName');
    let inputCity = getElement('city');
    let inputAddress = getElement('address');
    let inputEmail = getElement('email');

    let productID = [];

    showCart.forEach(function(item){
        productID.push(item.idProduit);
    })

    let order = {
        contact : {
            prénomde : inputFirstName.value,
            nomde : inputLastName.value,
            villede : inputCity.value,
            addressede : inputAddress.value,
            emailContact : inputEmail.value
        },
        products : productID
    }
    console.log(order);
    return productID;
}
function send(e) {
    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(e)
      })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(orderID) {
        console.log(orderID);
    })
    .catch(function(err) {
        console.log(err);
    });
}

let btnCommander = getElement('order');
btnCommander.addEventListener('click',function(event) {
    event.preventDefault();
    send(createContactDetails());
})