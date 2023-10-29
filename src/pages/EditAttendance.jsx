import React, { useState, useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import TeacherList from './shared/TeacherList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

function EditAttendance() {
    const [attData, setAttData] = useState([]);
    const [fetchedData, setfectchedData] = useState([]);
    const [msg,setMessage] = useState("");
    const [status,setStatus] = useState("");
    const [isChecked,setChecked] = useState(false);
    const [user, setChildData] = useState('');
    const { selectedClass } = useParams();
    const { selectedDate } = useParams();
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
         const token = sessionStorage.getItem('jwt');
        // Update the parent component's state with the received data
        setChildData(user);
        if(token && user.role=="Teacher"){
          // console.log(selectedClass,selectedDate);
          navigate(`/teacher/editAttendance/${selectedClass}/${selectedDate}`);
          handleSubmit();
        }else{
          navigate('/login');
        }
        
    }
    
    const handleSubmit = async()=>{
      console.log(attData);
        try{
            const { data } = await axios.put(`https://hvs-backend.onrender.com/teacher/editAttendance/${selectedClass}/${selectedDate}`,{
                ...attData,
            });
            const {success, message, att, flag} = data;
            if(success){
              setMessage(message);
              if(flag)
              navigate('/teacher/viewAttendance');
            }
            setfectchedData(att);
            //setStatus(att.status);
            //console.log(att);
        }catch(error){
            setMessage(error.message);
        }
    }
    const handleStatuschange = (item,status) => {
        const student_id = item.student_id;
        const updatedAttendance = [...attData];
        const existingAttendance = updatedAttendance.find((item) => item.student_id === student_id);

        if (existingAttendance) {
        existingAttendance.status = status;
        } else {
        updatedAttendance.push({ student_id, status });
        }
        
        const data = fetchedData.find((item)=>item.student_id===student_id);
        if(data){
          data.status=status;
        }
        setAttData(updatedAttendance);
        //setAttendanceData(data);

       //console.log(attData);
    }

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div >
    <TeacherList className='adprof'/>
    {/* <div className="flexlayout">
      <form className='box'>
      <input type="checkbox" checked={isChecked} class="checkbx"/>
        <label class="holi">Holiday</label>
      </form>
      </div> */}
      {fetchedData?.length>0 ?(
        <>
      <table class="editatt">
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Marked By</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {fetchedData.map((item) => (
          <tr key={item._id}>
            <td>{item.student_id}</td>
            <td>{item.name}</td>
            <td>{item.marked_by}</td>
            <td>
                <select value={item.status} onChange={(e)=>{const updatedStatus = e.target.value;handleStatuschange(item,updatedStatus)}} className="custom-select">
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Holiday">Holiday</option>
                    {/* Add more options as needed */}
                </select>
                </td>
        </tr>
        ))}
      </tbody>
    </table>
    <button type='submit' onClick={handleSubmit} class="teachbtn">Submit</button></>
    ):<div>No Attendance Data on {selectedDate} for {selectedClass}</div>}</div>
    <div className='editmsg'>{ msg }</div>    
    <Footer />
    </>
  );
}

export default EditAttendance;
