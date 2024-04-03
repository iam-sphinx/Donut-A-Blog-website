import React, { useEffect, useState } from "react";
import AuthorCard from "../components/AuthorCard";
import { Link } from "react-router-dom";
import PostsNotFound from "./PostsNotFound";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { failureState, loadingState, successState } from "../slices/userSlice";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const loading = useSelector((state) => state.user.loading);
  const failure = useSelector((state) => state.user.failure);
  const success = useSelector((state) => state.user.success);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(loadingState());
        const response = await axios.get(
          "https://donut-a-blog-website.onrender.com/api/v1/author/"
        );
        if (response.status === 200) {
          dispatch(successState());
          setAuthors(response.data.data);
        } else {
          dispatch(failureState());
        }
      } catch (error) {
        console.log(error.message);
        dispatch(failureState());
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {loading && <LoadingScreen />}
      <div className="flex justify-center items-center flex-1">
        {authors.length > 0 && success && (
          <div className="grid grid-cols-2 gap-12 my-12">
            {authors.map((item, index) => {
              return (
                <AuthorCard
                  key={index}
                  bgUrl={item.coverPicUrl}
                  imgUrl={item.profilePicUrl}
                  followers={item.followerCount}
                  posts={item.postCount}
                  title={item.username}
                  quote={item.quote}
                  id={item._id}
                />
              );
            })}
          </div>
        )}
        {failure && <PostsNotFound />}
      </div>
    </>
  );
};

export default Authors;
