import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import UserRepos from "./UserRepos";
import "./UserDetails.css";

function UserDetails() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [bio, setBio] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { username } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [username]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const setData = ({ name, login, avatar_url, followers, following, bio }) => {
    setName(name);
    setUsername(login);
    setAvatar(avatar_url);
    setFollowers(followers);
    setFollowing(following);
    setBio(bio);
  };

  return (
    <div className="detailsContainer">
      <div className="userInfo">
        <img className="userImage" src={avatar} alt="user avatar" />
        <h1 className="userHeading">{name}</h1>
        <h2 className="userHeading">"{userName}"</h2>
        {bio ? <p>{bio}</p> : <p>{name} has no bio</p>}
        <button onClick={() => history.push("/")}>Go to all users</button>
        <div className="followersSection">
          <h3>Followers: {followers} </h3>
          <h3>Following: {following} </h3>
        </div>
      </div>
      <div className="reposListContainer">
        <h2 className="reposHeading">Top 10 Repos: </h2>

        <UserRepos username={username} />
      </div>
    </div>
  );
}

export default UserDetails;
