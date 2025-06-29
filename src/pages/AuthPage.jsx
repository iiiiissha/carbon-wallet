import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import "../styles/Auth.css";

const AuthPage = ({ darkMode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await firebase.signInUserWithEmailAndPassword(email, password);
        alert("Logged in ✅");
      } else {
        await firebase.signupUserWithEmailAndPassword(email, password);
        alert("Registered ✅");
      }
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`auth-container ${darkMode ? "dark" : "light"}`}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="toggle-auth">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"} here
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;

