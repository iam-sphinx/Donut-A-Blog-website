import React from "react";
import FollowBtn from "./FollowBtn";

const Banner = ({
  coverPicUrl,
  profilePicUrl,
  username,
  followersCount,
  blogsCount,
  followCount,
  id,
  quote,
}) => {
  return (
    <div className="h-64 relative">
      <h1 className="absolute text-white font-Dosis text-3xl left-[50%] translate-x-[-50%] z-10">{`❝${quote}❞`}</h1>
      <div className="h-full relative">
        <img
          src={coverPicUrl}
          alt="not found"
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute bg-[#0000008c] top-0"></div>
        <div className="absolute left-[32%] top-[60%]">
          <h1 className="text-white font-bold font-Dosis text-4xl drop-shadow-md">
            {username}
          </h1>
          <FollowBtn authorId={id} />
        </div>

        <div className="absolute right-0 bottom-0 mr-60 text-white p-6 flex gap-12">
          <div className="flex flex-col items-center justify-center gap-1 font-semibold font-Dosis text-2xl">
            <span>{followersCount}</span>
            <span className="font-oxygen">Followers</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 font-semibold font-Dosis text-2xl">
            <span>{blogsCount}</span>
            <span className="font-oxygen">blogs</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 font-semibold font-Dosis text-2xl">
            <span>{followCount}</span>
            <span className="font-oxygen">Follows</span>
          </div>
        </div>
      </div>
      <div className="h-52 w-52 border-8 shadow-inner border-white rounded-full overflow-hidden absolute top-[50%] left-[15%] ">
        <img
          src={profilePicUrl}
          alt="not found"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
