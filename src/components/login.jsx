import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../usercontext";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (response.data.success) {
        console.log("login suc", response.data.user);
        updateUser(response.data.user);
        props.onLogin();
        navigate("/dashboard");
      } else {
        alert("Not found");
      }
    } catch (error) {
      console.error("Error during log: ", error);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-left">
            <div className="login-left-top">
              <h2 className="quote">We make the difference</h2>
            </div>
            <div className="login-left-bottom">
              <h1 className="get-everything">Get Everything You Want</h1>
              <p className="get-everything-p">
                You can get everything you want if you work hard, trust the
                process, and stick to the plan.
              </p>
            </div>
          </div>
          <div className="login-right">
            <div className="login-right-container">
              <div className="logo-container">
                <img src="EPI-USE-logo.svg" alt="" className="logo" />
              </div>
              <div className="form-container">
                <h1>Welcome Back</h1>
                <p className="login-sub-head">
                  Enter your email and password to access your account
                </p>
                <div className="form-inner-container">
                  <p className="login-input-labels">Email</p>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="login-input-labels space">Password</p>
                  <input
                    className="form-input "
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="forgot-password-container">
                    <div className="remember-me">
                      <input className="box" type="checkbox" />
                      <p>Remember me</p>
                    </div>
                    <div className="forgot-password">
                      <p>Forgot Password</p>
                    </div>
                  </div>
                  <button onClick={handleLogin}>Sign In</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
