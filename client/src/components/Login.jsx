import React, { useRef } from "react";

export default function Login(props) {
  const username = useRef(null);
  const password = useRef(null);

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input placeholder="Username" ref={username} type="text" />
        <input placeholder="Password" ref={password} type="password" />
        <button>Login</button>
      </form>
    </div>
  );
}