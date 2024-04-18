import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import axios from "axios";
import PostsNotFound from "./PostsNotFound";
import { useDispatch, useSelector } from "react-redux";
import { failureState, loadingState, successState } from "../slices/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import parse from "html-react-parser";

const PostDetail = () => {
  const user = useSelector((state) => state.user.user);
  const [post, setPost] = useState();
  const loading = useSelector((state) => state.user.loading);
  const failure = useSelector((state) => state.user.failure);
  const success = useSelector((state) => state.user.success);
  const dispatch = useDispatch();
  const url = useLocation();
  const blogId = url.pathname.split("/")[2];
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = user.access_token;
      await axios
        .delete(`https://donut-a-blog-website.onrender.com/api/v1/blogs/delete/${blogId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          navigate("/");
        });
    } catch (error) {}
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadingState());
      await axios
        .get(`https://donut-a-blog-website.onrender.com/api/v1/blogs/${blogId}`)
        .then((response) => {
          dispatch(successState());
          setPost(response.data.data);
        })
        .catch((error) => {
          dispatch(failureState());
        });
    };
    fetchData();
  }, [blogId, dispatch]);

  return (
    <>
      {loading && <LoadingScreen />}

      {success && post && (
        <div className="flex-1 my-2 flex justify-center">
          <div className="h-full sm:w-[1240px] bg-white shadow-lg p-6 rounded-lg">
            <div className="flex justify-between">
              <div className="flex-1"></div>
              <h1 className="font-bold text-5xl font-poor-story">
                {post?.title}
              </h1>
              <div className="flex-1 flex items-center justify-end gap-5">
                {user?._id === post.authorId ? (
                  <>
                    <Link
                      className="px-3 py-2  flex items-center gap-2 rounded-md text-white bg-green-300 hover:scale-105 shadow-lg hover:text-[#4e4e4e] transition ease-in-out duration-150"
                      to={`/post/edit/${blogId}`}
                    >
                      <FaPen />
                      Edit
                    </Link>
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
            <div className="sm:h-96 h-52 w-full my-6">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={post?.imgUrl}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>

            {/* Author Section */}
            <PostAuthor
              id={post?.authorId}
              username={post?.author ? post.author[0].username : ""}
              authorProfile={post.author ? post.author[0].profilePicUrl : null}
            />

            {/* Post Section */}
            <article className="font-normal font-oxygen mt-6 text-lg prose prose-slate">
              {parse(post?.content)}
            </article>
          </div>
        </div>
      )}
      {failure && <PostsNotFound />}
    </>
  );
};

export default PostDetail;
