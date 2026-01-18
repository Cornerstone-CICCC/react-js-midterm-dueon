import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "../../Home.css";

axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.withCredentials = true;

interface ApiError {
  message: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        console.log("Login Response Role:", response.data.role);

        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("username", response.data.username);

        alert("Welcome!");
        window.location.href = "/";
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      setError(
        axiosError.response?.data?.message || "Invalid email or password."
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Log In</h2>
        <p>Welcome back! Please enter your details.</p>

        {error && (
          <p
            style={{ color: "#d93025", fontSize: "14px", marginBottom: "15px" }}
          >
            {error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-submit-btn">
            LOG IN
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>
        <button className="social-login-btn" type="button">
          <img
            src="https://www.google.com/favicon.ico"
            width="16"
            alt="google"
          />
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            style={{
              cursor: "pointer",
              marginLeft: "5px",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
