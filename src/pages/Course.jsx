import React, { useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

function Course () {
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [Role,setRole] = useState("");
    const receiveDataFromChild = (user) => {
         const token = sessionStorage.getItem('jwt');
    // Update the parent component's state with the received data
        if(token && (user.role=="Admin" || user.role=="Teacher" || user.role=="Parents" || user.role=="Student")){
            setChildData(user);
            setRole(user.role);
            console.log(Role)
        navigate('/course');
        }else{
            navigate('/login');
        }
    
    }
  
  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div>
        <h3 class="cor">Course for 1-10 Classes</h3>
        <p class="cor">Note:Only Core Subjects Kannada,English,Hindi,Maths,Science,Social are taken for percentage count </p>
        <table class="course">
          <tbody>
          <tr>
              <td className="tab">Kannada </td>
            </tr>
            <tr>
              <td className="tab">English </td>
            </tr>
            <tr>
              <td className="tab">Hindi</td>
            </tr>
            <tr>
              <td className="tab">Maths </td>
            </tr>
            <tr>
              <td className="tab">Science </td>
            </tr>
            <tr>
              <td className="tab">Social </td>
            </tr> 
            <tr>
              <td className="tab">Physical Education</td>
            </tr> 
            <tr>
              <td className="tab">Drawing</td>
            </tr>          
            <tr>
              <td className="tab">Computer Science</td>
            </tr>     
            <tr>
              <td className="tab">Moral Education</td>
            </tr> 
          </tbody>
        </table>
    </div>
    {Role === "Admin" ? (
    <button>
      <a href="/admin">Back</a>
    </button>
  ) : Role=="Teacher" ? (
    <button>
      <a href="/teacher">Back</a>
    </button>
  ):Role==="Parents"?(
    <button>
      <a href="/parents">Back</a>
    </button>
  ):(<button>
      <a href="/student">Back</a>
    </button>)}
    <Footer />
    </>
  );
}

export default Course;
