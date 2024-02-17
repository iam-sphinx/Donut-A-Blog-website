import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaPen } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import profilePic from "../images/profile.png";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <div className="w-full h-16 bg-[#FFECD6] shadow-lg flex items-center justify-between px-8 ">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src={Logo} alt="nav logo" className="h-12" />
          <h1 className="font-poor-story text-3xl font-bold tracking-wide">
            Donut...
          </h1>
        </Link>

        <div className="flex gap-12">
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
      </div>
    </nav>
  );
};

export default Header;
