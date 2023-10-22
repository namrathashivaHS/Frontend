import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import ParentsList from './shared/ParentsList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function ViewAttendance() {
    const [attData, setAttData] = useState([]);
    const[percentageData,setPercentage] = useState(0);
    const [msg,setMessage] = useState("");
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
        // Update the parent component's state with the received data
        setChildData(user);
        navigate('/parents/attendance');
        
    if(cookies.jwt && user.role=="Parents"){
        try{
                const { data } = await axios.get('http://localhost:8000/parents/attendance',
                {
                    params:{
                        email:user.email,
                    },
                    withCredentials: true,
                }); 
                const { success, message, attendanceData, totper } = data;
            if(success){
                setAttData(attendanceData);
                setPercentage(totper);
                console.log(totper);
                setMessage(message);
                navigate('/parents/attendance');
            }
            else{
                setMessage(message);
                navigate('/parents');
            }

        }catch(error){
            console.log(error.message);
            navigate('/parents');
            } 
        }
    }

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div className='flexlayout'>
    <ParentsList className='adprof'/>
    {attData.length>0?(
    <table class="paraattdata">
      <thead>
        <tr>
          <th>Month</th>
          <th>Number of Classes taken</th>
          <th>Number of Classes Attended</th>
          <th>Holiday(if any)</th>
          <th>Percentage (%)</th>
        </tr>
      </thead>
      <tbody>
        {attData.map((item) => (
          <tr key={item._id}>
            <td>{item.month}</td>
            <td>{item.total}</td>
            <td>{item.present}</td>
            <td>{item.holiday}</td>
            <td>{item.percentage}</td>
          </tr>
        ))}
        <tr><td colSpan="5">Total Attendance Percentage = <b>{percentageData} %</b></td></tr>
      </tbody>
    </table>):<div className='message'>No Attendance Data Found</div>}</div>
    <div class="message">{ msg }</div>
    <Footer />
    </>
  );
}

export default ViewAttendance;
