import React from "react";
import cross from "../images/cross.png";
import success from "../images/success.gif";

const SuccessCard = ({ handleClose }) => {
  return (
    <div className="mt-64 h-72 rounded-lg p-6 w-[500px] relative bg-white">
      <img
        src={cross}
        alt=""
        className="w-8 absolute -right-3 -top-3 cursor-pointer"
        onClick={handleClose}
      />
      <div className="flex flex-col flex-1 items-center">
        <img src={success} alt="" className="h-48" />
        <h1 className="font-semibold text-3xl font-Dosis text-[#a6a6a6]">
          Profile Updated Successfully.
        </h1>
      </div>
    </div>
  );
};

export default SuccessCard;
