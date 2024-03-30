import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaPen } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import { TiThMenu } from "react-icons/ti";
import profilePic from "../images/profile.png";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="w-full sm:h-16 h-12 bg-[#FFECD6] shadow-lg flex items-center justify-between px-8 ">
      <Link to="/" className="flex items-center justify-center gap-2">
        <img src={Logo} alt="nav logo" className="sm:h-12 h-8" />
        <h1 className="font-poor-story text-3xl font-bold tracking-wide">
          Donut...
        </h1>
      </Link>

      <div className="hidden sm:flex gap-12">
        <ul className="flex gap-6 items-center text-lg font-oxygen">
          <li>
            <Link
              to={`/profile/dashboard/${user?._id}`}
              className="flex items-center justify-center gap-5"
            >
              {user && (
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[white] shadow-md">
                  <img
                    src={user?.profilePicUrl || profilePic}
                    className="w-full h-full object-cover"
                    alt="not found"
                  />
                </div>
              )}
              {user?.username}
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/create"
                className="flex gap-1 items-center justify-center hover:underline"
              >
                <FaPen /> Create Post
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/authors"
              className="flex gap-1 items-center justify-center hover:underline"
            >
              <FaUser />
              Authors
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/settings"
                className="flex gap-1 items-center justify-center hover:underline"
              >
                <IoSettings />
                Settings
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex gap-1 items-center justify-center hover:underline"
              >
                <PiSignOutBold />
                Logout
              </button>
            ) : (
              <Link to="/register">SignUp</Link>
            )}
          </li>
        </ul>
      </div>

      {/* For Mobile Screen hamburger Menu */}
      <div className="sm:hidden relative">
        <TiThMenu size={24} onClick={()=>{setMenu(!menu)}} />
        {/* Menu */}
        {menu && <div className="h-72 w-48 p-2 mt-1 right-0 z-10 rounded-md bg-white shadow-lg border-2 ring-1 ring-slate-300 absolute">
          <ul className="flex flex-col gap-6 text-lg font-oxygen">
            <li>
              <Link
                to={`/profile/dashboard/${user?._id}`}
                className="flex items-center gap-5"
              >
                {user && (
                  <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[white] shadow-md">
                    <img
                      src={user?.profilePicUrl || profilePic}
                      className="w-full h-full object-cover"
                      alt="not found"
                    />
                  </div>
                )}
                {user?.username}
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/create"
                  className="flex gap-1 items-center hover:underline"
                >
                  <FaPen /> Create Post
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/authors"
                className="flex gap-1 items-center hover:underline"
              >
                <FaUser />
                Authors
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/settings"
                  className="flex gap-1 items-center hover:underline"
                >
                  <IoSettings />
                  Settings
                </Link>
              </li>
            )}
            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex gap-1 items-center justify-center hover:underline"
                >
                  <PiSignOutBold />
                  Logout
                </button>
              ) : (
                <Link to="/register">SignUp</Link>
              )}
            </li>
          </ul>
        </div>}
      </div>
    </nav>
  );
};

export default Header;
