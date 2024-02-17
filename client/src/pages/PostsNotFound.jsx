import React from "react";
import notFoundImg from "../images/PostNotFound.svg";

const PostsNotFound = () => {
  return (

      <div className="h-72 flex-col justify-between  items-center gap-4 my-6">
        <img src={notFoundImg} className="h-full object-cover" />
        <h1 className="font-poor-story text-4xl text-center">Oops! No Post Found.</h1>
      </div>

  );
};

export default PostsNotFound;
