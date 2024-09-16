import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    let new_url = url;
    new_url = "http://127.0.0.1:8000";
    if (currState === "Login") {
      //   new_url += "/api/user/login";
      new_url += "/swiggy/login/";
    } else {
      //   new_url += "/api/user/register/";
      new_url += "/swiggy/register/";
    }
    console.log(data);
    const response = await axios.post(new_url, data);
    if (response.data.success) {
      console.log(response.data.message);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      loadCartData({ token: response.data.token });
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>{" "}
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your E-Mail"
              required
            />
          ) : (
            <></>
          )}
          <input
            name="username"
            onChange={onChangeHandler}
            value={data.username}
            type="text"
            placeholder="Your username"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button>{currState === "Login" ? "Login" : "Create account"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
