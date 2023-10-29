import React, { useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from "axios";
import ParentsList from './shared/ParentsList';

function ParentsProfile () {
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [parents,setParents] = useState("");
    const [studentName, setstudentName] = useState("");
    const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    navigate('/parents/profile');
    
    const verifyUser = async () =>{
         const token = sessionStorage.getItem('jwt');
    if(token && user.role==="Parents"){
        const email=user.email;
        try {
            const { data } =await axios.get(
                "https://hvs-backend.onrender.com/parents/profile",
                {
                  params:{
                    email:email,
                  },
                 withCredentials: true,
                }
              );
              const { success, parentsProf, stu } = data;
              if(success){
                setParents(parentsProf);
                setstudentName(stu);
                navigate('/parents/profile');
              }else{
                console.log(data.msg);
                navigate('/parents');
              }
        }catch(error){
            console.log(error);
            navigate('/parents');
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
    <ParentsList className="adprof"/>
    <div>
      {parents ? (
        <table class='parprof'>
          <tbody>
            <tr>
              <td className="tab">First Name :</td>
              <td>{parents.first_name}</td>
            </tr>
            <tr>
              <td className="tab">Last Name :</td>
              <td>{parents.last_name}</td>
            </tr>
            <tr>
              <td className="tab">Studnet ID :</td>
              <td>{parents.student_id}</td>
            </tr>
            <tr>
              <td className="tab">Student Name :</td>
              <td>{studentName.first_name+' '+studentName.last_name}</td>
            </tr>
            <tr>
              <td className="tab">Email :</td>
              <td>{parents.email}</td>
            </tr>
            <tr>
              <td className="tab">Mobile :</td>
              <td>{parents.mob_num}</td>
            </tr>
            <tr>
              <td className="tab">Address :</td>
              <td>{parents.address}</td>
            </tr>
          </tbody>
        </table>
       
      ):(<div class="message"> Currently Profile information is not available </div>)} </div>
    </div>
    <Footer />
    </>
  );
}

export default ParentsProfile;
