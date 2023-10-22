import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function ParentsRegistration() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const initialdata={
    first_name: '',
    last_name: '',
    student_id: '',
    email: '',
    mob_num: '',
    address: '',
  }
  const [ formData, setFormData ] = useState( {
  first_name: '',
  last_name: '',
  student_id:'',
  email: '',
  mob_num: '',
  address: '', });

   const validateForm = ()=>{
    if(formData.first_name.length<1){
      seterrorMessage("First Name length must be greater than or equal to 1");
      return false;
    }
    if(formData.last_name.length<1){
      seterrorMessage("Last Name length must be greater than or equal to 1");
      return false;
    }
    if(formData.student_id.length!=8){
      seterrorMessage("Student ID must have 8 characters");
      return false;
    }
    if(formData.email.length===0){
      seterrorMessage("Email should not be empty");
      return false;
    }
    if(formData.mob_num.length!=10){
      seterrorMessage("Mobile Number should not be empty");
      return false;
    }
    if(formData.address.length===0){
      seterrorMessage("Address should not be empty");
      return false;
    }
    return true;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(validateForm()){
    e.preventDefault();
    // Handle form submission here, you can access the form data in 'formData'
    try{
        let { data } = await axios.post("http://localhost:8000/admin/addParents",
    {
        ...formData,
    },{withCredentials:true});
    const { success, message} = data;
    if(success){
        alert(message);
        setFormData(initialdata);
    }else{
        console.log(message);
        seterrorMessage(message);
    }   
    }
    catch(error){
        if(error.response.status==404){
            console.log("error resource not found");
        }
        seterrorMessage(error.message);
        console.log(error);
        return;
    }
  }
  };

  const [user, setChildData] = useState('');
  const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    if(cookies.jwt && user.role=="Admin"){
        navigate("/admin/addParents");
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
    <AdminList class="adprof"/>
    <form className="addstu" onSubmit={handleSubmit} action="/admin/addParents">
      <h1>Parents Registration</h1>

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

      <label htmlFor="dob">Student ID</label>
      <input
        type="string"
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

export default ParentsRegistration;
