import React, { useState } from "react";

const Nav = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "Flat",
    "Apartments",
    "Homestay",
    "Bunglows",
    "Penthouse",
  ];

  return (
    <>
      <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm mb-8">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium cursor-pointer transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}>
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Nav;
