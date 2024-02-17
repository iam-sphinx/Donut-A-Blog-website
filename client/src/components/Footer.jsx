import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#474453] p-4 px-6">
      <div className="flex gap-12">
        <ul className="text-white font-single-day flex flex-col gap-3">
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Agriculture">Agriculture</Link>
          </li>
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Business">Business</Link>
          </li>
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Education">Education</Link>
          </li>
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Entertainment">Entertainment</Link>
          </li>
        </ul>
        <ul className="text-white font-single-day flex flex-col gap-3">
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Art">Art</Link>
          </li>
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Investment">Investment</Link>
          </li>
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Uncategorized">Uncategorized</Link>
          </li>
          <li className="text-[18px] tracking-wide hover:scale-105 transition-all ease-in-out duration-150">
            <Link to="/posts/categories/Weather">Weather</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <h1 className="font-single-day text-lg font-semibold text-[#a6a6a6]">
          All Rights Reserved &copy; Copyright, imsphinx (Kandarp)
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
