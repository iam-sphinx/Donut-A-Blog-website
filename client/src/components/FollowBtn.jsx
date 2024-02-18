import axios from "axios";
import React, { useEffect, useState } from "react";

const FollowBtn = ({ authorId }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async () => {
    try {
      const response = await axios.get(
        `https://donut-backend-2vcf.onrender.com/api/v1/author/follow/${authorId}`,
        { withCredentials: true }
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
        await axios
          .get(`http://localhost:8080/api/v1/author/follow/check/${authorId}`, {
            withCredentials: true,
          })
          .then((response) => {
            if (response.status === 200) {
              setIsFollowed(response.data.data);
            }
          });
      } catch (error) {}

      checkFollow();
    };
  }, []);
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
