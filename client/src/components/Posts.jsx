import React, { useEffect, useState } from "react";
import PostsNotFound from "../pages/PostsNotFound";
import LoadingScreen from "./LoadingScreen";
import CategoryPostSection from "./CategoryPostSection";

const Posts = () => {
  const postsCategories = [
    "Agriculture",
    "Business",
    "Education",
    "Entertianment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];
  const [posts, setPosts] = useState([]);

  return (
    <>
      {postsCategories.map((item, idx) => {
        return <CategoryPostSection category={item} key={idx} />;
      })}
    </>
  );
};

export default Posts;
