import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../component/Loader";

const DeletePost = ({ postId: id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const deletePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Couldn't Delete Post");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Link className="btn sm danger" onClick={() => deletePost(id)}>
      Delete
    </Link>
  );
};

export default DeletePost;
