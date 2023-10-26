import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://hvs-backend.onrender.com/login",
        {
          ...inputValue,
        },
        { withCredentials: true}
      );
      const { success, message } = data;
      sessionStorage.setItem('jwt',data.token);
      
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          console.log("settimeout");
          navigate("/");
        }, 1000);
        
      } else {
        handleError(message);
        setInputValue({  // Reset the form only on unsuccessful login
        ...inputValue,
        email: "",
        password: "",
      });

      }
    } catch (error) {
      handleError(error.message);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
  const handleAbout = (e) => {
    //e.preventDefault();
    navigate('/about');
  }

  
  return (
    <>
    {/* <Header /> */}
    <button onClick={(e)=>handleAbout(e)}>About</button>
    <div className="flex">
      <h2 class="head">Login</h2>
      <form onSubmit={handleSubmit} class="login">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
          <div ><a href="/changePassword">Forgot password?</a></div>
        </div>
        <button type="submit">Login</button>
        {/* <div>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
          </div> */}
          <div>

          </div>

      </form>
      <ToastContainer />
    </div>
    <Footer/>
    </>
  );
};

export default Login;
