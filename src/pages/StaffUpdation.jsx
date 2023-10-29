import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

function StaffUpdation() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const { id } = useParams();
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
  const [ formData, setFormData ] = useState({
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
  });

  const handleChange = (e) => {
    //console.log(formData);
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const editData = async(e) => {
    
    try{
        let { data } = await axios.put(`https://hvs-backend.onrender.com/admin/editStaff/${id}`,{
            ...formData,
        },{withCredentials:true});
        const { success, message, ModifiedData, teach } = data;
        console.log(teach);
        setFormData(teach);
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
     const token = sessionStorage.getItem('jwt');
    // Update the parent component's state with the received data
    setChildData(user);
    if(token && user.role=="Admin"){
        navigate(`/admin/editStaff/${ id }`);
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
    <form className="addstu" onSubmit={handleSubmit}>
      <h1>Modify Staff Data</h1>

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
      {/* <input
        type="string"
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        autoComplete="off"
      /> */}

      <select value={formData.gender} onChange={handleChange} className="custom-select" id="stuclass">
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

export default StaffUpdation;
