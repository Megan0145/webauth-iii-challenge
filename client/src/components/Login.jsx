import React, { useRef } from "react";
import axios from "axios";

export default function Login(props) {
  const username = useRef(null);
  const password = useRef(null);

  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/login", {
        username: username.current.value,
        password: password.current.value
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input placeholder="Username" ref={username} type="text" />
        <input placeholder="Password" ref={password} type="password" />
        <button onClick={login}>Login</button>
      </form>
    </div>
  );
}
