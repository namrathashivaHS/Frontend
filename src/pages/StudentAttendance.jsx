import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import StudentList from './shared/StudentList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";

function StudentAttendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [msg,setMessage] = useState("");
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
        // Update the parent component's state with the received data
        setChildData(user);
        navigate('/student/attendance');
        
    if(cookies.jwt && user.role=="Student"){
        const email=user.email;
        console.log(email);
        try{
                const { data } = await axios.get('https://hvs-backend.onrender.com/student/attendance',
                {
                    params:{
                        email:email,
                    },
                    withCredentials: true,
                }); 
                const { success, message, attend } = data;
            if(success){
                setAttendanceData(attend);
                setMessage(message);
                navigate('/student/attendance');
            }
            else{
                setMessage(message);
                navigate('/student');
            }

        }catch(error){
            console.log(error.message);
            navigate('/student');
            } 
        }
    }

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div>
    <StudentList className="adprof"/>
    {attendanceData.length>0?(
    <div>
    <table class="stuattdata">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Attendance Marked By</th>
          <th>Month</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((item) => (
          <tr key={item._id}>
            <td>{item.student_id}</td>
            <td>{item.marked_by}</td>
            <td>{item.month}</td>
            <td>{item.date}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table></div>):<div>No Data Found</div>}</div>
    <div class="message">{ msg }</div>
    <Footer />
    </>
  );
}

export default StudentAttendance;
