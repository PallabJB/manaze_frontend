import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropDown = ({ options, value, onChange, placeholder }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

  return <div className=" relative w-full">

    {/* DROPDOWN BUTTON */}

    <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm text-black outline-none bg-white border border-slate-200 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center"
    >
        {value ? options.find((opt) => opt.value === value)?.label : placeholder}
        <span className="ml-2">{isOpen ? <LuChevronDown className=""/> : <LuChevronDown/>}</span>
    </button>


    {/* DROPDOWN MENU */}

    {isOpen && (
        <div className="absolute w-full bg-white border border-slate-200 rounded-md mt-1 shadow-md z-10">
            {options.map((option) => (
                <div className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100" key={option.value} onClick={() => handleSelect(option.value)} >
                    {option.label}
                </div>
            ))}
        </div>
    )}
  </div>;
};

export default SelectDropDown;
