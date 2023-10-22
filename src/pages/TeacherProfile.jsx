import React, { useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from "axios";
import TeacherList from './shared/TeacherList';

function TeacherProfile () {
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [teacher,setTeacher] = useState("");
    const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    navigate('/teacher/profile');
    
    const verifyUser = async () =>{
    if(cookies.jwt && user.role==="Teacher"){
        const email=user.email;
        try {
            const { data } =await axios.get(
                "http://localhost:8000/teacher/profile",
                {
                  params:{
                    email:email,
                  },
                 withCredentials: true,
                }
              );
              const { success } = data;
              if(success){
                setTeacher(data.teacherProf);
                navigate('/teacher/profile');
              }else{
                console.log(data.msg);
                navigate('/teacher');
              }
        }catch(error){
            console.log(error);
            navigate('/teacher');
        }
    }
      else{
        navigate("/login");
      }
    }
    verifyUser();
    }
  

  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div classname='flexlayout'></div>
    <TeacherList className='adprof'/>
    <div>
      {teacher ? (
        <table class='teachprof'>
          <tbody>
            <tr>
              <td className="tab">Employee ID :</td>
              <td>{teacher.emp_id}</td>
            </tr>
            <tr>
              <td className="tab">First Name :</td>
              <td>{teacher.first_name}</td>
            </tr>
            <tr>
              <td className="tab">Last Name :</td>
              <td>{teacher.last_name}</td>
            </tr>
            <tr>
              <td className="tab">Date of Birth :</td>
              <td>{teacher.dob}</td>
            </tr>
            <tr>
              <td className="tab">Age :</td>
              <td>{teacher.age}</td>
            </tr>
            <tr>
              <td className="tab">Gender :</td>
              <td>{teacher.gender}</td>
            </tr>
            <tr>
              <td className="tab">Qualification :</td>
              <td>{teacher.qualification}</td>
            </tr>
            <tr>
              <td className="tab">Course :</td>
              <td>{teacher.course}</td>
            </tr>
            <tr>
              <td className="tab">Designation :</td>
              <td>{teacher.designation}</td>
            </tr>
            <tr>
              <td className="tab">Email :</td>
              <td>{teacher.email}</td>
            </tr>
            <tr>
              <td className="tab">Mobile :</td>
              <td>{teacher.mob_num}</td>
            </tr>
            <tr>
              <td className="tab">Address :</td>
              <td>{teacher.address}</td>
            </tr>
          </tbody>
        </table>
      ):(<div className='message'> Currently Profile information is not available </div>)}
    </div>
    <Footer />
    </>
  );
}

export default TeacherProfile;
