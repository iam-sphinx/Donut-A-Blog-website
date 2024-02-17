import React from "react";
import cross from "../images/cross.png";
import { Link } from "react-router-dom";

const Visitor = () => {
  return (
    <div className="flex-1 flex justify-center">
      <div className="mt-6 flex flex-col gap-3 items-center">
        <img src={cross} alt="not found" className="h-52" />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-extrabold font-oxygen text-[#5d5d5d]">
            Access Denied
          </h1>
          <span className="font-Dosis text-xl text-[#5d5d5d] tracking-wide">
            You do not have permission to view this page.
          </span>
          <span className="font-Dosis text-xl text-[#5d5d5d] tracking-wide">
            Please check your credentials and try again.
          </span>
          <span className="font-Dosis text-xl text-[#5d5d5d] tracking-wide font-semibold">
            Error Code: 403
          </span>
          <Link
            to="/"
            className="font-Dosis text-lg text-[#5d5d5d] tracking-wide hover:underline"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Visitor;
