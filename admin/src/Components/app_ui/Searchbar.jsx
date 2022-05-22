import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Input } from "../common";

const Searchbar = ({ className = "", setPlaceholder = "", onSearch }) => {
  const [search, setSearch] = useState(() => {
    return "";
  });

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <Input
      className={className}
      placeholder={setPlaceholder}
      value={search}
      onChange={(event) => {
        onInputChange(event.target.value);
      }}
      iconLeft={<BiSearch className="h-6 w-6 mr-2 text-gray-500" />}
    />
  );
};

export default Searchbar;
