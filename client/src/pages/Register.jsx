import React, { useState } from "react";
import imgSrc from "../images/wallpaper.jpg";
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [showPass, setShowPass] = useState("password");
  const [hide, setHide] = useState(true);
  const [userNameFlag, setUserNameFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [emailFlag, setEmailFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = function (e) {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    setEmailFlag(false);
    setPasswordFlag(false);
    setUserNameFlag(false);
    setErrorFlag(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      setUserNameFlag(true);
      return;
    }
    if (!formData.email) {
      setEmailFlag(true);
      return;
    }
    if (!formData.password) {
      setPasswordFlag(true);
      return;
    }

    await axios
      .post("https://donut-backend-2vcf.onrender.com/api/v1/user/register", formData)
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorFlag(true);
      });
  };

  const handleShowPass = function () {
    setShowPass(showPass === "text" ? "password" : "text");
    setHide(!hide);
  };
  return (
    <div className="h-screen flex items-center bg-[#f5ebcd] justify-center">
      <div className="w-[1440px] h-screen flex flex-col  justify-center items-center">
        <div className="h-[700px] w-[1000px] flex">
          <div className="flex-1 ">
            <img src={imgSrc} alt="" className="h-full object-cover" />
          </div>
          <div className="flex-1 bg-white p-6 px-12">
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center justify-center">
                <img src={Logo} alt="nav logo" className="h-20" />
                <h1 className="font-poor-story text-5xl font-semibold tracking-wide">
                  Donut...
                </h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-2 mt-12">
                  {errorFlag && (
                    <span className="font-oxygen font-bold text-red-600">
                      *Username or Email already Exists.
                    </span>
                  )}
                  <span className="font-oxygen text-3xl font-medium">
                    Create An Account
                  </span>
                  <span className="font-Dosis text-2xl font-normal">
                    Sign Up Now And Unlock Exclusive Access!
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                  <span className="font-oxygen text-lg ml-3 ">Your Name</span>
                  {userNameFlag && (
                    <span className="font-oxygen font-bold text-red-600">
                      *Username is required field
                    </span>
                  )}
                  <div className="w-full h-12 border border-black rounded-md">
                    <input
                      className="w-full h-full px-3 outline-none text-ellipsis bg-inherit"
                      value={formData.username}
                      placeholder="username"
                      onChange={handleFormChange}
                      name="username"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                  <span className="font-oxygen text-lg ml-3 ">Your email</span>
                  {emailFlag && (
                    <span className="font-oxygen font-bold text-red-600 ">
                      *Email is required field
                    </span>
                  )}
                  <div className="w-full h-12 border border-black rounded-md ">
                    <input
                      className="w-full h-full px-3 outline-none text-ellipsis bg-inherit"
                      value={formData.email}
                      placeholder="you@gmail.com"
                      onChange={handleFormChange}
                      name="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <span className="font-oxygen text-lg ml-3 ">Password</span>
                  {passwordFlag && (
                    <span className="font-oxygen font-bold text-red-600 ">
                      *password is required
                    </span>
                  )}
                  <div className="w-full h-12 border border-black rounded-md flex gap-3 items-center pr-3">
                    <input
                      className="flex-1 px-3 outline-none text-ellipsis bg-inherit"
                      value={formData.password}
                      placeholder="● ● ● ●"
                      type={showPass}
                      onChange={handleFormChange}
                      name="password"
                    />
                    {hide ? (
                      <FaEyeSlash
                        className="text-gray-400 cursor-pointer text-2xl"
                        onClick={handleShowPass}
                      />
                    ) : (
                      <FaEye
                        className="text-gray-400 cursor-pointer text-2xl"
                        onClick={handleShowPass}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-6 mt-8">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-md text-3xl text-white font-single-day bg-[#6481e5] hover:shadow-lg "
                  >
                    Create Account
                  </button>

                  <div className="flex justify-end gap-3 items-center">
                    <span className="text-lg text-black">
                      if already have an account.
                    </span>
                    <Link to="/login">
                      <button className=" text-lg text-[#a6a6a6] hover:text-black hover:underline">
                        Sign in
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
