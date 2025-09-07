import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Login.css";

class Login extends Component {
    state = { email: "", password: "", loggedIn: false, errorMsg: "" };

    loginFail = (errorMsg) => {
        this.setState({ errorMsg });
        toast.error(errorMsg || "Login failed");
    };

    loginSuccess = (jwtToken) => {
        toast.success("Login Successful");
        Cookies.set("token", jwtToken, { expires: 30 });
        this.setState({ loggedIn: true });

    };

    reDetailsSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            const res = await axios.post("http://localhost:4000/login", {
                email,
                password,
            });

            if (res.status === 200 && res.data.token) {
                this.loginSuccess(res.data.token);
            } else {
                this.loginFail("Invalid login attempt");
            }
        } catch (err) {
            console.error("Login error:", err);
            if (err.response && err.response.data) {
                this.loginFail(err.response.data); // backend message
            } else {
                this.loginFail("Login failed. Try again");
            }
        }
    };

    render() {
        if (this.state.loggedIn || Cookies.get("token")) {
            return <Navigate to="/" replace />;
        }

        return (
            <>
                <div className="login-bg">
                    <h1 className="login-head" style={{color:'white'}}>Login</h1>

                    <form className="login-form-container" onSubmit={this.reDetailsSubmit}>
                        <div className="input-container">
                            <label htmlFor="emailId" className="login-label">
                                Email
                            </label>
                            <input
                                id="emailId"
                                type="email"
                                placeholder="Email"
                                className="login-input"
                                onChange={(e) => this.setState({ email: e.target.value })}
                                value={this.state.email}
                                required
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="passId" className="login-label">
                                Password
                            </label>
                            <input
                                id="passId"
                                type="password"
                                placeholder="Password"
                                className="login-input"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                value={this.state.password}
                                required
                            />
                        </div>

                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        <span>
                            Don’t have an account? <Link to="/register">Register</Link>
                        </span>
                    </form>
                </div>

                <ToastContainer position="top-right" theme="dark" autoClose={2000} />
            </>
        );
    }
}

export default Login;
