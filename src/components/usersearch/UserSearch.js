import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./UserSearch.css";

function UserSearch() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const search = async () => {
      await fetch(`https://api.github.com/search/users?q=${userInput}+in:name`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.items);
          setUsers(data.items);
        });
    };
    if (userInput) {
      search();
    }
  }, [userInput]);

  console.log(users);

  const result = users.map((user) => {
    return (
      <div key={user.login}>
        <Link key={user.login} to={`/user/${user.login}`}>
          <p>"{user.login}"</p>
        </Link>
      </div>
    );
  });

  return (
    <>
      <div className="searchContainer">
        <input
          className="searchField"
          type="text"
          placeholder="Search users by name..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="searchResults">{result}</div>
      </div>
    </>
  );
}

export default UserSearch;
