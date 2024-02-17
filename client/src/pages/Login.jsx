import React, { useState } from "react";
import imgSrc from "../images/Walking.jpeg";
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPass, setShowPass] = useState("password");
  const [hide, setHide] = useState(true);
  const [userNameFlag, setUserNameFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormChange = function (e) {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    setErrorFlag(false);
    setUserNameFlag(false);
    setPasswordFlag(false);
  };
  const handleShowPass = function () {
    setShowPass(showPass === "text" ? "password" : "text");
    setHide(!hide);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      setUserNameFlag(true);
      return;
    }
    if (!formData.password) {
      setPasswordFlag(true);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios
      .post("http://localhost:8080/api/v1/user/login", formData, config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data);
          dispatch(getUser(response.data.data));
          navigate("/");
        }
      })
      .catch((error) => {
        setErrorFlag(true);
      });
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
                  <span className="font-oxygen text-3xl font-medium">
                    Login Your Account
                  </span>
                  <span className="font-Dosis text-2xl font-normal">
                    Good See You Back! Have A Nice Day😊
                  </span>
                  {errorFlag && (
                    <span className="font-oxygen font-bold text-red-600">
                      *Invalid credentials.
                    </span>
                  )}
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
                    Login
                  </button>

                  <div className="flex justify-end gap-3 items-center">
                    <span className="text-lg text-black">
                      if didn't created an account yet.
                    </span>
                    <Link to="/register">
                      <button className=" text-lg text-[#a6a6a6] hover:text-black hover:underline">
                        Sign up
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

export default Login;
