import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import TeacherList from './shared/TeacherList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function AddProgressReport() {
  const [ errorMessage, seterrorMessage ] = useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const [email,setEmail] = useState("");
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
    student_id:'',
    feedback:'',
    class_teacher_id:''
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
    student_id:'',
    feedback:'',
    class_teacher_id:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateform = () =>{
    if(formData.kannada>=100 || formData.kannada<0){
      seterrorMessage("Marks for Kannada should be in 0-100 range");
      return false;
    }
    if(formData.english>=100 || formData.english<0){
      seterrorMessage("Marks for English should be in 0-100 range");
      return false;
    }
    if(formData.hindi>=100 || formData.hindi<0){
      seterrorMessage("Marks for Hindi should be in 0-100 range");
      return false;
    }
    if(formData.maths>=100 || formData.maths<0){
      seterrorMessage("Marks for Maths should be in 0-100 range");
      return false;
    }
    if(formData.science>=100 || formData.science<0){
      seterrorMessage("Marks for Science should be in 0-100 range");
      return false;
    }
    if(formData.social>=100 || formData.social<0){
      seterrorMessage("Marks for Social should be in 0-100 range");
      return false;
    }
    if(formData.physical_education>=100 || formData.physical_education<0){
      seterrorMessage("Marks for Physical Education should be in 0-100 range");
      return false;
    }
    if(formData.drawing.length===0){
      seterrorMessage("Grade for Drawing should not be empty");
      return false;
    }
    if(formData.computer_science>=100 || formData.computer_science<0){
      seterrorMessage("Marks for Computer Science should be in 0-100 range");
      return false;
    }
    if(formData.moral_science.length===0){
      seterrorMessage("Marks for Moral Science should should not be empty");
      return false;
    }
    let test = ["FA1","FA2","SA1","FA3","FA4","SA2"];
    if(!(test.includes(formData.test_type))){
      seterrorMessage("Enter the valid test type");
      return false;
    }
    if(formData.student_id.length!=8){
      seterrorMessage("Student Id length should have 8 characters long");
      return false;
    }
    if(formData.class_teacher_id.length!=5){
      seterrorMessage("Employee ID should have 5 characters long");
      return false;
    }
    return true;
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(validateform());
    if(validateform()){
    try{
        let { data } = await axios.post("https://hvs-backend.onrender.com/teacher/progressReport",
        {
            ...formData,
            email
        },{withCredentials:true});
        const { success, message} = data;
        if(success){
            alert(message);
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
  };

  const [user, setChildData] = useState('');
  const receiveDataFromChild = (user) => {
     const token = sessionStorage.getItem('jwt');
    // Update the parent component's state with the received data
    setChildData(user);
    if(token && user.role=="Teacher"){
        navigate("/teacher/progressReport");
        setEmail(user.email);
      }else{
        navigate("/login");
      }
  };

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
    <div>
    <TeacherList className="adprof"/>
    <form onSubmit={handleSubmit} class="pro">
      <h1>Progress Report Creation</h1>

      <label htmlFor="kannada">Kannada</label>
      <input
        type="number"
        id="kannada"
        name="kannada"
        value={formData.kannada}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <label htmlFor="english">English</label>
      <input
        type="number"
        id="english"
        name="english"
        value={formData.english}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="hindi">Hindi</label>
      <input
        type="number"
        id="hindi"
        name="hindi"
        value={formData.hindi}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="maths">Maths</label>
      <input
        type="number"
        id="maths"
        name="maths"
        value={formData.maths}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="science">Science</label>
      <input
        type="number"
        id="science"
        name="science"
        value={formData.science}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="social">Social</label>
      <input
        type="number"
        id="social"
        name="social"
        value={formData.social}
        onChange={handleChange}
        autoComplete="off"
      />
      
      <label htmlFor="physical_education">Physical Education</label>
      <input
        type="number"
        id="physical_education"
        name="physical_education"
        value={formData.physical_education}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="drawing">Drawing</label>
      <input
        type="string"
        id="drawing"
        name="drawing"
        value={formData.drawing}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="computer_science">Computer Science</label>
      <input
        type="number"
        id="computer_science"
        name="computer_science"
        value={formData.computer_science}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="moral_science">Moral Science</label>
      <input
        type="string"
        id="moral_science"
        name="moral_science"
        value={formData.moral_science}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="test_type">Test Type</label>
      <input
        type="text"
        id="test_type"
        name="test_type"
        value={formData.test_type}
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


      <label htmlFor="class_teacher_id">Employee ID</label>
      <input
        type="text"
        id="class_teacher_id"
        name="class_teacher_id"
        value={formData.class_teacher_id}
        onChange={handleChange}
        autoComplete="off"
      />

      <label htmlFor="feedback">Feedback</label>
      <textarea class="feedback" id="feedback" name="feedback" value={formData.feedback} rows="4" cols="50" onChange={handleChange}> </textarea>

      <button type="submit">Submit</button>
      <div className="error" >{ errorMessage }</div>
    </form>
    </div>
    <Footer />
    </>
  );
}

export default AddProgressReport;
