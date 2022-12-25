const express = require("express");
const router = express.Router();

let customerContrl = require("../controllers/customerController.js")
let cardContrl = require("../controllers/cardController")

//CUSTOMER API
router.post("/create/customer", customerContrl.newCustomer)
router.get("/get/customer", customerContrl.fetchCustomer)
router.delete("/customer/:userId", customerContrl.deleteCustomer)

//CARD API
router.post("/create/card",cardContrl.newCard)
router.get("/get/cardList",cardContrl.getCardList)


router.all("/*", (req, res)=>{ return res.status(400).send({status:false, message:"Check URL First"})});

module.exports = router