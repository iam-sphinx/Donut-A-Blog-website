import React, { useState } from "react";
import PostCard from "../components/PostCard";
import notFoundImg from "../images/PostNotFound.svg";


const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  return (
    <>
      {posts.length > 0 ? (
        <div className="flex justify-center items-center my-6">
          <section className="grid grid-cols-3 gap-6">
            {posts.map((item, index) => {
              return <PostCard key={index} {...item} />;
            })}
          </section>
        </div>
      ) : (
        <div className="h-72 flex flex-col justify-between items-center gap-4 my-6">
          <img src={notFoundImg} className="h-full object-cover" />
          <h1 className="font-poor-story text-4xl">Oops! No Post Found.</h1>
        </div>
      )}
    </>
  );
};

export default CategoryPosts;
