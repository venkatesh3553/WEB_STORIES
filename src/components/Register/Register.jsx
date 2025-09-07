import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Register.css";

class Register extends Component {
  state = { username: "", email: "", password: "", confirmpassword: "" };

  reDetailsSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmpassword } = this.state;

    if (password !== confirmpassword) {
      toast.error("Password do not match ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/register", this.state);
      console.log(res);

      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500); // delay so toast is visible
    } catch (err) {
      console.error("Register Error", err);
      toast.error("Mail Already Used");
    }
  };

  render() {
    if (Cookies.get("token")) {
      return <Navigate to="/" replace />;
    }

    return (
      <>
        <div className="re-bg">
          <h1 className="re-head" style={{ color: 'white' }}>Register</h1>

          <form className="re-form-container" onSubmit={this.reDetailsSubmit}>
            <div className="input-container">
              <label htmlFor="nameId" className="re-label">User Name</label>
              <input
                id="nameId"
                type="text"
                placeholder="User name"
                className="re-input"
                onChange={(e) => this.setState({ username: e.target.value })}
                value={this.state.username}
                required
              />
            </div>

            <div className="input-container">
              <label htmlFor="emailId" className="re-label">Email</label>
              <input
                id="emailId"
                type="email"
                placeholder="Email"
                className="re-input"
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.state.email}
                required
              />
            </div>

            <div className="input-container">
              <label htmlFor="passId" className="re-label">Password</label>
              <input
                id="passId"
                type="password"
                placeholder="Password"
                className="re-input"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.password}
                required
              />
            </div>

            <div className="input-container">
              <label htmlFor="confirmpassId" className="re-label">Confirm Password</label>
              <input
                id="confirmpassId"
                type="password"
                placeholder="Confirm password"
                className="re-input"
                onChange={(e) => this.setState({ confirmpassword: e.target.value })}
                value={this.state.confirmpassword}
                required
              />
            </div>

            <button type="submit" className="re-btn">Register</button>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>

        <ToastContainer position="top-right" theme="dark" autoClose={2000} />
      </>
    );
  }
}

export default Register;
