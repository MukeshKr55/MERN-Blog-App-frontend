import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
  const [ava, setAva] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [isAvaTouched, setIsAvaTouched] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setName(res.data.name);
      setEmail(res.data.email);
      setAva(res.data.avatar);
    };

    getUser();
  }, [token, currentUser.id]);

  const changeAvaHandler = async () => {
    setIsAvaTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", ava);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAva(response?.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currPass", currPass);
      userData.set("newPass", newPass);
      userData.set("newConPass", conPass);

      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        navigate("/logout");
      }
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${ava}`}
                alt="avatar"
              />
            </div>
            {/* Form to update avatar */}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png,jpg,jpeg"
                onChange={(e) => setAva(e.target.files[0])}
              />
              <label htmlFor="avatar" onClick={() => setIsAvaTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvaTouched && (
              <button
                className="profile__avatar-btn"
                onClick={changeAvaHandler}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{name}</h1>

          {/* Form to update avatar */}
          <form className="form profile__form" onSubmit={updateUserDetails}>
            {err && <p className="form__error-message">{err}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current Password"
              value={currPass}
              onChange={(e) => setCurrPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={conPass}
              onChange={(e) => setConPass(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
