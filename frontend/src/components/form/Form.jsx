import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../header/Header.jsx";
import url from "../../url.jsx";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const { id } = useParams();
  const [message, setMessage] = useState("");

  // Decode the token from localStorage and extract the userId
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}reserve/${id}`,
        {
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Use token from localStorage
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Nav />
      </header>
      <main className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="startDate">
                Start Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="endDate">
                End Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit">
                Reserve
              </button>
            </div>
            {message && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-700">{message}</p>
              </div>
            )}
          </form>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8 px-4 w-full">
        {/* Footer content can go here */}
      </footer>
    </div>
  );
};

export default Form;
