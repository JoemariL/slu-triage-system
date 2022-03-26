import React, { Fragment, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Listbox, Transition } from "@headlessui/react";
import classnames from "classnames";

const Select = ({
  className = "",
  selectStyle = "",
  optionStyle = "",
  items = [],
  label = "",
  subtitle = "",
}) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className={classnames(className)}>
      <span>{label}</span>
      <div className="grid grid-row-2 space-y-2">
        <Listbox
          as="div"
          className="relative"
          value={selectedItem}
          onChange={setSelectedItem}
        >
          {({ open }) => (
            <>
              <Listbox.Button
                className={classnames(
                  "w-full",
                  "p-2",
                  "flex justify-between items-center",
                  "rounded border-2 border-gray-300 bg-white",
                  selectStyle
                )}
              >
                {selectedItem.value}
                <IoIosArrowDropdown
                  className={open ? "h-6 w-6 rotate-180" : "h-6 w-6"}
                />
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Listbox.Options className="absolute w-full mt-2 z-2 rounded border-2 border-gray-300 bg-white">
                  {items.map((item) => (
                    <Listbox.Option
                      className={classnames(
                        "p-2",
                        "rounded cursor-pointer select-none",
                        optionStyle
                      )}
                      key={item.id}
                      value={item}
                    >
                      {item.value}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
        <span className="px-2 text-sm text-gray-500">{subtitle}</span>
      </div>
    </div>
  );
};

export default Select;
