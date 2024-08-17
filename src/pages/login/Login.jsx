import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-content">
          {error && <div className="error-message">
            <p>{error}</p>
          </div>}
          <h1>Sign In</h1>
          <div className="input-container">
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClickButton={handleLogin}>Login</Button>
          <NavLink to="/register">Don't have account? Register</NavLink>
        </div>
      </div>
    </div>
  );
};
