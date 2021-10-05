import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSearch from "../usersearch/UserSearch";

import "./UserList.css";

function UserList() {
  const [userlist, setUserlist] = useState([]);
  const [currentPage, setCurrentpage] = useState("");
  const [nextPage, setNextpage] = useState("");
  const [prevPage, setPrevpage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.github.com/users?per_page=10")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setUserlist(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    setCurrentpage(10);
    setNextpage(currentPage + 10);
  }, [currentPage]);

  const handleClick = ({ nextPage }) => {
    setIsLoading(true);
    fetch(`https://api.github.com/users?since=${nextPage}&per_page=10`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setUserlist(data);
        setNextpage(nextPage + 10);
        console.log(nextPage);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    setPrevpage(nextPage - 10);
  };

  const handlePrevClick = ({ prevPage }) => {
    setIsLoading(true);
    fetch(`https://api.github.com/users?since=${prevPage}&per_page=10`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setUserlist(data);
        setPrevpage(prevPage - 10);
        console.log("prevpage", prevPage);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="mainContainer">
        <div className="searchField">
          <UserSearch />{" "}
        </div>
        <ul className="userListContainer">
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
            <button onClick={() => handlePrevClick({ prevPage })}>
              {"< Prev"}
            </button>
            <button onClick={() => handleClick({ nextPage })}>
              {"Next >"}
            </button>
          </div>
        </ul>
      </div>
    </>
  );
}

export default UserList;
