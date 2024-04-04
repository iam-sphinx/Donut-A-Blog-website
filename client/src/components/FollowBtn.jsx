import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FollowBtn = ({ authorId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleFollow = async () => {
    try {
      const token = user.access_token;
      const response = await axios.get(
        `http://localhost:8080/api/v1/author/follow/${authorId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    } catch (error) {
      setIsFollowed(false);
    }
  };

  useEffect(() => {
    const checkFollow = async () => {
      try {
        const token = user.access_token;
        await axios
          .get(`http://localhost:8080api/v1/author/follow/check/${authorId}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setIsFollowed(response.data.data);
            }
          });
      } catch (error) {}
    };
    checkFollow();
  }, [authorId, user.access_token]);
  return (
    <button
      className="py-1 px-6 border-white border-2 mt-2 cursor-pointer rounded-lg text-white font-semibold font-oxygen"
      onClick={handleFollow}
    >
      {isFollowed ? "Followed" : "Follow"}
    </button>
  );
};

export default FollowBtn;
