import { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import {
  Home,
  Hotel,
  Building,
  Clock,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Users,
  Landmark,
  Building2,
  MessageCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";

const PropertyRequestForm = () => {
  const [form, setForm] = useState({
    propertyId: "PROP12345", // This would come from the property listing
    propertyTitle: "Luxury Downtown Apartment", // This would come from the property listing
    requestType: "Rent",
    duration: "Short",
    moveInDate: "",
    budget: "",
    guests: "",
    specialRequests: "",
    amenitiesRequired: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      amenitiesRequired: checked
        ? [...prev.amenitiesRequired, value]
        : prev.amenitiesRequired.filter((amenity) => amenity !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request submitted:", form);
    // In a real application, this would send the request to the property owner
    alert("Your request has been sent to the property owner!");
  };

  const amenitiesList = [
    "WiFi",
    "Air Conditioning",
    "Parking",
    "Swimming Pool",
    "Gym",
    "Kitchen",
    "TV",
    "Washing Machine",
  ];

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <MessageCircle className="mr-2" /> Request Property
          </h2>
          <p className="mt-2 opacity-90">
            Send your offer to the property owner
          </p>
        </div>

        <div className="bg-gray-50 p-4 border-b">
          <div className="flex items-center">
            <Home className="text-gray-500 mr-2" />
            <span className="font-medium">{form.propertyTitle}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
              ID: {form.propertyId}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Request Type Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Request Details
            </h3>

            {/* Request Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Request Type
              </label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div
                  onClick={() => setForm({ ...form, requestType: "Rent" })}
                  className={`flex items-center justify-center px-4 py-3 border rounded-md cursor-pointer ${
                    form.requestType === "Rent"
                      ? "bg-green-100 border-green-500"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}>
                  <Clock className="mr-2 h-5 w-5 text-green-600" />
                  <span>Rent</span>
                </div>
                <div
                  onClick={() => setForm({ ...form, requestType: "Buy" })}
                  className={`flex items-center justify-center px-4 py-3 border rounded-md cursor-pointer ${
                    form.requestType === "Buy"
                      ? "bg-green-100 border-green-500"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}>
                  <Home className="mr-2 h-5 w-5 text-green-600" />
                  <span>Buy</span>
                </div>
              </div>
            </div>

            {/* Rental Duration - only show for rent requests */}
            {form.requestType === "Rent" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rental Duration
                </label>
                <div className="mt-1 grid grid-cols-3 gap-3">
                  <div
                    onClick={() => setForm({ ...form, duration: "Short" })}
                    className={`flex items-center justify-center px-4 py-3 border rounded-md cursor-pointer ${
                      form.duration === "Short"
                        ? "bg-green-100 border-green-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}>
                    <Clock className="mr-2 h-5 w-5 text-green-600" />
                    <span>Short Term</span>
                  </div>
                  <div
                    onClick={() => setForm({ ...form, duration: "Medium" })}
                    className={`flex items-center justify-center px-4 py-3 border rounded-md cursor-pointer ${
                      form.duration === "Medium"
                        ? "bg-green-100 border-green-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}>
                    <Clock className="mr-2 h-5 w-5 text-green-600" />
                    <span>Medium Term</span>
                  </div>
                  <div
                    onClick={() => setForm({ ...form, duration: "Long" })}
                    className={`flex items-center justify-center px-4 py-3 border rounded-md cursor-pointer ${
                      form.duration === "Long"
                        ? "bg-green-100 border-green-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}>
                    <Clock className="mr-2 h-5 w-5 text-green-600" />
                    <span>Long Term</span>
                  </div>
                </div>
              </div>
            )}

            {/* Move-in Date and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="moveInDate"
                  className="block text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="mr-1 h-4 w-4 text-green-600" />
                  {form.requestType === "Rent"
                    ? "Move-in Date"
                    : "Purchase Date"}
                </label>
                <input
                  type="date"
                  id="moveInDate"
                  name="moveInDate"
                  value={form.moveInDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-green-600" /> Your
                  Budget
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder={
                    form.requestType === "Rent"
                      ? "Monthly budget"
                      : "Maximum offer"
                  }
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 flex items-center">
                <Users className="mr-1 h-4 w-4 text-green-600" /> Number of
                Occupants
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                min="1"
                required
              />
            </div>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Required Amenities
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    id={`amenity-${amenity}`}
                    name="amenitiesRequired"
                    type="checkbox"
                    value={amenity}
                    checked={form.amenitiesRequired.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="ml-2 block text-sm text-gray-700">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Special Requests
            </h3>

            <div>
              <label
                htmlFor="specialRequests"
                className="block text-sm font-medium text-gray-700">
                Message to Owner
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows="4"
                value={form.specialRequests}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Share any special requests, questions, or offers you'd like to make..."></textarea>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Your Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAgreed"
                name="termsAgreed"
                type="checkbox"
                checked={form.termsAgreed}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="termsAgreed" className="text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-green-600 hover:text-green-700">
                  Terms and Conditions
                </a>{" "}
                and acknowledge the{" "}
                <a href="#" className="text-green-600 hover:text-green-700">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={!form.termsAgreed}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Send Request
              </div>
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PropertyRequestForm;
