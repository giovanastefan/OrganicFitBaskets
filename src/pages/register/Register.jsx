import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

import "./Register.css";

export const Register = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    setMessage("");

    if (
      !profile.firstName ||
      !profile.lastName ||
      !profile.email ||
      !profile.phone ||
      !password
    ) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, profile.email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
      });

      setMessage("Account created successfully!");

      setProfile({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      setPassword("");
    } catch (err) {
      setMessage(
        "Failed to create an account. Please check the information provided."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
        <h1>Sign Up</h1>
        <div className="input-container">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profile.firstName}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={profile.email}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Phone"
            value={profile.phone}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="terms-container">
            <input type="checkbox" className="terms-checkbox" id="terms" />
            <span htmlFor="terms">Accept all terms & Conditions</span>
          </div>
        </div>
        <Button onClickButton={handleRegister}>Create Account</Button>
        <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
      </div>
    </div>
  );
};
