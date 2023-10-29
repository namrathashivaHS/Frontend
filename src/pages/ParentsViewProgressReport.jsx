import React, { useEffect, useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import ParentsList from './shared/ParentsList';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';

function ParentsViewProgressReport() {
    const [progressData, setProgressdata] = useState([]);
    const [msg,setMessage] = useState("");
    const [user, setChildData] = useState('');
    const [FA1,setFA1] = useState ([]);
    const [FA2,setFA2] = useState ([]);
    const [SA1,setSA1] = useState ([]);
    const [FA3,setFA3] = useState ([]);
    const [FA4,setFA4] = useState ([]);
    const [SA2,setSA2] = useState ([]); 
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const receiveDataFromChild = async(user) => {
         const token = sessionStorage.getItem('jwt');
        // Update the parent component's state with the received data
        setChildData(user);
        navigate('/parents/viewProgressReport');
    if(token && user.role=="Parents"){
        
        const email = user.email;
        const role = user.role;
       
        try{
            const { data } = await axios.get('https://hvs-backend.onrender.com/parents/viewProgressReport',
            {
                params:{
                    email,
                    role
                },
                withCredentials: true,
            }); 
            const { success, message, proData } = data;
            //console.log(proData);
        if(success){
            setMessage(message);
            
            for(const item of proData){
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
            navigate('/parents/viewProgressReport');
        }
        else{
            setMessage(message);
            navigate('/parents');
        }

    }catch(error){
        console.log(error.message);
        navigate('/parents');
        } 
    } else{
        navigate('/parents');
    }
    }
  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <div>
    <ParentsList className='adprof'/>
    <table className='pro parapro'>
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
    </div>
    <div class="message">{ msg }</div>
    <Footer />
    </>
  );
}

export default ParentsViewProgressReport;
