import React from "react";
import { Link } from "react-router-dom";

const AuthorCard = ({ title, quote, imgUrl, bgUrl, followers, posts, id }) => {
  quote = quote?.length >= 150 ? quote?.slice(0, 150) + "..." : quote;
  return (
    <div className="h-[300px] w-[500px] shadow-lg  rounded-3xl overflow-hidden flex relative isolate aspect-video bg-white/20 ring-1 ring-black/5">
      <div className="flex-[0.7] bg-[#FDF0D1] isolate  ">
        <div className="w-full h-full p-4">
          <div className="w-full h-full ">
            <span className="font-oxygen text-3xl font-semibold text-[#454e65]">
              {title}
            </span>

            <p className="w-72 mt-4">"{quote}"</p>

            <div className="flex items-center mt-4">
              <span className="text-2xl font-medium font-Dosis mr-3">
                {posts} posts
              </span>
              <span className="h-7 w-[1px] bg-black"></span>
              <span className="text-2xl font-medium font-Dosis ml-3">
                {followers} followers
              </span>
            </div>

            <button className="px-8 py-2 bg-blue-500 rounded-3xl mt-4 text-lg font-Dosis hover:shadow-lg hover:text-white">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="flex-[0.3] ">
        <img src={bgUrl} alt="" className="w-full h-full object-cover" />
      </div>
      <Link to={`/profile/${id}`}>
        <div className="absolute left-[60%] top-[50%] translate-y-[-50%] isolate aspect-video w-32 h-32 rounded-full bg-white/20 shadow-lg ring-1 ring-black/5">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AuthorCard;
