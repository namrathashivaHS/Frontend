import React, { useEffect, useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import TeacherList from './shared/TeacherList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';

function TeacherViewProgressReport() {
    const [studentid, setStudentId] = useState("");
    const [test_type,setTestType] = useState("");
    const [progressData, setProgressdata] = useState([]);
    const [click,setclick] = useState(false);
    const [delclick,setdelclick] = useState(false);
    const [msg,setMessage] = useState("");
    const [user, setChildData] = useState('');
    const [FA1,setFA1] = useState ([]);
    const [FA2,setFA2] = useState ([]);
    const [SA1,setSA1] = useState ([]);
    const [FA3,setFA3] = useState ([]);
    const [FA4,setFA4] = useState ([]);
    const [SA2,setSA2] = useState ([]); 
    //const history = useHistory();
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
         const token = sessionStorage.getItem('jwt');
        // Update the parent component's state with the received data
    if(token && user.role=="Teacher"){
        setChildData(user);
        navigate('/teacher/viewProgressReport');

        }else{
            navigate('/teacher');
        }
    }

    const fetchData = async()=>{
        try{
            const { data } = await axios.get('https://hvs-backend.onrender.com/teacher/viewProgressReport',
            {
                params:{
                    studentid
                },
                withCredentials: true,
            }); 
            const { success, message, proData } = data;
            if(message=="No Data found"){
              setclick(false);
              setdelclick(false);
            }
        if(success){
            setProgressdata(proData);
            //console.log(progressData);
            setMessage(message);
            
            for(const item of progressData){
                if(item.test_type=="FA1"){
                    setFA1(item);
                }else if(item.test_type=="FA2"){
                    setFA2(item);
                }else if(item.test_type=="SA1"){
                    setSA1(item);
                }else if(item.test_type=="FA3"){
                    setFA3(item);
                }else if(item.test_type=="FA4"){
                    setFA4(item);
                }else if(item.test_type=="SA2"){
                    setSA2(item);
                }
            }
            navigate('/teacher/viewProgressReport');
        }
        else{
            setMessage(data.message);
            navigate('/teacher/viewProgressReport');
        }

    }catch(error){
        console.log(error.message);
        navigate('/teacher');
        } 
    }
    //const link = getElementById("edit");
    function handleEdit(e){
        e.preventDefault();
        setclick(!click);
        setdelclick(click);
    };

    const handleDelete = async(e)=>{
      e.preventDefault();
      setdelclick(!delclick);
      setclick(delclick);
    }

    const handleChange = (e) => {
        setStudentId(e.target.value)
      };

    const handletest_type = (e) => {
        setTestType(e.target.value)
    };

    const handleSubmit = (e) =>{
      if(studentid){
        fetchData();
      }
      if(!studentid){
        setMessage("Please Enter Student ID");
      }
      
    }

    useEffect(() => {
        if (studentid) {
          fetchData();
        }
      }, [studentid]);
  
      const handleDelSub=async()=>{
        if(!studentid || !test_type){
          setMessage("Please Enter Student Id and select Test_type")
        }else{
          if(window.confirm(`Are you sure you want to delete Progress Report of '${studentid}' ?`)){
            try{
              const { data } = await axios.delete(`https://hvs-backend.onrender.com/teacher/deleteProgressReport/${studentid}/${test_type}`,
              {
                  withCredentials: true,
              }); 
              const { success, message, delData } = data;
              if(success){
               alert(message);
               navigate('/teacher/viewProgressReport');
              }
      
            }catch(error){
              setMessage(error.message);
              navigate('/teacher/viewProgressReport');
            }
          }
        }
      }
      function handleSub(){
        if(studentid){
          if(test_type==="FA1" || test_type==="FA2" || test_type==="SA1" || test_type==="FA3" || test_type==="FA4" || test_type==="SA2"){
            navigate(`/teacher/editProgressReport/${studentid}/${test_type}`);
        }else{
            setMessage("Please enter valid test type");
        }
        }else{
          setMessage("Please Enter the Student ID");
        }
      }
      /*      */ 
  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <TeacherList className="adprof"/>
    <div className='stuid'>
    <label htmlFor="student_id" class="stuname">Enter Student ID</label>
      <input 
         className='stuidinp'
        type="text"
        id="student_id"
        name="student_id"
        value={studentid}
        onChange={handleChange}
        autoComplete="off"
      />
      <button type='submit' class="sbt" onClick={handleSubmit} >Submit</button>
      <a href="/teacher/viewProgressReport" onClick={(e)=>handleEdit(e)} class="proicon" ><FontAwesomeIcon icon={faEdit} /></a>
      <a href="/teacher/viewProgressReport" onClick={(e)=>handleDelete(e)} class="proicon"><FontAwesomeIcon icon={faTrash} /></a>
      {/* <div>{click}</div> */}
      </div>
      { click ? (
        <>
        <select value={test_type} onChange={handletest_type} className='test_type'>
          <option value="">Select a Test Type to Edit</option>
          <option value="FA1">FA1</option>
          <option value="FA2">FA2</option>
          <option value="SA1">SA1</option>
          <option value="FA3">FA3</option>
          <option value="FA4">FA4</option>
          <option value="SA2">SA2</option>
        </select>
        <button type='submit' onClick={handleSub}className='test_typesbt'>Submit</button>
        </>
      ):(<div></div>)
        
      }

        {delclick ? (
        <>
        <select value={test_type} onChange={handletest_type} className='test_type'>
          <option value="">Select a Test Type to Delete</option>
          <option value="FA1">FA1</option>
          <option value="FA2">FA2</option>
          <option value="SA1">SA1</option>
          <option value="FA3">FA3</option>
          <option value="FA4">FA4</option>
          <option value="SA2">SA2</option>
        </select>
        <button type='submit' onClick={handleDelSub} class='test_typesbtdel'>Submit</button>
        </>
      ):(<div></div>)
        
      }
    
    <table  class="prodata">
      <thead>
        <tr>
          <th>Subject/Test Type</th>
          <th>FA1</th>
          <th>FA2</th>
          <th>SA1</th>
          <th>FA3</th>
          <th>FA4</th>
          <th>SA2</th>
        </tr>
      </thead>
      <tbody>
       <tr>
        <td>Kannada</td>
        <td>{FA1.kannada || '-'}</td>
        <td>{FA2.kannada || '-'}</td>
        <td>{SA1.kannada || '-'}</td>
        <td>{FA3.kannada || '-'}</td>
        <td>{FA4.kannada || '-'}</td>
        <td>{SA2.kannada || '-'}</td>
       </tr>
       <tr>
        <td>English</td>
        <td>{FA1.english || '-'}</td>
        <td>{FA2.english || '-'}</td>
        <td>{SA1.english || '-'}</td>
        <td>{FA3.english || '-'}</td>
        <td>{FA4.english || '-'}</td>
        <td>{SA2.english || '-'}</td>
       </tr>
       <tr>
        <td>Hindi</td>
        <td>{FA1.hindi || '-'}</td>
        <td>{FA2.hindi || '-'}</td>
        <td>{SA1.hindi || '-'}</td>
        <td>{FA3.hindi || '-'}</td>
        <td>{FA4.hindi || '-'}</td>
        <td>{SA2.hindi || '-'}</td>
       </tr>
       <tr>
        <td>Maths</td>
        <td>{FA1.maths || '-'}</td>
        <td>{FA2.maths || '-'}</td>
        <td>{SA1.maths || '-'}</td>
        <td>{FA3.maths || '-'}</td>
        <td>{FA4.maths || '-'}</td>
        <td>{SA2.maths || '-'}</td>
       </tr>
       <tr>
        <td>Science</td>
        <td>{FA1.science || '-'}</td>
        <td>{FA2.science || '-'}</td>
        <td>{SA1.science || '-'}</td>
        <td>{FA3.science || '-'}</td>
        <td>{FA4.science || '-'}</td>
        <td>{SA2.science || '-'}</td>
       </tr>
       <tr>
        <td>Social</td>
        <td>{FA1.social || '-'}</td>
        <td>{FA2.social || '-'}</td>
        <td>{SA1.social || '-'}</td>
        <td>{FA3.social || '-'}</td>
        <td>{FA4.social || '-'}</td>
        <td>{SA2.social || '-'}</td>
       </tr>
       <tr>
        <td>Physivcal Education</td>
        <td>{FA1.physical_education || '-'}</td>
        <td>{FA2.physical_education || '-'}</td>
        <td>{SA1.physical_education || '-'}</td>
        <td>{FA3.physical_education || '-'}</td>
        <td>{FA4.physical_education || '-'}</td>
        <td>{SA2.physical_education || '-'}</td>
       </tr>
       <tr>
        <td>Drawing</td>
        <td>{FA1.drawing || '-'}</td>
        <td>{FA2.drawing || '-'}</td>
        <td>{SA1.drawing || '-'}</td>
        <td>{FA3.drawing || '-'}</td>
        <td>{FA4.drawing || '-'}</td>
        <td>{SA2.drawing || '-'}</td>
       </tr>
       <tr>
        <td>Computer Science</td>
        <td>{FA1.computer_science || '-'}</td>
        <td>{FA2.computer_science || '-'}</td>
        <td>{SA1.computer_science || '-'}</td>
        <td>{FA3.computer_science || '-'}</td>
        <td>{FA4.computer_science || '-'}</td>
        <td>{SA2.computer_science || '-'}</td>
       </tr>
       <tr>
        <td>Moral Science</td>
        <td>{FA1.moral_science || '-'}</td>
        <td>{FA2.moral_science || '-'}</td>
        <td>{SA1.moral_science || '-'}</td>
        <td>{FA3.moral_science || '-'}</td>
        <td>{FA4.moral_science || '-'}</td>
        <td>{SA2.moral_science || '-'}</td>
       </tr>
       <tr>
        <td>Percentage</td>
        <td>{FA1.tot || '-'}</td>
        <td>{FA2.tot || '-'}</td>
        <td>{SA1.tot || '-'}</td>
        <td>{FA3.tot || '-'}</td>
        <td>{FA4.tot || '-'}</td>
        <td>{SA2.tot || '-'}</td>
       </tr>
       <tr>
        <td>Feedback</td>
        <td>{FA1.feedback || '-'}</td>
        <td>{FA2.feedback || '-'}</td>
        <td>{SA1.feedback || '-'}</td>
        <td>{FA3.feedback || '-'}</td>
        <td>{FA4.feedback || '-'}</td>
        <td>{SA2.feedback || '-'}</td>
       </tr>
      </tbody>
    </table>
    <div className='editmsg'>{ msg }</div>
    <Footer />
    </>
  );
}

export default TeacherViewProgressReport;
