const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
