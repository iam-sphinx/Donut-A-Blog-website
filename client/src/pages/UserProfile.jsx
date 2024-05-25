import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import PostCard from "../components/PostCard";
import Visitor from "../components/Visitor";
import BioCard from "../components/BioCard";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const user = useSelector((state) => state.user.user);
  const url = useLocation();
  const id = url.pathname.split("/")[3];
  console.log(id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = user.access_token;
        await axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/user/profile/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
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
  }, [id, user.access_token]);
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
            <div className="flex justify-between gap-6 my-6">
              <div className="flex-1 flex justify-center">
                <div>
                  <BioCard bio={profile.bio} />
                </div>
              </div>
              <div>
                <h1 className="font-bold font-Dosis text-4xl">Your Posts.</h1>
                <div className="grid grid-cols-2 gap-6">
                  {profile &&
                    profile.blogs &&
                    profile.blogs.map((item, idx) => {
                      console.log(item);
                      return (
                        <PostCard
                          key={idx}
                          authorId={item.authorId}
                          category={item.category}
                          content={item.content}
                          id={item._id}
                          thumbnail={item.imgUrl}
                          authorName={profile.username}
                          authorProfile={profile.profilePicUrl}
                          title={item.title}
                          createdAt={item.createdAt.slice(0, 10)}
                        />
                      );
                    })}
                </div>
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
