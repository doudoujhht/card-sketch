const form = document.getElementById("form")
const name = document.getElementById("name")
const cardNumber = document.getElementById("number")
const month = document.getElementById("month")
const year = document.getElementById("year")
const yearCard = document.getElementById("yearCard")
const monthCard = document.getElementById("monthCard")
const cvc = document.getElementById("cvc")
const  cvcCard = document.getElementById("cvcCard")
const cardsNumber = document.querySelectorAll(".numberContainer>span")
const holderName = document.getElementById("holderName")
const  numberContainer = document.getElementById("numberContainer")
const nameContainer = document.getElementById("nameContainer")
const cvcContainer = document.getElementById("cvcContainer")
const yearMonth = document.getElementById("yearMonth")
const completed = document.getElementById("completed")
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let isRight =true;
    numberContainer.querySelector("p") && numberContainer.querySelector("p").remove()
    cvcContainer.querySelector("p") && cvcContainer.querySelector("p").remove()
    yearMonth.querySelector("p") && yearMonth.querySelector("p").remove()
    nameContainer.querySelector("p") && nameContainer.querySelector("p").remove()
    let original = cardNumber.value.replaceAll(" ","")
    if (name.value===""){
        nameContainer.append(createError())
        isRight = false
    }
    if (original ===""){
        numberContainer.append(createError())
        isRight = false
    }
    else if (original.length !== 16){
        numberContainer.append(createError("the card number should be 16 digits"))
        isRight = false
    }
    else if (!/\d{16}/.test(original)){
        numberContainer.append(createError("wrong format number only"))
        isRight = false
    }
    if (cvc.value === "") {
        isRight = false
        cvcContainer.append(createError())
    }
    else if (2 > cvc.value.length) {
        isRight = false
        cvcContainer.append(createError("Too short"))
    }
    else if (4<cvc.value.length) {
        isRight = false
        cvcContainer.append(createError("too long"))
    }

    if (year.value ==="" || month.value ==="") {
        isRight = false
        yearMonth.append(createError())
    }
    if (isRight){
        form.style.display = "none"
        completed.style.display = "flex"
    }
})
function createError(message){
    let error = document.createElement("p")
    error.innerText = message || "can't be blank"
    error.style.color = "red"
    return error
}

name.addEventListener("input", ()=>{
    holderName.innerText = name.value.toUpperCase();
})
cardNumber.addEventListener("input",()=>{
    let value = cardNumber.value;
    let length = cardNumber.value.length
    if (!/\d/.test(value.charAt(length - 1))|| length >=20){
        cardNumber.value = value.substring(0, length - 1)
        return;
    }
    console.log(/\d/.test(value.charAt(length - 1)))
    let original = value.replaceAll(" ","")
    let parts = original.match(/.{1,4}/g)
    cardNumber.value = parts.join(" ")
    original =original.padEnd(16,"0")
    parts = original.match(/.{1,4}/g)
    for (let i = 0; i < parts.length; i++) {
        cardsNumber[i].innerText = parts[i]
    }
})

month.addEventListener("input", ()=>{
    if (month.value.length > 2){
        month.value = month.value.substring(0, month.value.length - 1)
    }
    monthCard.innerText = month.value.padEnd(2,"0")
})

year.addEventListener("input", ()=>{
    if (year.value.length > 2){
        year.value = year.value.substring(0, year.value.length - 1)
    }
    yearCard.innerText = year.value.padEnd(2,"0")
})


cvc.addEventListener("input", ()=>{
    if (cvc.value.length > 4){
        cvc.value = cvc.value.substring(0, cvc.value.length - 1)
    }
    cvcCard.innerText = cvc.value.padEnd(3,"0")
})

