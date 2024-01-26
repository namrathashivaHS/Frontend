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

function ViewParents() {
    const [parentsData, setParentsData] = useState([]);
    const [msg,setMessage] = useState("");
    const [user, setChildData] = useState('');
    //const history = useHistory();
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
        // Update the parent component's state with the received data
        setChildData(user);
        navigate('/admin/viewParents');
         const token = sessionStorage.getItem('jwt');
    if(token && user.role=="Admin"){
        try{
                const { data } = await axios.get('https://hvs-backend.onrender.com/admin/viewParents',
                {
                    withCredentials: true,
                }); 
                const { success, message, pareData } = data;
            if(success){
                setParentsData(pareData);
                setMessage(message);
                navigate('/admin/viewParents');
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
      let id = item._id;
      navigate(`/admin/editParents/${ id }`);
    };

    const handleDelete = async( item, e )=>{
      e.preventDefault();
      if(window.confirm('Are you sure you want to delete Parents '+item.first_name+' '+item.last_name+' ?')){
      let id = item._id;
      try{
        const { data } = await axios.delete(`https://hvs-backend.onrender.com/admin/deleteParents/${id}`,
        {
            withCredentials: true,
        }); 
        const { success, message, delData } = data;

        if(success){
         alert(message+' '+delData.first_name+' '+delData.last_name);
         navigate('/admin/viewParents');
         window.location.reload();
        }

      }catch(error){
        setMessage(error.message);
        navigate('/admin/viewParents');
      }
    }
    }

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div className='flexlayout'>
    <AdminList class="adprof"/>
    <div class="view_stu">
    {parentsData.length>0?(
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {parentsData.map((item) => (
          <tr key={item._id}>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.student_id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.mob_num}</td>
            <td>{item.address}</td>
            <td><a href="" onClick={()=>handleEdit(item)}><FontAwesomeIcon icon={faEdit} /></a></td>
            <td><a href="" onClick={(e)=>handleDelete(item)}><FontAwesomeIcon icon={faTrash} /></a></td>
          </tr>
        ))}
      </tbody>
    </table>):<div>No Parents Data Found</div>}</div></div>
    <div  class="message">{ msg }</div>
    <Footer />
    </>
  );
}

export default ViewParents;
