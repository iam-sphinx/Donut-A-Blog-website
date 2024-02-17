import React from "react";
import ErrorImg from "../images/404-Error.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center">
      <div className="w-[1440px] h-screen flex flex-col items-center">
        <img src={ErrorImg} className="scale-75" />
        <Link to="/" className="font-caveat text-5xl hover:font-semibold hover:scale-105 tracking-wider hover:drop-shadow-lg transition ease-in-out duration-150">Return to Home Page...</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
