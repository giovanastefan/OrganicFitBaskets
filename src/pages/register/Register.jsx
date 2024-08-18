import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./Register.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");
    console.log('ema', )
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created successfully!");
    } catch (err) {
      setMessage(
        "Failed to create an account. Please check the information provided."
      );
    }
  };

  return (
    <div class="login-container">
      <div class="login-content">
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
        <h1>Sign Up</h1>
        <div class="input-container">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <div class="terms-container">
            <input type="checkbox" class="terms-checkbox" id="terms" />
            <span for="terms">Accept all terms & Conditions</span>
          </div>
        </div>
        <Button onClickButton={handleRegister}>Create Account</Button>
        <NavLink to="/login"> Already have account? Login</NavLink>
      </div>
    </div>
  );
};
