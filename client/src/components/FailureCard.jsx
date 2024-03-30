import React from "react";
import cross from "../images/cross.png";
import failed from "../images/failed.png";
import { useDispatch } from "react-redux";
import { defaultState } from "../slices/userSlice";

const FailureCard = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(defaultState());
  };

  return (
    <div className=" h-72 rounded-lg p-6 w-[500px] relative bg-white shadow-2xl">
      <img
        src={cross}
        alt=""
        className="w-8 absolute -right-3 -top-3 cursor-pointer"
        onClick={handleClose}
      />
      <div className="flex flex-col flex-1 items-center">
        <img src={failed} alt="" className="h-44" />
        <h1 className="font-semibold text-4xl font-Dosis text-[#a6a6a6]">
          Sorry.. Update Failed.
        </h1>
      </div>
    </div>
  );
};

export default FailureCard;
