import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';

function ViewStudent() {
    const [studentData, setStudentData] = useState([]);
    const [msg,setMessage] = useState("");
    const [user, setChildData] = useState('');
    //const history = useHistory();
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
         const token = sessionStorage.getItem('jwt');
        // Update the parent component's state with the received data
        setChildData(user);
        navigate('/admin/viewStudent');
        
    if(token && user.role=="Admin"){
        try{
                const { data } = await axios.get('https://hvs-backend.onrender.com/admin/viewStudent',
                {
                    withCredentials: true,
                }); 
                const { success, message, stuData } = data;
            if(success){
                setStudentData(stuData);
                setMessage(message);
                navigate('/admin/viewStudent');
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
    //const link = getElementById("edit");
    function handleEdit( item ){
      //e.preventDefault();
      let id = item.roll_no;
      navigate(`/admin/editStudent/${ id }`);
    };

    const handleDelete = async( item )=>{
      //e.preventDefault();
      if(window.confirm('Are you sure you want to delete Student '+item.first_name+' ?')){
      let id = item.roll_no;
      try{
        const { data } = await axios.delete(`https://hvs-backend.onrender.com/admin/deleteStudent/${id}`,
        {
            withCredentials: true,
        }); 
        const { success, message, delData } = data;

        if(success){
         alert(message+' '+'with ID :'+' '+delData.roll_no);
         //navigate('/admin/viewStudnet');
        }

      }catch(error){
        setMessage(error.message);
        //navigate('/admin/viewStudent');
      }
    }
    }

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div class="flexlayout">
    <AdminList class="adprof"/>
    <div class="view_stu">
    {studentData.length>0?(
    <table>
      <thead>
        <tr>
          <th>Roll Number</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Father Name</th>
          <th>Mother Name</th>
          <th>Date of Birth</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Admission Year</th>
          <th>Class</th>
          <th>Section</th>
          <th>Class Teacher</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Attendance(%)</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((item) => (
          <tr key={item._id}>
            <td>{item.roll_no}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.father_name}</td>
            <td>{item.mother_name}</td>
            <td>{item.dob}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.admission_year}</td>
            <td>{item.class_std}</td>
            <td>{item.section}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.mob_num}</td>
            <td>{item.address}</td>
            {item.percentage!=null ?
            <td>{item.percentage}</td> : 
            <td> - </td>}
            <td><a href="" onClick={()=>handleEdit(item)} ><FontAwesomeIcon icon={faEdit} className="edit-icon"/></a></td>
            <td><a href="" onClick={()=>handleDelete(item)}><FontAwesomeIcon icon={faTrash} /></a></td>
          </tr>
        ))}
      </tbody>
    </table>):<div class="message">No Student Data Found</div>}</div>
    </div>
    <div class="message">{ msg }</div>
    <Footer />
    </>
  );
}

export default ViewStudent;
