import React from "react";
import { useEffect, useState } from "react";
import { isElementOfType } from "react-dom/test-utils";
import { useParams } from "react-router";

import "./UserDetails.css";

function UserRepos() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=10`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRepos(data);
      });
  }, [username]);

  return (
    <ul>
      {repos.map((repo) => (
        <div key={repo.id}>
          <a className="reposContainer" href={repo.html_url}>
            {" "}
            <h3>{repo.name}</h3>
            <div className="seperator" />
          </a>
        </div>
      ))}
    </ul>
  );
}

export default UserRepos;
