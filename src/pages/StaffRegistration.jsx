import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import validator from 'validator';

function StaffRegistration() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const initialdata={
    first_name: '',
    last_name: '',
    dob: '',
    age: '',
    gender: '',
    qualification: '',
    course: '',
    designation: '',
    email: '',
    mob_num: '',
    address: '',
  }
  const [ formData, setFormData ] = useState( {
  first_name: '',
  last_name: '',
  dob: '',
  age: '',
  gender: '',
  qualification: '',
  course: '',
  designation: '',
  email: '',
  mob_num: '',
  address: '', });
    const validateForm = ()=>{
    if(formData.first_name.length<1){
      seterrorMessage("First Name should not be empty");
      return false;
    }
    if(formData.last_name.length<1){
      seterrorMessage("Last Name should not be empty");
      return false;
    }
    if(!(validator.isDate(formData.dob))){
      seterrorMessage("Date of Birth format is not correct");
      return false;
    }
    if(formData.age.length===0){
      seterrorMessage("Age should not be empty");
      return false;
    }
    if(formData.gender.length===0){
      seterrorMessage("Gender should not be empty");
      return false;
    }
    if(formData.designation.length===0){
      seterrorMessage("Designation should not be empty");
      return false;
    }
    if(formData.email.length===0){
      seterrorMessage("Email should not be empty");
      return false;
    }
    if(formData.mob_num.length!=10){
      seterrorMessage("Mobile Number should have 10 digits");
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
    // Handle form submission here, you can access the form data in 'formData'
    if(validateForm()){
    try{
        let { data } = await axios.post("https://hvs-backend.onrender.com/admin/addStaff",
    {
        ...formData,
    },{withCredentials:true});
    const { success, message, employee_id} = data;
    console.log(data);
    if(message){
      console.log(message);
    }
    if(success){
        alert(message+' '+'with Employee Id'+' '+employee_id);
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
        navigate("/admin/addStaff");
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
    <form className="addstu" onSubmit={handleSubmit} action="/admin/addStaff">
      <h1>Staff Registration</h1>

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

      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <label htmlFor="gender">Gender</label>
      <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="custom-select id" >
          <option value=""></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

      <label htmlFor="qualificationn">Qulafication</label>
      <input
        type="string"
        id="qualification"
        name="qualification"
        value={formData.qualification}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="course">Course</label>
      <input
        type="string"
        id="course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="designation">Designation</label>
      <input
        type="string"
        id="designation"
        name="designation"
        value={formData.designation}
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

export default StaffRegistration;
