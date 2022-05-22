import React from "react";
import { BiSearch } from "react-icons/bi";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="w-full px-2 inline-flex items-center border-2 rounded border-gray-300 bg-white focus-within:border-blue-800">
      <BiSearch className="h-6 w-6 mr-2 text-gray-500" />
      <input
        className="w-full p-1.5 rounded-full focus:outline-none"
        placeholder="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default GlobalFilter;
