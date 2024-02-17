import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { getMonthName } from "../utils/getMonthName";
import { memo } from "react";

const PostCard = ({
  id,
  thumbnail,
  category,
  title,
  content,
  authorId,
  createdAt,
  authorName,
  authorProfile,
}) => {
  const shortContent =
    content?.length < 60 ? content : content?.substr(0, 60) + " • • •";
  const shortTitle =
    title?.length < 25 ? title : title?.substr(0, 25) + " • • •";
  const date = createdAt?.split("-");

  return (
    <Link to={`/posts/${id}`}>
      <div className="h-96 w-96  rounded-3xl flex flex-col m-2 overflow-hidden shadow-lg cursor-pointer">
        <div className="flex-1 overflow-hidden bg-white relative shadow-inner">
          <img src={thumbnail} className="h-full w-full object-cover" />
          <div className="absolute h-14 w-12 bg-white top-0 left-12 shadow-lg">
            <h1 className="h-6 text-center text-2xl font-bold">
              {date && date[2]}
            </h1>
            <h2 className="font-Dosis text-lg h-6 text-center font-semibold">
              {getMonthName(date && date[1])}
            </h2>
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 flex flex-col overflow-hidden justify-between gap-2 p-3">
            <Link to={`/posts/${id}`}>
              <h1 className="text-2xl font-semibold font-Dosis">
                {shortTitle}
              </h1>
            </Link>
            <p className="flex-1 text-[#9c9c9c] text-md font-oxygen">
              {shortContent}
            </p>
            <div className="flex justify-between items-center">
              <PostAuthor
                id={authorId}
                username={authorName}
                authorProfile={authorProfile}
              />
              <span>
                <Link
                  to={`/posts/categories/${category}`}
                  className="inline-flex gap-1 items-center font-Dosis text-lg bg-gray-200 px-3 py-1 rounded-md"
                >
                  {category}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(PostCard);
