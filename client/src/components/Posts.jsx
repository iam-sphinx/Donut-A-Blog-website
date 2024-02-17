import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostsNotFound from "../pages/PostsNotFound";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8080/api/v1/blogs/")
          .then((response) => {
            if (response.status === 200) {
              setPosts(response.data.data);
            }
          });
      } catch (error) {
        setPosts([]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {posts.length > 0 ? (
        <div className="flex justify-center items-center my-6">
          <section className="grid grid-cols-3 gap-6">
            {posts.map((item, index) => {
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
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <PostsNotFound />
        </div>
      )}
    </>
  );
};

export default Posts;
