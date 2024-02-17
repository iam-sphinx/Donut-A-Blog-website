import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = () => {
      if (!user) {
        navigate("/");
      }
    };
    checkUser();
  }, []);

  return <>{children} </>;
};

export default RouteGuard;
