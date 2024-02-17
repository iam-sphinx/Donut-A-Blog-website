import React from "react";
import { FaUser } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

const settingsOpt = [
  {
    icon: <FaUser />,
    option: "Account",
  },
  {
    icon: <RiGitRepositoryPrivateFill />,
    option: "Personal",
  },
];

const Sidebar = ({ handleSelectedOpt }) => {
  return (
    <div className="rounded-xl border-2 my-4 w-64 py-4">
      <h1 className="font-semibold text-center w-full text-xl tracking-widest font-Dosis text-[#6f6f6f]">
        Settings Menu
      </h1>

      <div className="mt-6">
        {settingsOpt.map((item, index) => {
          return (
            <div
              key={index}
              className="p-3 hover:bg-[#7b5cfa] font-semibold text-lg font-oxygen text-[#6f6f6f] tracking-wider cursor-pointer flex items-center gap-3 hover:text-white"
              onClick={() => handleSelectedOpt(item.option)}
            >
              {item.icon} {item.option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
