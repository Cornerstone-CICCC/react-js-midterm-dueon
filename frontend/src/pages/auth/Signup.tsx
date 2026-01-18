import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "../../Home.css";

axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.withCredentials = true;

interface ApiError {
  message: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Button Clicked!");
    setError("");

    const { username, email, password, passwordCheck } = formData;
    console.log("formData", formData);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== passwordCheck) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("/users/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      setError(
        axiosError.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Create Account</h2>
        <p>Join us for a better shopping experience.</p>

        {error && (
          <p
            className="auth-error-msg"
            style={{ color: "#d93025", fontSize: "14px", marginBottom: "15px" }}
          >
            {error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="username">Full Name</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="passwordCheck">Password Check</label>
            <input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              placeholder="Confirm your password"
              value={formData.passwordCheck}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-submit-btn">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            style={{
              cursor: "pointer",
              marginLeft: "5px",
              textDecoration: "underline",
            }}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
