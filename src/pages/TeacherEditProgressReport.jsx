import React, { useState, useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import TeacherList from './shared/TeacherList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

function TeacherEditProgressReport() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const navigate=useNavigate();
  const {studentid} = useParams();
  const {test_type} = useParams();
  const [cookies,removeCookie] = useCookies([]);
  const [Email,setEmail] = useState("");
  const initialdata={
    kannada:'',
    english:'',
    hindi:'',
    maths:'',
    science:'',
    social:'',
    physical_education:'',
    drawing:'',
    computer_science:'',
    moral_science:'',
    test_type:'',
    feedback:'',
  }
  const [ formData, setFormData ] = useState({
    kannada:'',
    english:'',
    hindi:'',
    maths:'',
    science:'',
    social:'',
    physical_education:'',
    drawing:'',
    computer_science:'',
    moral_science:'',
    test_type:'',
    feedback:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const [user, setChildData] = useState('');
  const receiveDataFromChild = async(user) => {
     const token = sessionStorage.getItem('jwt');
    // Update the parent component's state with the received data
    setChildData(user);
    if(token && user.role=="Teacher"){
        navigate(`/teacher/editProgressReport/${studentid}/${test_type}`);
        editData(user);
      }   else{
        navigate("/login");
      }
  }
    const editData=async(user)=>{
    try{
        let { data } = await axios.put(`https://hvs-backend.onrender.com/teacher/editProgressReport/${studentid}/${test_type}`,
        {
            ...formData,
            email:user.email
        },{withCredentials:true});
        const { success, message, prodata} = data;
        console.log(prodata);
        setFormData(prodata);
        if(message==`You are not the Class teacher of Student ${studentid} Please check the Student ID`){
          alert(message);
          navigate('/teacher/viewProgressReport');
        }
        if(message=="No data found"){
          alert(message);
          navigate('/teacher/viewprogressReport');
        }
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
    
  }

  useEffect(() => {
    if (user.email) {
      setEmail(user.email);
      editData();
    }
  }, [user]);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    editData(user);
  }

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <TeacherList />
    <form className="addstu pr" onSubmit={handleSubmit} >
      <h1>Progress Report Edition</h1>

      <label htmlFor="kannada">Kannada</label>
      <input
        type="number"
        id="kannada"
        name="kannada"
        value={formData?.kannada}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <label htmlFor="english">English</label>
      <input
        type="number"
        id="english"
        name="english"
        value={formData?.english}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="hindi">Hindi</label>
      <input
        type="number"
        id="hindi"
        name="hindi"
        value={formData?.hindi}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="maths">Maths</label>
      <input
        type="number"
        id="maths"
        name="maths"
        value={formData?.maths}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="science">Science</label>
      <input
        type="number"
        id="science"
        name="science"
        value={formData?.science}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="social">Social</label>
      <input
        type="number"
        id="social"
        name="social"
        value={formData?.social}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <label htmlFor="physical_education">Physical Education</label>
      <input
        type="number"
        id="physical_education"
        name="physical_education"
        value={formData?.physical_education}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="drawing">Drawing</label>
      <input
        type="string"
        id="drawing"
        name="drawing"
        value={formData?.drawing}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="computer_science">Computer Science</label>
      <input
        type="number"
        id="computer_science"
        name="computer_science"
        value={formData?.computer_science}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="moral_science">Moral Science</label>
      <input
        type="string"
        id="moral_science"
        name="moral_science"
        value={formData?.moral_science}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="test_type">Test Type</label>
      <input
        type="text"
        id="test_type"
        name="test_type"
        value={formData?.test_type}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="feedback">Feedback</label>
      <textarea class="feedback" id="feedback" name="feedback" value={formData?.feedback} rows="4" cols="50" onChange={handleChange}> </textarea>

      <button type="submit">Submit</button>
      
    </form>
    <div className="error prmsg" >{ errorMessage }</div>
    <Footer />
    </>
  );
}

export default TeacherEditProgressReport;
