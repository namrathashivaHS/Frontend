import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import axios from 'axios';
import validator from "validator";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function StudentRegistration() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const [error,setError]=useState('');
  const [staffData,setStaffData] = useState([]);
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const initialdata={
    first_name: '',
    last_name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    age: '',
    gender: '',
    admission_year: '',
    class_std: '',
    section: '',
    class_teacher_id: '',
    email: '',
    mob_num: '',
    address: '',
  }
  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    age: '',
    gender: '',
    admission_year: '',
    class_std: '',
    section: '',
    class_teacher_id: '',
    email: '',
    mob_num: '',
    address: '',
  });

  const validateForm = ()=>{
    if(formData.first_name.length<1){
      seterrorMessage("First Name length must be greater than or equal to 1");
      return false;
    }
    if(formData.last_name.length<1){
      seterrorMessage("Last Name length must be greater than or equal to 1");
      return false;
    }
    if(formData.father_name.length===0){
      seterrorMessage("Father Name should not be empty");
      return false;
    }
    if(formData.mother_name.length===0){
      seterrorMessage("Mother Name should not be empty");
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
    if(formData.gender!=="Male" && formData.gender!=="Female"){
      seterrorMessage("Gender values is not correct");
      return false;
    }
    if(formData.admission_year.length===0){
      seterrorMessage("Admission Year should not be empty");
      return false;
    }
    if(formData.class_std.length===0){
      seterrorMessage("Class should not be empty");
      return false;
    }
    if(formData.section.length===0){
      seterrorMessage("Section should not be empty");
      return false;
    }
    if(formData.class_teacher_id.length===0){
      seterrorMessage(" Class Teacher ID should not be empty");
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
    console.log(formData);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(validateForm()){
    try{
        let { data } = await axios.post("https://hvs-backend.onrender.com/admin/addStudent",{
            ...formData,
        },{withCredentials:true});
        const { success, message, num} = data;
        if(success){
            alert(message+' '+'with Roll Number'+' '+num);
            setFormData(initialdata);
        }else{
            seterrorMessage(message);
        }   
    }catch(error){
        seterrorMessage(error.message);
        console.log(error.message);
        return;
    }
    }
  };

  const [user, setChildData] = useState('');
  const receiveDataFromChild = async(user) => {
     const token = sessionStorage.getItem('jwt');
    // Update the parent component's state with the received data
    setChildData(user);
    if(token && user.role=="Admin"){
       navigate("/admin/addStudent");
       try{
                const { data } = await axios.get('http://localhost:8000/admin/viewStaff',
                {
                    withCredentials: true,
                }); 
                const { success, message, staData } = data;
            if(success){
                setStaffData(staData);
            }
            else{
                navigate('/admin/addStudent');
            }

        }catch(error){
            console.log(error.message);
            navigate('/admin');
            } 
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
    <div class="flexlayout">
    <AdminList class="adprof"/>
    <form className="addstu" onSubmit={handleSubmit}>
      <h1>Student Registration</h1>

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

      <label htmlFor="father_name">Father Name</label>
      <input
        type="text"
        id="father_name"
        name="father_name"
        value={formData.father_name}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="mother_name">Mother Name</label>
      <input
        type="text"
        id="mother_name"
        name="mother_name"
        value={formData.mother_name}
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
      <select name="gender" value={formData.gender} onChange={handleChange} className="custom-select" id="stuclass">
          <option value=""></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

      <label htmlFor="admission_year">Admission Year</label>
      <input
        type="number"
        id="admission_year"
        name="admission_year"
        value={formData.admission_year}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="class_std">Class</label>
      <select name="class_std" value={formData.class_std} onChange={handleChange} className="custom-select" id="stuclass">
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

      <label htmlFor="section">Section</label>
      <input
        type="string"
        id="section"
        name="section"
        value={formData.section}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <label htmlFor="class_teacher_id">Class Teacher ID</label>
       <select name="class_teacher_id" value={formData.class_teacher_id} onChange={handleChange} className="custom-select" id="stuclass">
          <option value=""></option>
          {staffData.map((item) => (
            <option value={item.emp_id}>{item.emp_id}-{item.first_name} {item.last_name}</option>
          ))}
        </select>

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

export default StudentRegistration;
