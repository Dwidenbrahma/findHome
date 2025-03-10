const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    type: {
      type: String,
      enum: ["Apartment", "Flat", "House", "Villa"],
      required: true,
    },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    guests: { type: Number, required: true },
    amenities: { type: [String], default: [] }, // Default empty array
    images: { type: [String], default: [] }, // Default empty array
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "owner",
      required: true,
    },
    availability: { type: Date },
    //coordinates: { type: [Number], index: "2dsphere" },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        // rating: { type: Number, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);
module.exports = Home;
