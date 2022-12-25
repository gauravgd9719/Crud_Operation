const cardModel = require("../models/cardModel");
const customerModel = require("../models/customerModel");
const { validator } = require("../utils");

// CREATE CARD
async function newCard(req, res) {
  try {
    let cardRequestBody = req.body;

    let { cardNumber, cardType, customerName, status, vision, customerId } =
      cardRequestBody;

    if (!cardNumber) {
      return res.status(400).send({ message: `Please enter card Number` });
    }

    if (!validator.isValidCardNumber(cardNumber)) {
      return res
        .status(400)
        .send({ message: `Please enter valid card number` });
    }

    if (!cardType) {
      return res.status(400).send({ message: `Fill card type` });
    }

    if (cardType != "REGULAR" && cardType != "SPECIAL") {
      return res
        .status(400)
        .send({
          message: `You could filled only REGULAR OR SPECIAL types of card`,
        });
    }

    if (!status) {
      return res.status(400).send({ message: `Fill status` });
    }

    if (status != "ACTIVE" && status != "INACTIVE") {
      return res
        .status(400)
        .send({ message: `status could be ACTIVE OR INACTIVE ` });
    }

    if (!customerName) {
      return res.status(400).send({ message: `Customer Name can't be empty` });
    }

    if (!validator.valid(customerName)) {
      return res
        .status(400)
        .send({ message: `Customer name should be correct name` });
    }

    if (!validator.valid(vision)) {
      return res.status(400).send({ message: `vision should be correct` });
    }

    const createCard = await cardModel.create(cardRequestBody);

    res
      .status(200)
      .send({ status: true, message: `success`, data: createCard });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// GET CARD LIST
async function getCardList(req, res) {
  try {
    const fetchData = await cardModel
      .find({ status: "ACTIVE" })
      .populate("customerID");
    return res.status(200).send({ status: true, Data: fetchData });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
}

module.exports = { newCard, getCardList };
