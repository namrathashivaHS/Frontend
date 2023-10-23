import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

function StudentUpdation() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const { id } = useParams();
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

  const handleChange = async(e) => {
    
    const { name, value } = e.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const editData = async(e) => {
    try{
      console.log(formData);
        let { data } = await axios.put(`https://hvs-backend.onrender.com/admin/editStudent/${id}`,{
            ...formData,
        },{withCredentials:true});
        const { success, message, ModifiedData, stu } = data;
        setFormData(stu);
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
        navigate(`/admin/editStudent/${ id }`);
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
    <div className="flexlayout">
    <AdminList className="adprof"/>
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
      {/* <input
        type="number"
        id="class_std"
        name="class_std"
        value={formData.class_std}
        onChange={handleChange}
        autoComplete="off"
      /> */}

      <select value={formData.class_std} onChange={handleChange} className="custom-select" id="stuclass">
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
      <input
        type="text"
        id="class_teacher_id"
        name="class_teacher_id"
        value={formData.class_teacher_id}
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
        type="tel"
        id="mob_num"
        name="mob_num"
        value={formData.mob_num}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
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

export default StudentUpdation;
