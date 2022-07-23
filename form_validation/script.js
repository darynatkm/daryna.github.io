
const formValidation = () => {
    const name = document.registration.name
    const age = document.registration.age
    const bdate = document.registration.bdate
    const address = document.registration.address
    const email = document.registration.email
    const password = document.registration.password
    const tel = document.registration.tel
    const comment = document.registration.comment
    const terms = document.registration.terms
    name_validation(name, age) &&
    age_validation(age, bdate) &&
    bdate_validation(bdate, address) &&
    address_validation(address,email) &&
    email_validation(email, password) &&
    password_validation(password, tel) &&
    tel_validation(tel, comment) &&
    comment_validation(comment)
    return false;
}

const name_validation = (name, age) => {
    const regex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i
    if(name.value.match(regex)){
        age.focus();
        return true;
    }
    else {
        alert("The Full name is not valid")
        name.focus()
        return false;
    }

}

const age_validation = (age, bdate) => {
    const regex = /^100|[1-9]?\d$/
    if(age.value.match(regex)){
        bdate.focus();
        return true;
    }
    else {
        alert("The age is not valid")
        age.focus()
        return false;
    }
}

const bdate_validation = (bdate, address) => {
    const regex = /(0[1-9]|1[0-9]|2[0-9]|3[0-1])/
    if(bdate.value.match(regex)){
        address.focus();
        return true;
    }
    else {
        alert("The date of birth is not valid")
        bdate.focus()
        return false
    }

}

const address_validation = (address,email) => {
    const regex = /^[0-9A-Za-z\s ,.'-]{3,}$/
    if(address.value.match(regex)){
        email.focus()
        return true;

    }
    else {
        alert("The address is not valid")
        address.focus()
        return false
    }

}

const email_validation = (email, password) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(regex)){
        password.focus()
        return true;
    }
    else {
        alert("Invalid email address")
        email.focus()
        return false
    }
}

const password_validation = (password, tel) => {
    const regex = /^(?=.{8,})/
    if(password.value.match(regex)){
        tel.focus()
        return true;

    }
    else {
        alert("The password should contain at least 8 characters")
        password.focus()
        return false
    }

}

const tel_validation = (tel, comment) => {
    const regex = /^0[0-9]{9}/;
    if(tel.value.match(regex)){
        comment.focus()
        return true;

    }
    else {
        alert("The telephone number is not valid")
        tel.focus()
        return false
    }

}

const comment_validation = (comment) => {
    const regex = /w*[a-zA-Z0-9]\w*/;
    if(comment.value.match(regex)){
        return true;

    }
    else {
        alert("The comment section should contain at least one word")
        comment.focus()
        return false
    }

}
