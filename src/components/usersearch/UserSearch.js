import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./UserSearch.css";

function UserSearch() {
  /*   const [users, setUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]); */
  const [userInput, setUserInput] = useState("");
  const [userSearchResult, setUserSearchResult] = useState("");

  //Would like to search trough all users on input-change, and store results in list.
  //Beacause of the api's request limits I'm not sure how to achieve this.
  //And since we can maximum get 100 users per_page, how to do this without firing a ton of requets?

  /* useEffect(() => {
    const fetchUser = async () => {
      fetch(`https://api.github.com/users?since=100&per_page=100
      `)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    };
    fetchUser();
  }, []);  */

  /*  const onChangeHandler = (userInput) => {
    let matches = [];
    if (userInput.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${userInput}`, "gi");
        return user.login.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setUserInput(userInput);
  }; */

  const fetchUser = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserSearchResult(data);
        console.log(userSearchResult);
      })
      .catch((err) => {
        console.log(err);
      });
    setUserInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };

  return (
    <>
      <form className="searchContainer" onSubmit={handleSubmit}>
        <input
          className="searchField"
          type="text"
          placeholder="Search user by name..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onSubmit={handleSubmit}>Search</button>
        <Link
          className="searchResults"
          key={userSearchResult.login}
          to={`/user/${userSearchResult.login}`}
        >
          <div>{userSearchResult.login}</div>
        </Link>

        {/*     {suggestions &&
          suggestions.map((suggestions, i) => (
            <div key={i}>
              <Link
                className="searchResults"
                key={suggestions.login}
                to={`/user/${suggestions.login}`}
              >
                {suggestions.login}
              </Link>{" "}
            </div>
          ))} */}
      </form>
    </>
  );
}

export default UserSearch;
