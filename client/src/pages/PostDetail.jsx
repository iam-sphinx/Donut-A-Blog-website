import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import axios from "axios";
import PostsNotFound from "./PostsNotFound";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const user = useSelector((state) => state.user.user);
  const [post, setPost] = useState();
  const url = useLocation();
  const blogId = url.pathname.split("/")[2];
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios
        .delete(`http://localhost:8080/api/v1/blogs/delete/${blogId}`, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/");
        });
    } catch (error) {}
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/blogs/${blogId}`)
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 my-2 flex justify-center">
      {post ? (
        <div className="h-full w-[1240px] bg-white shadow-lg p-6 rounded-lg">
          <div className="flex justify-between">
            <div className="flex-1"></div>
            <h1 className="font-bold text-5xl font-poor-story">{post.title}</h1>
            <div className="flex-1 flex items-center justify-end gap-5">
              {user._id == post.authorId ? (
                <>
                  <button className="px-3 py-2  flex items-center gap-2 rounded-md text-white bg-green-300 hover:scale-105 shadow-lg hover:text-[#4e4e4e] transition ease-in-out duration-150">
                    <FaPen />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-3 py-2 bg-red-300 text-white flex items-center gap-2 rounded-md hover:scale-105 shadow-lg hover:text-[#4e4e4e] transition ease-in-out duration-150"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="h-96 w-full my-6">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img src={post.imgUrl} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Author Section */}
          <PostAuthor
            id={post.authorId}
            username={post?.author ? post.author[0].username : ""}
            authorProfile={post.author ? post.author[0].profilePicUrl : null}
          />

          {/* Post Section */}
          <div className="font-normal font-oxygen mt-6 text-lg">
            {post.content}
          </div>
        </div>
      ) : (
        <PostsNotFound />
      )}
    </div>
  );
};

export default PostDetail;
