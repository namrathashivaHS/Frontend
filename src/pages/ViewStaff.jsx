import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function ViewStaff() {
    const [staffData, setStaffData] = useState([]);
    const [msg,setMessage] = useState("");
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
         const token = sessionStorage.getItem('jwt');
        // Update the parent component's state with the received data
        setChildData(user);
        navigate('/admin/viewStaff');
        
    if(token && user.role=="Admin"){
        try{
                const { data } = await axios.get('https://hvs-backend.onrender.com/admin/viewStaff',
                {
                    withCredentials: true,
                }); 
                const { success, message, staData } = data;
            if(success){
                setStaffData(staData);
                setMessage(message);
                navigate('/admin/viewStaff');
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

    function handleEdit( item ){
      //e.preventDefault();
      let id = item.emp_id;
      navigate(`/admin/editStaff/${ id }`);
    };

    const handleDelete = async( item, e )=>{
      e.preventDefault();
      if(window.confirm('Are you sure you want to delete Staff '+item.first_name+' ?')){
      let id = item.emp_id;
      try{
        const { data } = await axios.delete(`https://hvs-backend.onrender.com/admin/deleteStaff/${id}`,
        {
            withCredentials: true,
        }); 
        const { success, message, delData } = data;

        if(success){
         alert(message+' '+'with ID :'+' '+delData.emp_id);
         navigate('/admin/viewStaff');
         window.location.reload();
        }

      }catch(error){
        setMessage(error.message);
        navigate('/admin/viewStaff');
      }
    }
    }

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div className='flexlayout'>
    <AdminList class="adprof"/>
    <div class="view_stu">
    {staffData.length>0?(
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Qualification</th>
          <th>Course</th>
          <th>Designation</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {staffData.map((item) => (
          <tr key={item._id}>
            <td>{item.emp_id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.dob}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.qualification}</td>
            <td>{item.course}</td>
            <td>{item.designation}</td>
            <td>{item.email}</td>
            <td>{item.mob_num}</td>
            <td>{item.address}</td>
            <td><a href=""  onClick={()=>handleEdit(item)}><FontAwesomeIcon icon={faEdit} /></a></td>
            <td><a href="" onClick={(e)=>handleDelete(item,e)}><FontAwesomeIcon icon={faTrash} /></a></td>
          </tr>
        ))}
      </tbody>
    </table>):<div>No Staff Data Found</div>}</div></div>
    <div class="message">{ msg }</div>
    <Footer />
    </>
  );
}

export default ViewStaff;
