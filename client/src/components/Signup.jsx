import React, { useRef } from "react";
import axios from "axios";

export default function Signup(props) {
  const username = useRef(null);
  const password = useRef(null);
  const department = useRef(null);

  const signup = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/register", {
        username: username.current.value,
        password: password.current.value,
        department: department.current.value
      })
      .then(res => {
        alert("Account Created! You can now log in");
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <input placeholder="Username" ref={username} type="text" />
        <input placeholder="Password" ref={password} type="password" />
        <input placeholder="Department" ref={department} type="text" />
        <button onClick={signup}>Sign Me Up</button>
      </form>
    </div>
  );
}
