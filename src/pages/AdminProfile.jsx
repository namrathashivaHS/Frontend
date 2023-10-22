import React, { useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from "axios";
import AdminList from './shared/AdminList';

function AdminProfile () {
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [admin,setAdmin] = useState("");
    const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    //console.log(user,"good");
    navigate('/admin/profile');
    
    const verifyUser = async () =>{
    if(cookies.jwt && user.role==="Admin"){
        const email=user.email;
        try {
            const { data } =await axios.get(
                "http://localhost:8000/admin/profile",
                {
                  params:{
                    email:email,
                  },
                 withCredentials: true,
                }
              );
              const { success } = data;
              if(success){
                setAdmin(data.adminProf);
                navigate('/admin/profile');
              }else{
                console.log(data.msg);
                navigate('/admin');
              }
        }catch(error){
            console.log(error);
            navigate('/admin');
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
    <div class="flexlayout">
    <AdminList class="adprof"/>
      {admin? (
        <table class="profile">
          <tbody>
            <tr>
              <td className="tab">Name :</td>
              <td>{admin.name}</td>
            </tr>
            <tr>
              <td className="tab">Email :</td>
              <td>{admin.email}</td>
            </tr>
            <tr>
              <td className="tab">Designation :</td>
              <td>{admin.designation}</td>
            </tr>
            <tr>
              <td className="tab">Role :</td>
              <td>{admin.role}</td>
            </tr>
          </tbody>
        </table>
      ):(<div class="message"> Profile information is not available. Please try again later </div>)}
    </div>
    <Footer />
    </>
  );
}

export default AdminProfile;
