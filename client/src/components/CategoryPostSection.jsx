import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const CategoryPostSection = ({ category }) => {
  const [categoryPost, setCategoryPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://donut-a-blog-website.onrender.com/api/v1/blogs/?category=${category}`
      );
      setCategoryPosts(response.data.data);
    };
    fetchData();
  }, [category]);
  if (categoryPost.length === 0) {
    return <></>;
  }

  return (
    <>
      <h1 className="my-6 mt-12 font-bold text-3xl text-[#474747]">{category}</h1>
      <div className="grid sm:grid-cols-3 gap-6 grid-cols-1">
        {categoryPost.map((item, index) => {
          return (
            <PostCard
              key={index}
              authorId={item.authorId}
              category={item.category}
              content={item.content}
              id={item._id}
              thumbnail={item.imgUrl}
              title={item.title}
              authorName={item.author[0].username}
              authorProfile={item.author[0].profilePicUrl}
              createdAt={item.createdAt.slice(0, 10)}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryPostSection;
