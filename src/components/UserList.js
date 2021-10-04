import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./UserList.css";

function UserList() {
  const [userlist, setUserlist] = useState([]);
  const [currentPage, setCurrentpage] = useState("");
  const [nextPage, setNextpage] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users?per_page=10")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserlist(data);
        setCurrentpage(10);
        setNextpage(currentPage + 10);
      });
  }, []);

  const handleClick = ({ nextPage }) => {
    fetch(`https://api.github.com/users?since=${nextPage}&per_page=10`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserlist(data);
        setNextpage(nextPage + 10);
        console.log(nextPage);
      });
  };

  return (
    <>
      <ul>
        {userlist.map((user) => (
          <div key={user.login} className="userContainer">
            <Link key={user.name} to={`/user/${user.login}`}>
              <img
                src={user.avatar_url}
                alt="User avatar"
                className="userThumbnail"
              />
            </Link>
            <Link key={user.name} to={`/user/${user.login}`}>
              <h2 className="userName">"{user.login}"</h2>
            </Link>
            <Link
              className="hiddenLink"
              key={user.name}
              to={`/user/${user.login}`}
            >
              <p>Go to details page {">"} </p>
            </Link>
          </div>
        ))}
        <div className="buttonContainer">
          <button onClick={() => handleClick({ nextPage })}>
            Show more users
          </button>
        </div>
      </ul>
    </>
  );
}

export default UserList;
