import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function Student() {
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);


  const [user, setChildData] = useState('');
  const receiveDataFromChild = (user) => {
      const token = sessionStorage.getItem('jwt');
      // Update the parent component's state with the received data
      setChildData(user);
      if(token && user.role=="Student"){
          console.log("Authorized as Student");
          navigate("/student");
        }else{
          navigate("/login");
        }
    };  
  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <nav>
      <ul className="adminlist">
        <li><a href="/student/profile">Profile</a></li>
        <li><a href="/course">Course</a></li>
        <li><a href="/student/attendance">Attendance</a></li>
        <li><a href="/student/viewProgressReport">Progress Report</a></li>
        <li><a href="/student/timeTable">Time Table</a></li>
      </ul>
    </nav>
    <Footer />
    </>
  );
}

export default Student;
