const mongoose = require("mongoose");
const {validator} = require("../utils")

const CustomerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      length: 10,
    },
    DOB: {
      type: Date,
    },
    emailID: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
    },
    customerID: {          
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE","INACTIVE"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
