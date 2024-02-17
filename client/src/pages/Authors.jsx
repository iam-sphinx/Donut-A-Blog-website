import React, { useEffect, useState } from "react";
import AuthorCard from "../components/AuthorCard";
import { Link } from "react-router-dom";
import PostsNotFound from "./PostsNotFound";
import axios from "axios";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/author/"
        );
        if (response.status === 200) {
          setAuthors(response.data.data);
        } else {
          setAuthors([]);
        }
      } catch (error) {
        console.log(error.message);
        setAuthors([]);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center">
      {authors.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 my-6">
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
      ) : (
        <PostsNotFound />
      )}
    </div>
  );
};

export default Authors;
