import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import AdminList from './shared/AdminList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function TimeTable() {
  const [Message, setMessage ] = useState('');
  const [error,setError]=useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const initialdata={
    class_std: '',
    Room: '',
    M1: '',M2: '',M3: '',M4: '',M5: '',M6: '',M7: '',M8: '',
    T1: '',T2: '',T3: '',T4: '',T5: '',T6: '',T7: '',T8: '',
    W1: '',W2: '',W3: '',W4: '',W5: '',W6: '',W7: '',W8: '',
    Th1: '',Th2: '',Th3: '',Th4: '',Th5: '',Th6: '',Th7: '',Th8: '',
    F1: '',F2: '',F3: '',F4: '',F5: '',F6: '',F7: '',F8: '',
    S1: '',S2: '',S3: '',S4: '',S5: '',
  }
  
  const [ formData, setFormData ] = useState(
   {
    class_std: '',
    Room: '',
    M1: '',M2: '',M3: '',M4: '',M5: '',M6: '',M7: '',M8: '',
    T1: '',T2: '',T3: '',T4: '',T5: '',T6: '',T7: '',T8: '',
    W1: '',W2: '',W3: '',W4: '',W5: '',W6: '',W7: '',W8: '',
    Th1: '',Th2: '',Th3: '',Th4: '',Th5: '',Th6: '',Th7: '',Th8: '',
    F1: '',F2: '',F3: '',F4: '',F5: '',F6: '',F7: '',F8: '',
    S1: '',S2: '',S3: '',S4: '',S5: '',
  }
  );
  const validateForm = () => {
    if(!formData.Room){
        setError("Please Enter the room numner");
        return false
      }
      const formDataValues = Object.values(formData);

      // Exclude the 'Room' field from validation
      const fieldsToValidate = formDataValues.filter((key) => key !== formData.Room);

      // Check if every field has at least 3 characters
      const isValid = fieldsToValidate.every((value) => value.length >= 3);

      return isValid;
  };
  

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(validateForm()){
    try{
       const { data } = await axios.post("https://hvs-backend.onrender.com/admin/addTimeTable",
       {
        ...formData,
       },{withCredentials:true});

       const { success, message } = data;
       if(success){
        console.log(data);
        setFormData(initialdata);
       }
       setMessage(message);
    }catch(error){
        setError(error.message);
        console.log(error.message);
        return;
    }
  }else{
    setError("Please enter the values in the form of Subject/Teacher and Room Number");
  }
  };

  const [user, setChildData] = useState('');
  const receiveDataFromChild = (user) => {
     const token = sessionStorage.getItem('jwt');
    // Update the parent component's state with the received data
    setChildData(user);
    if(token && user.role=="Admin"){
        navigate("/admin/addTimeTable");
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
    <form className="time" onSubmit={handleSubmit}>
      <h3>Time table of <select value={formData.class_std} onChange={handleChange} id="class_std" name="class_std" 
      className="custom-select">
          <option value="">Select a Class</option>
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
        </select></h3>
        
        <h3 class="roomlabel">Room Number alloted : <input type="number" id="Room" name="Room"  value={formData.Room}
                    onChange={handleChange} autoComplete="off" class="roominp"/></h3>
        <h5>Enter the values in the form of Subject/Teacher</h5>
        <table class="timetable">
            <thead>
                <tr>
                <th></th>
                    <th>10:00 am - 10:40 am</th>
            
                    <th>10:40 am - 11:20 am</th>
                
                    <th>11:20 am - 12:00 pm</th>
            
                    <th>12:00 pm - 12:40 pm</th>
                
                    <th>12:40 pm - 01:20 pm</th>
                
                    <th>01:20 pm - 02:20 pm</th>
            
                    <th>02:20 pm - 03:00 pm</th>
                
                    <th>03:00 pm - 03:40 pm</th>
            
                    <th>03:40 pm - 04:20 pm</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Monday</th>
                    <td><input type="text" id="M1" name="M1" value={formData.M1}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="M2" name="M2" value={formData.M2}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="M3" name="M3" value={formData.M3}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="M4" name="M4" value={formData.M4}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="M5" name="M5" value={formData.M5}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td rowSpan={5}>LUNCH</td>
                    <td><input type="text" id="M6" name="M6" value={formData.M6}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="M7" name="M7" value={formData.M7}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="M8" name="M8" value={formData.M8}
                    onChange={handleChange} autoComplete="off"/></td>
                </tr>
                <tr>
                    <th>Tuesday</th>
                    <td><input type="text" id="T1" name="T1" value={formData.T1}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="T2" name="T2" value={formData.T2}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="T3" name="T3" value={formData.T3}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="T4" name="T4" value={formData.T4}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="T5" name="T5" value={formData.T5}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="T6" name="T6" value={formData.T6}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="T7" name="T7" value={formData.T7}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="T8" name="T8" value={formData.T8}
                    onChange={handleChange} autoComplete="off"/></td>
                </tr>
                <tr>
                    <th>Wednesday</th>
                    <td><input type="text" id="W1" name="W1" value={formData.W1}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="W2" name="W2" value={formData.W2}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="W3" name="W3" value={formData.W3}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="W4" name="W4" value={formData.W4}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="W5" name="W5" value={formData.W5}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="W6" name="W6" value={formData.W6}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="W7" name="W7" value={formData.W7}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="W8" name="W8" value={formData.W8}
                    onChange={handleChange} autoComplete="off"/></td>
                </tr>
                 <tr>
                    <th>Thursday</th>
                    <td><input type="text" id="Th1" name="Th1" value={formData.Th1}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="Th2" name="Th2" value={formData.Th2}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="Th3" name="Th3" value={formData.Th3}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="Th4" name="Th4" value={formData.Th4}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="Th5" name="Th5" value={formData.Th5}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="Th6" name="Th6" value={formData.Th6}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="Th7" name="Th7" value={formData.Th7}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="Th8" name="Th8" value={formData.Th8}
                    onChange={handleChange} autoComplete="off"/></td>
                </tr>
                 <tr>
                    <th>Friday</th>
                    <td><input type="text" id="F1" name="F1" value={formData.F1}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="F2" name="F2" value={formData.F2}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="F3" name="F3" value={formData.F3}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="F4" name="F4" value={formData.F4}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="F5" name="F5" value={formData.F5}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="F6" name="F6" value={formData.F6}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="F7" name="F7" value={formData.F7}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="F8" name="F8" value={formData.F8}
                    onChange={handleChange} autoComplete="off"/></td>
                </tr>
                 <tr>
                    <th>Saturday</th>
                    <td><input type="text" id="S1" name="S1" value={formData.S1}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="S2" name="S2" value={formData.S2}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="S3" name="S3" value={formData.S3}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="S4" name="S4" value={formData.S4}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td><input type="text" id="S5" name="S5" value={formData.S5}
                    onChange={handleChange} autoComplete="off"/></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </tbody>
        </table>
      <button type="submit">Submit</button>
      <div className="error" >{ error }</div>
      <div className="message m" >{ Message }</div>
    </form>
    </div>
    <Footer />
    </>
  );
}

export default TimeTable;
