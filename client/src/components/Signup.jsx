import React, { useRef } from "react";

export default function Signup(props) {
  const username = useRef(null);
  const password = useRef(null);
  const department = useRef(null);

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <input placeholder="Username" ref={username} type="text" />
        <input placeholder="Password" ref={password} type="password" />
        <input placeholder="Department" ref={department} type="text" />
        <button>Sign Me Up</button>
      </form>
    </div>
  );
}
