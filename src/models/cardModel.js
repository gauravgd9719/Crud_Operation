const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
    },
    cardType: {
      type: String,
      enum: ["REGULAR","SPECIAL"]
    },
    customerName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE","INACTIVE"],
      default: "Active",
    },
    vision: {
      type: String,
    },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
