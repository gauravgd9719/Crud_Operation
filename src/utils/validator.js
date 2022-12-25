const mongoose = require("mongoose")

function validRequestBody (body) {
    return Object.keys(body).length > 0;
}

const valid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

function validateDate(testdate) {
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    return date_regex.test(testdate);
}

function validEmail (mail) {
    if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) ){
    return true;
    }
}

function validObjectId (objID) {
    return mongoose.isValidObjectId(objID)
}

let cardNoRegex = /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/

function validCardNum (card) {
    return cardNoRegex.test(card)
}

function validMobileNum (mobile) {
    return /^[789]\d{9}$/.test(mobile) 
}

let isValidCardNumber= function(value){
    const regex=/(?:\d[ -]*?){13,16}/
    return regex.test(value)
  }

module.exports = {validRequestBody,valid,validateDate, validEmail, validObjectId, validCardNum, validMobileNum, isValidCardNumber}