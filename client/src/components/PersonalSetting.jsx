import React, { useRef, useState } from "react";
import axios from "axios";
import FailureCard from "./FailureCard";
import SuccessCard from "./SuccessCard";
import { useSelector } from "react-redux";

const PersonalSetting = () => {
  const [success, setSuccess] = useState(0);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateProfileCredentials = async () => {
    try {
      axios
        .put(
          "https://donut-backend-2vcf.onrender.com/api/v1/user/profile/update/credentials",
          formData,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setSuccess(1);
        })
        .catch((error) => {
          setSuccess(2);
        });
    } catch (error) {
      setSuccess(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileCredentials();
  };

  const handleClose = () => {
    setSuccess(0);
  };

  return (
    <>
      {success !== 0 && (
        <div className="h-full w-full flex justify-center absolute top-0 left-0 bg-[#0000008C] z-10">
          {success === 1 && <SuccessCard handleClose={handleClose} />}
          {success === 2 && <FailureCard handleClose={handleClose} />}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border-2 my-4 flex-1 p-4"
      >
        <div>
          <h1 className="text-[#6f6f6f] text-center font-semibold text-3xl font-oxygen mb-2">
            Personal Settings
          </h1>

          <h1 className="text-[#6f6f6f] font-semibold text-2xl font-oxygen mt-12">
            Email
          </h1>
          <div className=" h-12 bg-[#fafafa] rounded-sm overflow-hidden border border-[#efefe6] my-2">
            <input
              value={formData.email}
              name="email"
              onChange={handleTextChange}
              className="outline-none bg-inherit w-full h-full text-ellipsis px-2"
            />
          </div>
          <h1 className="text-[#6f6f6f] font-semibold text-2xl font-oxygen mt-12">
            Password
          </h1>
          <div className=" h-12 bg-[#fafafa] rounded-sm overflow-hidden border border-[#efefe6] my-2">
            <input
              value={formData.password}
              name="password"
              onChange={handleTextChange}
              className="outline-none bg-inherit w-full h-full text-ellipsis px-2"
            />
          </div>

          <button
            type="submit"
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2"
          >
            Update Credentials
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalSetting;
