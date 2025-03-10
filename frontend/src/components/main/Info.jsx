import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";
import { Link } from "react-router-dom";
import ImgGallery from "./ImgGallery";
import { FaBed, FaWifi, FaCity } from "react-icons/fa6";
import { FaCoffee, FaStar, FaShieldAlt } from "react-icons/fa";
import {
  FaSubway,
  FaBus,
  FaTaxi,
  FaRoute,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import url from "../../url.jsx";

const Info = () => {
  // All the existing code for states and functions remains the same
  const [homeData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // For transport tabs
  const { id } = useParams();

  // Dummy crime data based on location
  const getDummyCrimeData = (location) => {
    // Generate different crime stats based on location name (for demo purposes)
    const hash = location
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const overall = 15 + (hash % 70); // Range: 15-85

    return {
      overall: overall,
      theft: Math.max(10, overall - 10 + (hash % 20)),
      violent: Math.max(5, overall - 20 + (hash % 15)),
      safetyNotes: `${location} has a ${
        overall < 30 ? "low" : overall < 60 ? "moderate" : "high"
      } crime rate compared to other areas in the region. ${
        overall < 40
          ? "The area is generally considered safe for residents and visitors."
          : overall < 70
          ? "Exercise normal precautions, especially at night."
          : "Extra vigilance is recommended, particularly after dark."
      }`,
      // No actual heatmap URL, we'll use the fallback grid visualization
      heatmapUrl: null,
    };
  };

  // Get dummy transportation data based on location
  const getDummyTransportData = (location) => {
    // Generate different transport info based on location name
    const hash = location
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Generate a specific lat/lng based on the location name hash
    // These are arbitrary adjustments to create different but plausible coordinates
    const baseLat = 20.5937 + (hash % 100) / 1000;
    const baseLng = 78.9629 + (hash % 100) / 1000;

    return {
      location: {
        lat: baseLat,
        lng: baseLng,
        address: `${location}, India`,
      },
      publicTransport: [
        {
          type: "Metro",
          name: `${location} Metro Station`,
          distance: (1 + (hash % 15) / 10).toFixed(1),
          travelTime: 5 + (hash % 15),
          schedule: "Every 10 minutes (5:00 AM - 11:00 PM)",
        },
        {
          type: "Bus",
          name: `${location} Central Bus Stop`,
          distance: (0.5 + (hash % 8) / 10).toFixed(1),
          travelTime: 2 + (hash % 8),
          schedule: "Every 15 minutes (24 hours)",
        },
      ],
      taxi: {
        availability: hash % 100 > 30 ? "High" : "Medium",
        averageCost: 150 + (hash % 200),
        estimatedTimeToCity: 10 + (hash % 20),
      },
      nearby: [
        {
          name: "City Center",
          distance: (2 + (hash % 10) / 10).toFixed(1),
          travelTime: 10 + (hash % 15),
        },
        {
          name: "Airport",
          distance: (8 + (hash % 20) / 10).toFixed(1),
          travelTime: 25 + (hash % 35),
        },
        {
          name: "Train Station",
          distance: (3 + (hash % 12) / 10).toFixed(1),
          travelTime: 15 + (hash % 20),
        },
      ],
    };
  };

  useEffect(() => {
    const fetchHomes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}info/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching homes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomes();
  }, [id]);

  // Function to get color based on crime rate
  const getCrimeColor = (value) => {
    // Lower value is safer (less crime)
    if (value < 20) return "bg-green-100 text-green-800";
    if (value < 40) return "bg-blue-100 text-blue-800";
    if (value < 60) return "bg-yellow-100 text-yellow-800";
    if (value < 80) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const getCrimeLevel = (value) => {
    if (value < 20) return "Very Low";
    if (value < 40) return "Low";
    if (value < 60) return "Moderate";
    if (value < 80) return "High";
    return "Very High";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-gray-600 text-xl">Property not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get dummy crime data for the location
  const crimeData = getDummyCrimeData(homeData.location || "Default Location");

  // Get dummy transport data for the location
  const transportData = getDummyTransportData(
    homeData.location || "Default Location"
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {/* Image Gallery */}
        <div className="mb-8">
          <ImgGallery src={homeData.images} />
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Title and Book Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-100 pb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {homeData.title}
            </h1>
            <Link to={`/reserve/${id}`}>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md">
                Book Now
              </button>
            </Link>
          </div>

          {/* Location & Capacity Info */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {homeData.location}, India
              </div>
              <div className="ml-3 flex items-center text-yellow-500">
                <FaStar />
                <span className="ml-1 text-gray-700">{homeData.rating}/5</span>
              </div>
            </div>
            <p className="text-gray-600">
              {homeData.guests} guests • {homeData.bedrooms} bedrooms •{" "}
              {homeData.bathrooms} bathrooms
            </p>

            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="text-indigo-900 font-medium mb-2">Price:</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Intl.NumberFormat("hi-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(homeData.price)}
                <span className="text-sm text-gray-500 font-normal ml-1">
                  night
                </span>
              </p>
            </div>
          </div>

          {/* Crime Rate Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaShieldAlt className="mr-2 text-indigo-600" />
              Neighborhood Safety
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Crime Summary */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Safety Overview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">
                          Overall Crime Rate
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCrimeColor(
                            crimeData.overall
                          )}`}>
                          {getCrimeLevel(crimeData.overall)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${crimeData.overall}%` }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Theft</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCrimeColor(
                              crimeData.theft || 0
                            )}`}>
                            {getCrimeLevel(crimeData.theft || 0)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${crimeData.theft || 0}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">
                            Violent Crime
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCrimeColor(
                              crimeData.violent || 0
                            )}`}>
                            {getCrimeLevel(crimeData.violent || 0)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{
                              width: `${crimeData.violent || 0}%`,
                            }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">
                    {crimeData.safetyNotes ||
                      "This area has varying levels of safety. Please review the crime statistics to make an informed decision."}
                  </p>
                </div>

                {/* Crime Heatmap */}
                <div className="flex-1 md:border-l md:pl-6 border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Area Crime Heatmap
                  </h3>
                  <div className="w-full h-48 bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                    <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full max-w-xs">
                      {Array.from({ length: 25 }).map((_, i) => {
                        // Generate a pattern based on distance from center and adding some randomness
                        const row = Math.floor(i / 5);
                        const col = i % 5;

                        // Create hotspots based on the location hash
                        const locationHash = homeData.location
                          ? homeData.location
                              .split("")
                              .reduce(
                                (acc, char) => acc + char.charCodeAt(0),
                                0
                              )
                          : 0;

                        const hotspot1Row = locationHash % 5;
                        const hotspot1Col = (locationHash + 2) % 5;
                        const hotspot2Row = (locationHash + 1) % 5;
                        const hotspot2Col = (locationHash + 3) % 5;

                        const distToHotspot1 = Math.sqrt(
                          Math.pow(row - hotspot1Row, 2) +
                            Math.pow(col - hotspot1Col, 2)
                        );
                        const distToHotspot2 = Math.sqrt(
                          Math.pow(row - hotspot2Row, 2) +
                            Math.pow(col - hotspot2Col, 2)
                        );

                        const minDist = Math.min(
                          distToHotspot1,
                          distToHotspot2
                        );
                        const baseIntensity = Math.max(0, 1 - minDist / 3);

                        // Add some randomness
                        const random = Math.sin(i * locationHash) * 0.15;
                        const intensity = Math.min(
                          1,
                          Math.max(0, baseIntensity + random)
                        );

                        const opacity = intensity.toFixed(1);

                        return (
                          <div
                            key={i}
                            className="w-full h-8 rounded"
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${opacity})`,
                              transition: "all 0.3s ease",
                            }}></div>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Crime density in neighborhood
                    </p>
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-gray-500">
                    <span>Lower Crime</span>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gradient-to-r from-blue-100 to-blue-600 rounded"></div>
                    </div>
                    <span>Higher Crime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEW TRANSPORTATION SECTION */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaRoute className="mr-2 text-indigo-600" />
              Transportation & Location
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Transportation Info */}
                <div className="flex-1">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`py-3 px-2 text-sm font-medium border-b-2 ${
                          activeTab === "overview"
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}>
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab("public")}
                        className={`py-3 px-2 text-sm font-medium border-b-2 ${
                          activeTab === "public"
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}>
                        Public Transport
                      </button>
                      <button
                        onClick={() => setActiveTab("taxi")}
                        className={`py-3 px-2 text-sm font-medium border-b-2 ${
                          activeTab === "taxi"
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}>
                        Taxi Services
                      </button>
                    </nav>
                  </div>

                  <div className="mt-4">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          This property is located in {homeData.location}, with
                          excellent connectivity to major attractions and
                          transport hubs.
                        </p>

                        <h3 className="font-medium text-gray-800 mt-4">
                          Nearby Destinations
                        </h3>
                        <div className="space-y-3">
                          {transportData.nearby.map((place, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between border-b border-gray-100 pb-2">
                              <div className="flex items-center">
                                <FaMapMarkedAlt className="text-indigo-500 mr-2" />
                                <span className="text-gray-700">
                                  {place.name}
                                </span>
                              </div>
                              <div className="text-gray-600 text-sm">
                                {place.distance} km ({place.travelTime} mins)
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Public Transport Tab */}
                    {activeTab === "public" && (
                      <div className="space-y-4">
                        {transportData.publicTransport.map((transit, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                              {transit.type === "Metro" ? (
                                <FaSubway className="text-indigo-600 mr-2" />
                              ) : (
                                <FaBus className="text-indigo-600 mr-2" />
                              )}
                              <h3 className="font-medium text-gray-800">
                                {transit.name}
                              </h3>
                            </div>
                            <div className="ml-6 space-y-1 text-sm">
                              <p>
                                <span className="text-gray-500">Distance:</span>{" "}
                                {transit.distance} km
                              </p>
                              <p>
                                <span className="text-gray-500">
                                  Walk time:
                                </span>{" "}
                                ~{transit.travelTime} mins
                              </p>
                              <p>
                                <span className="text-gray-500">Schedule:</span>{" "}
                                {transit.schedule}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="bg-indigo-50 p-3 rounded-lg text-sm text-indigo-800 mt-2">
                          <p>
                            Public transport is the most convenient way to
                            explore the city from this location.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Taxi Tab */}
                    {activeTab === "taxi" && (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center mb-2">
                            <FaTaxi className="text-indigo-600 mr-2" />
                            <h3 className="font-medium text-gray-800">
                              Taxi Services
                            </h3>
                          </div>
                          <div className="space-y-3 mt-2">
                            <p className="flex justify-between">
                              <span className="text-gray-600">
                                Availability:
                              </span>
                              <span className="font-medium">
                                {transportData.taxi.availability}
                              </span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-600">
                                Average fare to city center:
                              </span>
                              <span className="font-medium">
                                ₹{transportData.taxi.averageCost}
                              </span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-600">
                                Travel time to city center:
                              </span>
                              <span className="font-medium">
                                ~{transportData.taxi.estimatedTimeToCity} mins
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 p-3">
                          <p>
                            Popular taxi apps like Ola and Uber operate in this
                            area. Local auto-rickshaws are also readily
                            available.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Google Maps - THE FIX IS HERE: Added position-relative to the container */}
                <div className="flex-1 min-h-64 border rounded-lg overflow-hidden shadow-sm relative">
                  <div className="bg-indigo-600 text-white p-3 flex items-center">
                    <FaMapMarkedAlt className="mr-2" />
                    <h3 className="font-medium">Location Map</h3>
                  </div>

                  {/* Google Maps iframe */}
                  <div className="h-64 bg-gray-100 relative">
                    <iframe
                      title="Property Location"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${encodeURIComponent(
                        transportData.location.address
                      )}&center=${transportData.location.lat},${
                        transportData.location.lng
                      }&zoom=15`}
                      allowFullScreen></iframe>

                    {/* Note: In a real application, you would replace YOUR_API_KEY_HERE with an actual Google Maps API key */}

                    {/* Fallback placeholder in case the iframe doesn't load - now properly contained */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
                      <div className="text-center p-4">
                        <FaMapMarkedAlt className="text-indigo-500 text-4xl mx-auto mb-2" />
                        <p className="text-gray-700">Interactive map view</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Located at: {transportData.location.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END OF TRANSPORTATION SECTION */}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              About this place
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {homeData.description ||
                "Experience comfort and luxury in this beautiful property located in the heart of the city."}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="bg-indigo-100 p-3 rounded-full mr-3">
                  <FaBed className="text-indigo-600" size={20} />
                </div>
                <p className="text-gray-700">Wonderful sleep</p>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="bg-indigo-100 p-3 rounded-full mr-3">
                  <FaWifi className="text-indigo-600" size={20} />
                </div>
                <p className="text-gray-700">Wifi</p>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="bg-indigo-100 p-3 rounded-full mr-3">
                  <FaCoffee className="text-indigo-600" size={20} />
                </div>
                <p className="text-gray-700">Coffee</p>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="bg-indigo-100 p-3 rounded-full mr-3">
                  <FaCity className="text-indigo-600" size={20} />
                </div>
                <p className="text-gray-700">Beautiful City View</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Reviews
            </h2>
            {homeData.reviews && homeData.reviews.length > 0 ? (
              <div className="space-y-6">
                {homeData.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <img
                          src={
                            review.user?.profileImage
                              ? `${url}${review.user.profileImage}`
                              : `${url}default-profile.png`
                          }
                          alt="User"
                          className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          <p className="font-medium text-gray-800 mr-2">
                            {review.user?.name || "Guest"}
                          </p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, idx) => (
                              <FaStar key={idx} size={14} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                No reviews yet. Be the first to leave a review!
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Info;
