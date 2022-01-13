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
}


tous les champs input p = ce chmap est Vide
const tous les input sauf submit
pour tous on écoute levenement input
si input = firstname/lastname/ville et que son champ pas Vide
alors on verifie si input respect RegExp
si oui alors input p n'imprime rien return true
sinon input p print please valid entry return false
si input = address et que champ aps Vide
on verifie si input respect RegExp
si oui alors input p n('imprime rien return true')
sinon input p print valid entry pelase return false
si input = email et que champ aps Vide
on verifie si input respect RegExp
si oui alors input p n('imprime rien return true')
sinon input p print valid entry pelase return false


function checkFormEntry (inputToCheck, regexName, regexAddress,regexMail) {
    inputToCheck.forEach(function(item) {
        let getElement(item);
        item.addEventlistener('input', function() {
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
}
