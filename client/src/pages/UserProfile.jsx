import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import Banner from "../components/Banner";
import PostCard from "../components/PostCard";
import Visitor from "../components/Visitor";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const url = useLocation();
  const id = url.pathname.split("/")[3];
  console.log(id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await axios
          .get(
            `http://localhost:8080/api/v1/user/profile/${id}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setProfile(response.data.data);
              setIsProfile(true);
            } else {
              setIsProfile(false);
            }
          });
      } catch (error) {
        setIsProfile(false);
      }
    };
    fetchProfile();
  }, [id]);
  return (
    <div className="flex-1 flex">
      {isProfile ? (
        <div className="h-full w-full">
          <Banner
            coverPicUrl={profile.coverPicUrl}
            profilePicUrl={profile.profilePicUrl}
            username={profile.username}
            followersCount={profile.followersCount}
            followCount={profile.followCount}
            blogsCount={profile.blogsCount}
            quote={profile.quote}
            id={profile._id}
          />
          <div className="mt-24">
            <h1 className="font-bold font-Dosis text-4xl">Your Posts.</h1>
            <div className="flex justify-center items-center my-6">
              <div className="grid grid-cols-3 gap-6">
                {profile &&
                  profile.blogs &&
                  profile.blogs.map((item, idx) => {
                    return (
                      <PostCard
                        key={idx}
                        authorId={item.authorId}
                        category={item.category}
                        content={item.content}
                        id={item._id}
                        thumbnail={item.imgUrl}
                        title={item.title}
                        createdAt={item.createdAt.slice(0, 10)}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Visitor />
      )}
    </div>
  );
};

export default UserProfile;
