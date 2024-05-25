import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import notFoundImg from "../images/PostNotFound.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AuthorProfile = () => {
  const [posts, setPosts] = useState([]);

  const url = useLocation();
  const id = url.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/author/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setPosts(response.data.data[0]);
          }
        })
        .catch((error) => {
          setPosts([]);
        });
    };
    fetchData();
  }, [id]);
  return (
    <>
      {posts ? (
        <div className="flex justify-center items-center my-6">
          <section className="grid grid-cols-3 gap-6">
            {posts?.blogs?.map((item, index) => {
              return (
                <PostCard
                  key={index}
                  authorId={item.authorId}
                  category={item.category}
                  content={item.content}
                  id={item._id}
                  thumbnail={item.imgUrl}
                  title={item.title}
                  authorName={posts.username}
                  authorProfile={posts.profilePicUrl}
                  createdAt={item.createdAt.slice(0, 10)}
                />
              );
            })}
          </section>
        </div>
      ) : (
        <div className="h-72 flex flex-col justify-between items-center gap-4 my-6">
          <img src={notFoundImg} className="h-full object-cover" alt="" />
          <h1 className="font-poor-story text-4xl">Oops! No Post Found.</h1>
        </div>
      )}
    </>
  );
};

export default AuthorProfile;
