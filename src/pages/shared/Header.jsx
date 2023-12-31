// import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";


function Header({sendDataToParent}) {
  const navigate=useNavigate();
  const [user, setUsername] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      const token=sessionStorage.getItem('jwt');
       if (!token) {
        //navigate("/signup");
        //removeCookie('jwt');
        sessionStorage.removeItem('jwt');
        setUsername("");
        navigate('/login');
      }
      const { data } = await axios.post(
        "https://hvs-backend.onrender.com/user",
        {cookies:token},
        { withCredentials: true }
      );
      const { status, res } = data;
      console.log(data);      
      if(status){
        const parts = data.user.email.split('@');

        // The local part can sometimes include the name of the user
        const localPart = parts[0];

        // Split the local part by dots, underscores, or other common separators
        const nameWords = localPart.split(/[._-]/);

        // Capitalize the first letter of each word and join them to form the name
        const name = nameWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setUsername(name);
        navigate('/');
        sendDataToParent(data.user);
      }else{
        sessionStorage.removeItem('jwt');
        navigate('/login');
      }
    };
    verifyCookie();
  }, [cookies,navigate,removeCookie]);

  // function setCookie(name, value, seconds) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + (seconds * 1000)); // Convert seconds to milliseconds
  //   const expires = "expires=" + d.toUTCString();
  //   setCookie(name + "=" + value + ";" + expires + ";path=/");
  // }
  
  function handleLogout(e){
    e.preventDefault();
    console.log("User Logged out Successfully");
    sessionStorage.removeItem('jwt');
    const temp=sessionStorage.getItem('jwt');
    console.log(temp);
    setUsername("");
    navigate("/login");    
  }
  return (
    <nav>
      <h1>
        <span className="text-primary">
          <a href="/"  class="head">
          <FontAwesomeIcon icon={faHouse} /> Home
          </a>
        </span>
      </h1>
      <ul>
        {user ? (
          <>
            <li class="wel">Welcome, { user }</li>
            <li>
              <a href="/logout" className="btn" onClick={handleLogout}>
                Log out
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login" className="btn">
                Log in
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
