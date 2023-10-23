import React, { useState } from 'react';
import Footer from './shared/Footer';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function ChangePassword() {
  const navigate = useNavigate();
  const [ errorMessage, seterrorMessage ] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newpassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        let { data } = await axios.post("https://hvs-backend.onrender.com/changePassword",
        {
            ...formData,
        },
        {
            withCredentials:true
        });

        const { success, message } = data;

        if( success ){
            alert(message);
            navigate('/login');
        }else{
            seterrorMessage(message);
        }
    }
    catch(error){
        seterrorMessage(error.message);
    }
  };

  return (
    <>
    {/* <span className="text-primary">
          <a href="/">
          <FontAwesomeIcon icon={faHouse} /> Home
          </a>
        </span>
     */}
      <h4><a href="/login">Login</a></h4>
      <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter the Email</label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Enter the Old Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="newpassword">Enter the New Password</label>
        <input
          type="password"
          id="newpassword"
          name="newpassword"
          autoComplete="off"
          value={formData.newpassword}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <div className="passerror">{ errorMessage }</div>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default ChangePassword;
