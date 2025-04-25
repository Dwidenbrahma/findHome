import React, { useState, useContext, useMemo, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { OwnerAuthContext } from "../OwnerContextAuth.jsx";
import url from "../../url.jsx";
import showImage from "../../img/sh.jpg";
import Footer from "../footer/Footer.jsx";
import { FaArrowLeft } from "react-icons/fa6";

const HousePost = () => {
  const [show, setShow] = useState(false);
  const [amenityInput, setAmenityInput] = useState("");

  const [showDuration, setShowDuration] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    state: "",
    country: "",
    type: "Apartment", // Default value
    transactionType: "",
    duration: "",
    price: 0,
    rating: 0,
    numReviews: 0,
    bedrooms: 0,
    bathrooms: 0,
    guests: 0,
    amenities: [],
    images: [],
    availability: "Available",
    reviews: [],
  });

  const { ownerToken, loading } = useContext(OwnerAuthContext);
  const owner_id = useMemo(() => {
    if (ownerToken) {
      const payload = ownerToken.split(".")[1];
      const decoded = JSON.parse(atob(payload)); // Decode the payload
      console.log(decoded); // Log the decoded payload
      return decoded.owner_id; // Return userId (or the correct key if different)
    }
    return null;
  }, [ownerToken]);

  console.log(owner_id);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      if (files) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.from(files), // Keep as an array for files
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Store input as a string directly
      }));
    }
  };

  const handleAmenityChange = (e) => {
    setAmenityInput(e.target.value);
  };

  const handleAddAmenity = (e) => {
    e.preventDefault();
    if (
      amenityInput.trim() &&
      !formData.amenities.includes(amenityInput.trim())
    ) {
      setFormData((prevData) => ({
        ...prevData,
        amenities: [...prevData.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (amenityToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      amenities: prevData.amenities.filter(
        (amenity) => amenity !== amenityToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Append form data
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        // Handle multiple images as an array
        formData[key].forEach((file) => {
          data.append("images", file); // Append each file separately
        });
      } else {
        data.append(key, formData[key]); // Append single values directly
      }
    });
    data.append("owner_id", owner_id);
    console.log(owner_id);
    try {
      const response = await axios.post(`${url}posthome`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response);

      if (response.status === 200) {
        alert("Data is inserted");
        return <Navigate to="/owner/dash" />;
      }
      setFormData({
        title: "",
        description: "",
        location: "",
        city: "",
        state: "",
        country: "",
        transactionType: "",
        duration: "",
        price: 0,
        rating: 0,
        numReviews: 0,
        bedrooms: 0,
        bathrooms: 0,
        guests: 0,
        amenities: [],
        images: [],
        owner_id,
        availability: "",
        reviews: [],
      }); // Reset form
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setShow(formData.type !== "Hotel");
  }, [formData.type]);

  useEffect(() => {
    setShowDuration(formData.transactionType === "rent");
  }, [formData.transactionType]);

  if (loading) {
    return null;
  }

  if (!ownerToken) {
    return <Navigate to="/owner/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-gray-100 p-4 flex ">
        <Link to="/owner/dash">
          {" "}
          <FaArrowLeft />
        </Link>

        <h1 className="ml-30">Find Home</h1>
      </header>
      <main className="flex-grow p-4 bg-gray-50">
        <form
          className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* House Details Section */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                House Details
              </h1>
              <hr className="border-gray-300 mb-4" />

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Title
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                  <textarea
                    rows={7}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Type
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Apartment">Apartment</option>
                    <option value="Flat">Flat</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Hotel">Hotel</option>
                  </select>
                </label>
              </div>

              {/* Here should i show this or not if hotel don't show below ui else */}
              {show && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Transaction Type
                      <select
                        name="transactionType"
                        value={formData.transactionType || ""}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select transaction type</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                      </select>
                    </label>
                  </div>

                  {showDuration && (
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-1">
                        Durations
                        <select
                          name="duration"
                          value={formData.duration || ""}
                          onChange={handleChange}
                          required
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select duration</option>
                          <option value="short-term">Short-term</option>
                          <option value="medium-term">Medium-term</option>
                          <option value="long-term">Long-term</option>
                        </select>
                      </label>
                    </div>
                  )}
                </>
              )}

              {/* Here should i show this or not */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <label className="block text-gray-700 font-medium">
                  Price
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Set Price"
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-gray-700 font-medium">
                  Rating
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-gray-700 font-medium">
                  Number of Reviews
                  <input
                    type="number"
                    name="numReviews"
                    value={formData.numReviews}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-gray-700 font-medium">
                  Bedrooms
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-gray-700 font-medium">
                  Bathrooms
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-gray-700 font-medium">
                  Guest Capacity
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Amenities
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    placeholder="Enter amenity"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (amenityInput.trim() !== "") {
                        setFormData((prev) => ({
                          ...prev,
                          amenities: [...prev.amenities, amenityInput.trim()],
                        }));
                        setAmenityInput("");
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md">
                    Add
                  </button>
                </div>

                {/* Show added amenities */}
                <ul className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, index) => (
                    <li
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {amenity}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            amenities: prev.amenities.filter(
                              (_, i) => i !== index
                            ),
                          }))
                        }
                        className="text-red-500 hover:text-red-700">
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Choose Images
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="availability">
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>

            {/* Address Details Section */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Address Details
              </h1>
              <hr className="border-gray-300 mb-4" />

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Location
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  City
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  State
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Country
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="mb-6 text-sm text-gray-600">
                <span>By using FindHome, you agree to our Terms of Use </span>
                <Link className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                <span>, and </span>
                <Link className="text-blue-600 hover:underline">
                  Listing Agreement
                </Link>
                .<span> Please review the following terms carefully:</span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4 cursor-pointer">
                Submit
              </button>

              <img
                src={showImage}
                alt="houseImg"
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </form>
      </main>

      <footer className="bg-gray-900 text-white py-4 w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default HousePost;
