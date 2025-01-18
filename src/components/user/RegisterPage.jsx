import React, { useState } from "react";
import api from "../../api"; // Custom API instance import
import "./RegisterPage.css"; // Your custom CSS
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      city,
      state,
      address,
      phone,
      password,
    };

    // Using custom api instance
    api
      .post("/register/", userData)  // Adjust your endpoint as needed
      .then((response) => {
        setSuccess("Registration successful!");
        setError("");
        setLoading(false);
        // Reset form fields
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setCity("");
        setState("");
        setAddress("");
        setPhone("");
        setPassword("");
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        // Adjust error message based on the structure your API sends
        setError(error.response?.data?.detail || "Something went wrong. Please try again later.");
        setSuccess("");
      });
  };

  return (
    <div className="register-container">
      <div className="register-card shadow">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <h2>Create an Account</h2>
        <p>Please fill in the details to create your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              id="first_name"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              id="last_name"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              id="city"
              placeholder="Enter your city"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-control"
              id="state"
              placeholder="Enter your state"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="address"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phone"
              placeholder="Enter your phone"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}  // Disable the button while loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
