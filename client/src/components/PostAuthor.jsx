import React from "react";
import { Link } from "react-router-dom";

const PostAuthor = ({ id, username, authorProfile }) => {
  return (
    <Link to={`/author/${id}`} className="font-caveat text-xl">
      <div className="flex items-center gap-2 border border-white">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img src={authorProfile} className="w-full h-full object-cover" />
        </div>
        {username}
      </div>
    </Link>
  );
};

export default PostAuthor;
