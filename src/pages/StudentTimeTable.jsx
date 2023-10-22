import React, { useEffect, useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import StudentList from './shared/StudentList';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function StudentTimeTable() {
  const [Message, setMessage ] = useState('');
  const [error,setError]=useState('');
  const navigate=useNavigate();
  const [cookies,removeCookie] = useCookies([]);
  const [class_std,setClass] = useState('');
  const [ formData, setFormData ] = useState([]);
  const [flag,setFlag] = useState(false);
  const [user, setChildData] = useState('');
  const [Email,setEmail] = useState('');

  const handleChange = (e) => {
    setClass(e.target.value);
  };

  

  
  const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    if(cookies.jwt && (user.role=="Student")){
        
        navigate("/student/timeTable");
        const handleSubmit = async() => {
    //e.preventDefault();
    console.log(user.email);
    try{
       const { data } = await axios.get("http://localhost:8000/student/timeTable",
       {
        params:{
            email:user.email,
        }
       },{withCredentials:true});

       const { success, message, table } = data;
       if(success){
        setFormData(table);
        setFlag(true);
       }else{
        setFlag(false);
       }
       setMessage(message);
    }catch(error){
        setMessage(error.message);
        console.log(error.message);
        return;
    }
  };
  handleSubmit();
        
      }else{
        navigate("/login");
      }
  };

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div class="flexlayout fx">
    <StudentList class="adprof" />
      
        {
          flag ?(
        
        <>
        <h3 class="teacherh3 stu" >Time table of Class : {formData.class_std}</h3>
        <h3 class="viewRoomLabel">Room Number alloted : {formData.Room}</h3>
        <h5 class="note">The values are in the form of Subject/Teacher</h5>
        <div class="viewtable">
        <table >
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
                        <td>{formData.Monday[0] || '-'} </td>
                        <td>{formData.Monday[1] || '-'} </td>
                        <td>{formData.Monday[2] || '-'} </td>
                        <td>{formData.Monday[3] || '-'} </td>
                        <td>{formData.Monday[4] || '-'} </td>
                        <td rowSpan={5}>LUNCH</td>
                        <td>{formData.Monday[5] || '-'} </td>
                        <td>{formData.Monday[6] || '-'} </td>
                        <td>{formData.Monday[7] || '-'} </td>
                </tr>
                <tr>
                    <th>Tuesday</th> 
                        <td>{formData.Tuesday[0] || '-'} </td>
                        <td>{formData.Tuesday[1] || '-'} </td>
                        <td>{formData.Tuesday[2] || '-'} </td>
                        <td>{formData.Tuesday[3] || '-'} </td>
                        <td>{formData.Tuesday[4] || '-'} </td>
                        <td>{formData.Tuesday[5] || '-'} </td>
                        <td>{formData.Tuesday[6] || '-'} </td>
                        <td>{formData.Tuesday[7] || '-'} </td>
                </tr>
                <tr>
                    <th>Wednesday</th>
                        <td>{formData.Wednesday[0] || '-'} </td>
                        <td>{formData.Wednesday[1] || '-'} </td>
                        <td>{formData.Wednesday[2] || '-'} </td>
                        <td>{formData.Wednesday[3] || '-'} </td>
                        <td>{formData.Wednesday[4] || '-'} </td>
                        <td>{formData.Wednesday[5] || '-'} </td>
                        <td>{formData.Wednesday[6] || '-'} </td>
                        <td>{formData.Wednesday[7] || '-'} </td>
                </tr>
                 <tr>
                    <th>Thursday</th>
                        <td>{formData.Thursday[0] || '-'} </td>
                        <td>{formData.Thursday[1] || '-'} </td>
                        <td>{formData.Thursday[2] || '-'} </td>
                        <td>{formData.Thursday[3] || '-'} </td>
                        <td>{formData.Thursday[4] || '-'} </td>
                        <td>{formData.Thursday[5] || '-'} </td>
                        <td>{formData.Thursday[6] || '-'} </td>
                        <td>{formData.Thursday[7] || '-'} </td>
                </tr>
                 <tr>
                    <th>Friday</th>
                        <td>{formData.Friday[0] || '-'} </td>
                        <td>{formData.Friday[1] || '-'} </td>
                        <td>{formData.Friday[2] || '-'} </td>
                        <td>{formData.Friday[3] || '-'} </td>
                        <td>{formData.Friday[4] || '-'} </td>
                        <td>{formData.Friday[5] || '-'} </td>
                        <td>{formData.Friday[6] || '-'} </td>
                        <td>{formData.Friday[7] || '-'} </td>
                </tr>
                 <tr>
                    <th>Saturday</th>
                        <td>{formData.Saturday[0] || '-'} </td>
                        <td>{formData.Saturday[1] || '-'} </td>
                        <td>{formData.Saturday[2] || '-'} </td>
                        <td>{formData.Saturday[3] || '-'} </td>
                        <td>{formData.Saturday[4] || '-'} </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                </tr>
            </tbody>
        </table>
        </div>
        </>):<div></div>}
      <div  className="msg viewmsg">{ Message }</div>
      </div>
    <Footer/>
    </>
  );
}

export default StudentTimeTable;
