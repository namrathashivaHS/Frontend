import React, { useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from "axios";
import StudentList from './shared/StudentList';

function StudentProfile () {
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [student,setStudent] = useState("");
    const [classTeacher, setClassTeaher] = useState("");
    const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    //console.log(user,"good");
    navigate('/student/profile');
    
    const verifyUser = async () =>{
    if(cookies.jwt && user.role==="Student"){
        const email=user.email;
        try {
            const { data } =await axios.get(
                "http://localhost:8000/student/profile",
                {
                  params:{
                    email:email,
                  },
                 withCredentials: true,
                }
              );
              const { success } = data;
              if(success){
                setStudent(data.studentProf);
                setClassTeaher(data.classteacher);
                navigate('/student/profile');
              }else{
                console.log(data.msg);
                navigate('/student');
              }
        }catch(error){
            console.log(error);
            navigate('/student');
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
    <div classname='flexlayout'>
    <StudentList className="adprof"/>
    <div>
      {student? (
        <table class="stuprof">
          <tbody>
            <tr>
              <td className="tab">Roll Number :</td>
              <td>{student.roll_no}</td>
            </tr>
            <tr>
              <td className="tab">First Name :</td>
              <td>{student.first_name}</td>
            </tr>
            <tr>
              <td className="tab">Last Name :</td>
              <td>{student.last_name}</td>
            </tr>
            <tr>
              <td className="tab">Father Name :</td>
              <td>{student.father_name}</td>
            </tr>
            <tr>
              <td className="tab">Mother Name :</td>
              <td>{student.mother_name}</td>
            </tr>
            <tr>
              <td className="tab">Date of Birth :</td>
              <td>{student.dob}</td>
            </tr>
            <tr>
              <td className="tab">Age :</td>
              <td>{student.age}</td>
            </tr>
            <tr>
              <td className="tab">Gender :</td>
              <td>{student.gender}</td>
            </tr>
            <tr>
              <td className="tab">Admission year :</td>
              <td>{student.admission_year}</td>
            </tr>
            <tr>
              <td className="tab">Class :</td>
              <td>{student.class_std}</td>
            </tr>
            <tr>
              <td className="tab">Section :</td>
              <td>{student.section}</td>
            </tr>
            <tr>
              <td className="tab">Class Teacher :</td>
              <td>{classTeacher.first_name+' '+classTeacher.last_name}</td>
            </tr>
            <tr>
              <td className="tab">Email :</td>
              <td>{student.email}</td>
            </tr>
            <tr>
              <td className="tab">Mobile :</td>
              <td>{student.mob_num}</td>
            </tr>
            <tr>
              <td className="tab">Address :</td>
              <td>{student.address}</td>
            </tr>
          </tbody>
        </table>
      ):(<div className='message'> Currently Profile information is not available </div>)}</div>
    </div>
    <Footer />
    </>
  );
}

export default StudentProfile;
