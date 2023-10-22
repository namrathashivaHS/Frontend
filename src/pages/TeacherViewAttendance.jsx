import React, { useState, useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import TeacherList from './shared/TeacherList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';

function TeacherViewAttendance() {
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
        navigate('/teacher/viewAttendance');
        fetchAttendance();
    }
    const fetchAttendance=async()=>{
    if(cookies.jwt && user.role=="Teacher"){
        try{
                const { data } = await axios.get('http://localhost:8000/teacher/viewAttendance',
                {
                    params:{
                        cls:selectedClass,
                        date:selectedDate,
                    },
                    withCredentials: true,
                }); 
                const { success, message, attendanceData } = data;
            if(success){
              if(attendanceData.length>0){
                setAttData(attendanceData);
                setMessage(message);
                navigate('/teacher/viewAttendance');
              }
            }
            else{
                setMessage(message);
                navigate('/teacher');
            }

        }catch(error){
            console.log(error.message);
            navigate('/teacher');
            } 
        }
    }

    const handleEdit=(e)=>{
      e.preventDefault();
      if(selectedClass && selectedDate){
        //console.log(selectedClass,selectedDate,"good");
        navigate(`/teacher/editAttendance/${selectedClass}/${selectedDate}`);
      }else{
        setMessage("Please select class and date to Edit Attendance Data");
      }
    };

    const handleDelete = async(e)=>{
      e.preventDefault();
      console.log(selectedClass,selectedDate,"good");
      if(!selectedClass && !selectedDate){
        setMessage("Please select Class and Date");
        navigate('/teacher/viewAttendance');
      }else{
        if(window.confirm(`Are you sure you want to delete attendance on ${selectedDate} of ${selectedClass} class ?`)){
          try{
            const { data } = await axios.delete(`http://localhost:8000/teacher/deleteAttendance/${selectedClass}/${selectedDate}`,
            {
                withCredentials: true,
            }); 
            const { success, message, delData } = data;
    
            if(success){
             alert(message);
             setAttData([]);
             setSelectedClass('');
             setSelectedDate('');
             navigate('/teacher/viewAttendance');
            }
    
          }catch(error){
            setMessage(error.message);
            navigate('/teacher/viewAttendance');
          }
        }
      }
    }

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        setAttData([]);
      };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setMessage("");
    };

    useEffect(() => {
        if (selectedClass &&  selectedDate) {
          fetchAttendance();
          setMessage("");
        }else{
          setMessage("Please selecte Class and Date");
        }
    }, [selectedClass,selectedDate]); 

    

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div >
    <TeacherList className='adprof'/>
    <div className='flexlayout'>
      <form className="attform">
        <label>Select Class:</label>
        <select value={selectedClass} onChange={handleClassChange} className="custom-select">
          <option value="">Select a Class</option>
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
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
        <label>Select Date:</label>
        <input className="date" type="date" value={selectedDate} onChange={handleDateChange} />
        <a href="" onClick={(e)=>handleEdit(e)}><FontAwesomeIcon icon={faEdit} className='icon'/></a>
        <a href="" onClick={(e)=>handleDelete(e)}><FontAwesomeIcon icon={faTrash} className='icon'/></a>
      </form>
      </div>
    {attData.length>0?(
    <div class="teachatt">
    <table class="attdata">
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
          </tr>
        ))}
      </tbody>
    </table></div>):(<div class="nostulist">No Attendance Data on {selectedDate} for {selectedClass}</div>)}</div>
    <div class="msg">{ msg }</div>
    <Footer />
    </>
  );
}

export default TeacherViewAttendance;
