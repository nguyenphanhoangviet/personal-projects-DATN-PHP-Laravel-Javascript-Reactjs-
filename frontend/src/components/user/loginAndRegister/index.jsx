import React from "react";
import Login from "./Login";
import Register from "./Register";
import './style.scss';

export default function Index() {
  return (
    <div className="login-register-area pt-75 pb-75">
      <div className="container">
        <div className="row">
            <Login />
            <Register />
        </div>
      </div>
    </div>
  );
}
