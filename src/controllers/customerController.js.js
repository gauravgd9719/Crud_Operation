const customerModel = require("../models/customerModel");
const { validator } = require("../utils");
const { v4: uuidv4 } = require("uuid");

// CREATE CUSTOMERS
async function newCustomer(req, res) {
  try {
    const requestBody = req.body;

    if (!validator.validRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ message: `Filled Provide Details Properly` });
    }

    let {
      firstName,
      lastName,
      mobileNumber,
      DOB,
      emailID,
      address,
      customerID,
      status,
    } = requestBody;

    if (!firstName) {
      return res.status(400).send({ message: ` Enter Your Name ` });
    }

    if (!validator.valid(firstName))
      return res.status(400).send({ message: `Please enter a correct name` });

    if (!lastName) {
      return res.status(400).send({ message: ` Enter Your Sur-Name ` });
    }

    if (!validator.valid(lastName)) {
      return res
        .status(400)
        .send({ message: `Please enter  correct Sur-Name` });
    }

    if (!mobileNumber) {
      return res.status(400).send({ message: `Enter Mobile Number` });
    }

    if (!validator.validMobileNum(mobileNumber)) {
      return res.status(400).send({
        messag: `provide correct mobile number/Enter 10 digit mobile number`,
      });
    }

    const checkMB = await customerModel.findOne({ mobileNumber: mobileNumber });

    if (checkMB) {
      return res
        .status(400)
        .send({ message: `${mobileNumber} is already registered` });
    }

    if (!DOB) {
      return res
        .status(400)
        .send({ message: `Please fill your Date of Birth` });
    }

    if (!validator.validateDate(DOB)) {
      return res.status(400).send({
        message: `Enter date in dd/MM/yyyy format ONLY. Or correct date`,
      });
    }

    if (!emailID) {
      return res.status(400).send({ message: ` Enter your email ` });
    }

    if (!validator.validEmail(emailID)) {
      return res.status(400).send({ message: `Enter correct email` });
    }

    const checkEmail = await customerModel.findOne({ emailID: emailID });
    if (checkEmail) {
      return res
        .status(400)
        .send({ messsage: `${emailID} is already registered` });
    }

    if (!validator.valid(address)) {
      return res.status(400).send({ message: `Address is in correct foam` });
    }

    const v1options = {
      node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      clockseq: 0x1234,
      msecs: new Date("2011-11-01").getTime(),
      nsecs: 5678,
    };

    requestBody.customerID = uuidv4(v1options);

    if (!status) {
      return res.status(400).send({ message: `Enter status value` });
    }

    if (status != "ACTIVE" && status != "INACTIVE") {
      return res
        .status(400)
        .send({ messasge: `Status could be ACTIVE OR INACTIVE ` });
    }

    const createCustomer = await customerModel.create(requestBody);

    res
      .status(200)
      .send({ message: "Customer Successfully Created", data: createCustomer });
  } catch (err) {
    res.send(500).send({ message: err.message });
  }
}

//FETCH CUSTOMERS DETAILS
async function fetchCustomer(req, res) {
  try {
    const customer = await customerModel.find({ status: "ACTIVE" });

    if (!customer.length > 0) {
      return res
        .status(400)
        .send({ message: `Customer not exists who is ACTIVE` });
    }

    res.status(200).send({ message: `ACTIVE CUSTOMERS`, data: customer });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
}

// DELETE CUSTOMERS
async function deleteCustomer(req, res) {
  try {
    let userId = req.params.userId;

    if (!userId) {
      return res.status(400).send({ message: `userId is required` });
    }

    if (!validator.validObjectId(userId)) {
      return res.status(400).send({ message: `userId is not valid Id` });
    }

    let customerExistOrNot = await customerModel.findOne({ _id: userId });

    if (!customerExistOrNot) {
      return res
        .status(404)
        .send({ message: `Customer not found / Customer already deleted ` });
    }

    await customerModel.deleteOne({ _Id: userId });

    res.status(200).send({ message: `Customer deleted successfully` });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

module.exports = { newCustomer, fetchCustomer, deleteCustomer };
