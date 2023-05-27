import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers () {
      const res = await fetch('https://api.github.com/users', {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      const data = await res.json();
      setUsers(data)
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("users", users)
  }, [users])

  return (
    <div className="App">
      <p>Fun stuff</p>
      <ul>{users.map((user, index) => {
        return <li key={index}>{user.login}</li>
      })}</ul>
    </div>
  );
}

export default App;
