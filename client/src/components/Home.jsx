import React, { useEffect, useState } from "react";
import axiosWithAuth from "../axiosWithAuth";

export default function Home(props) {
  const [users, setUsers] = useState();
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:4500/api/users")
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (!localStorage.getItem("token")) {
    return <p>Please log in to see users in the same department as you</p>;
  } else if (localStorage.getItem("token") && !users) {
    return <p>Loading ...</p>;
  }
  return (
    <div>
      <h3>Users in the same department as me: </h3>
      {users.map(user => {
        return <p>{user.username}</p>;
      })}
    </div>
  );
}
