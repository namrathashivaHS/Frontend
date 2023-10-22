import React, { useState, useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';

function ViewAdminAttendance() {
    const [attData, setAttData] = useState([]);
    const [attendancedata, setAttendanceData] = useState([]);
    const [msg,setMessage] = useState("");
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isChecked,setChecked] = useState(false);
    const [user, setChildData] = useState('');
    //const history = useHistory();
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
        // Update the parent component's state with the received data
        setChildData(user);
        navigate('/admin/viewAttendance');
    }
    const fetchAttendance=async()=>{
    if(cookies.jwt && user.role=="Admin"){
        try{
                const { data } = await axios.get('http://localhost:8000/admin/viewAttendance',
                {
                    params:{
                        cls:selectedClass,
                        date:selectedDate,
                    },
                    withCredentials: true,
                }); 
                const { success, message, attendanceData } = data;
            if(success){
                setAttData(attendanceData);
                setMessage(message);
                navigate('/admin/viewAttendance');
            }
            else{
                setMessage(message);
                navigate('/admin');
            }

        }catch(error){
            console.log(error.message);
            navigate('/admin');
            } 
        }
    }

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
      };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setMessage("");
    };

    useEffect(() => {
        if (selectedClass && selectedDate) {
          fetchAttendance();
          setMessage("");
        }
    }, [selectedClass,selectedDate]); 

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div className='flexlayout'>
    <AdminList class="adprof"/>
    <div class="att">
      <form >
        <label>Select Class:</label>
        <select value={selectedClass} onChange={handleClassChange} className="custom-select">
          <option value=""></option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
        <label>Select Date:</label>
        <input className="date" type="date" value={selectedDate} onChange={handleDateChange} />
      </form>
      </div>
    {attData.length>0?(
    <table class="atttab">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Marked By</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {attData.map((item) => (
          <tr key={item._id}>
            <td>{item.student_id}</td>
            <td>{item.name}</td>
            <td>{item.marked_by}</td>
            <td>{item.status}</td>
            {/* <td><a href="" onClick={()=>handleDelete(item)}><FontAwesomeIcon icon={faTrash} /></a></td> */}
          </tr>
        ))}
      </tbody>
    </table>):<div class="nodata">No Attendance Data on {selectedDate}</div>}</div>
    <div class="message attmsg">{ msg }</div>
    <Footer />
    </>
  );
}

export default ViewAdminAttendance;
