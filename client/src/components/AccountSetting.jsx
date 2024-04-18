import React, { useRef, useState } from "react";
import axios from "axios";
import profilePic from "../images/profile.png";
import background from "../images/background.jpeg";
import { FaCamera } from "react-icons/fa";
import FailureCard from "./FailureCard";
import SuccessCard from "./SuccessCard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";

const AccountSetting = () => {
  const profileRef = useRef(null);
  const [success, setSuccess] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    cover: null,
    profile: null,
    bio: "",
    quote: "",
  });
  const [tempImages, setTempImages] = useState({
    cover: null,
    profile: null,
  });
  const coverRef = useRef(null);

  const handleProfile = () => {
    profileRef.current.click();
  };

  const handleCover = () => {
    coverRef.current.click();
  };

  const handleImageChange = (e) => {
    const fileData = e.target.files[0];
    const { name } = e.target;
    if (fileData) {
      setFormData({ ...formData, [name]: fileData });
      const tempUrl = URL.createObjectURL(fileData);
      console.log(tempUrl);
      setTempImages({ ...tempImages, [name]: tempUrl });
    } else {
      setFormData({
        ...formData,
        cover: null,
        profile: null,
      });
      setTempImages({
        ...formData,
        cover: null,
        profile: null,
      });
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadProfileData = async () => {
    try {
      const token = user.access_token;
      await axios
        .put("http://localhost:8080/api/v1/user/profile/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token,
          },
        })
        .then((response) => {
          dispatch(getUser(response.data.data));
          setSuccess(1);
        })
        .catch((error) => {
          setSuccess(2);
        });

      setSuccess(true);
    } catch (error) {
      setSuccess(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProfileData();
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
            Account Settings
          </h1>
          {/* Cover Profile */}
          <div className="h-72 rounded-xl overflow-hidden relative bg-green-200">
            <img
              src={
                tempImages.cover
                  ? tempImages.cover
                  : user?.coverPicUrl
                  ? user?.coverPicUrl
                  : background
              }
              alt="not found"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute bottom-0 h-24 w-full bg-[#0000008C] flex items-center justify-center cursor-pointer"
              onClick={handleCover}
            >
              <FaCamera className="text-4xl text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                name="cover"
                ref={coverRef}
                onChange={handleImageChange}
              />
            </div>
          </div>

          {formData.cover && (
            <h1 className="font-semibold text-[#6f6f6f] font-oxygen text-ellipsis mb-2">
              <span className="font-bold text-black">Selected File : </span>
              {formData.cover.name}
            </h1>
          )}

          {/* Profile Picture */}
          <h1 className="text-[#6f6f6f] font-semibold text-2xl font-oxygen mb-6">
            Profile Picture
          </h1>
          <div className="h-44 w-44 rounded-full border-4 overflow-hidden relative mb-2">
            <img
              src={
                tempImages.profile
                  ? tempImages.profile
                  : user?.profilePicUrl
                  ? user?.profilePicUrl
                  : profilePic
              }
              alt="not found"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute bottom-0 h-14 w-full bg-[#0000008C] flex items-center justify-center cursor-pointer"
              onClick={handleProfile}
            >
              <FaCamera className="text-2xl text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                name="profile"
                ref={profileRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
          {formData.profile && (
            <h1 className="font-semibold text-[#6f6f6f] font-oxygen text-ellipsis mb-2">
              <span className="font-bold text-black">Selected File : </span>
              {formData.profile.name}
            </h1>
          )}

          <h1 className="text-[#6f6f6f] font-semibold text-2xl font-oxygen mt-12">
            Quote
          </h1>
          <div className=" h-12 bg-[#fafafa] rounded-sm overflow-hidden border border-[#efefe6] my-2">
            <input
              value={formData.quote}
              name="quote"
              onChange={handleTextChange}
              className="outline-none bg-inherit w-full h-full text-ellipsis px-2"
            />
          </div>
          <h1 className="text-[#6f6f6f] font-semibold text-2xl font-oxygen mt-12">
            Bio
          </h1>
          <div className=" bg-[#fdfbec] rounded-sm  border border-[#efefe6] my-2 ">
            <textarea
              rows={10}
              name="bio"
              value={formData.bio}
              onChange={handleTextChange}
              className="outline-none bg-inherit w-full h-full text-ellipsis resize-none p-2"
            />
          </div>

          <button
            type="submit"
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default AccountSetting;
