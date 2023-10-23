import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

function ParentsUpdation() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const { id } = useParams();
  const initialdata={
    first_name: '',
    last_name: '',
    student_id: '',
    email: '',
    mob_num: '',
    address: '',
  }
  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    student_id: '',
    email: '',
    mob_num: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const editData = async(e) => {
    try{
        let { data } = await axios.put(`https://hvs-backend.onrender.com/admin/editParents/${id}`,{
            ...formData,
        },{withCredentials:true});
        const { success, message, ModifiedData, pare } = data;
        console.log(pare);
        setFormData(pare);
        if(success){
            seterrorMessage(message);
            setFormData(initialdata);
        }else{
            seterrorMessage(message);
        }   
    }catch(error){
        seterrorMessage(error.message);
        console.log(error);
        return;
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    editData();
  }
  const [user, setChildData] = useState('');
  const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    if(cookies.jwt && user.role=="Admin"){
        navigate(`/admin/editParents/${ id }`);
        editData();
      }else{
        navigate("/login");
      }
  };

  // Get all number input fields
  const numberInputs = document.querySelectorAll('input[type="number"]');

  // Prevent mouse wheel from changing number input fields
  numberInputs.forEach((input) => {
    input.addEventListener('wheel', (e) => {
      e.preventDefault();
    });
  });

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div className='flexlayout'>
    <AdminList className='adprof'/>
    <form className="addstu" onSubmit={handleSubmit} >
      <h1>Modify Student Data</h1>

      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        id="last_name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="student_id">Student ID</label>
      <input
        type="text"
        id="student_id"
        name="student_id"
        value={formData.student_id}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="mob_num">Mobile</label>
      <input
        type="mob_num"
        id="mob_num"
        name="mob_num"
        value={formData.mob_num}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="address">Address</label>
      <input
        type="address"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        autoComplete="off"
      />

      <button type="submit">Submit</button>

      <div className="error" >{ errorMessage }</div>
    </form>
    </div>
    <Footer />
    </>
  );
}

export default ParentsUpdation;
