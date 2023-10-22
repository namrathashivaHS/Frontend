import React, { useEffect } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import AdminList from './shared/AdminList';

function Resource () {
    const [user, setChildData] = useState('');
    const navigate=useNavigate();
    const [cookies,removeCookie] = useCookies([]);
    const [Role,setRole] = useState("");
    const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
        if(cookies.jwt&&user.role=="Admin"){
            setChildData(user);
            setRole(user.role);
            console.log(Role)
        navigate('/admin/resource');
        }else{
            navigate('/login');
        }
    
    }
  
  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <AdminList/>
    <div>
      <h3 class="roomtitle">Total number of Rooms and their Allocation</h3>
      <div >
      <table class="room">
        <thead>
          <tr>
              <th>Rooms</th>
              <th>Allocation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Room No : 1</td>
            <td>Class 1</td>
          </tr>
          <tr>
            <td>Room No : 2</td>
            <td>Class 2</td>
          </tr>
          <tr>
            <td>Room No : 3</td>
            <td>Class 3</td>
          </tr>
          <tr>
            <td>Room No : 4</td>
            <td>Class 4</td>
          </tr>
          <tr>
            <td>Room No : 5</td>
            <td>Class 5</td>
          </tr>
          <tr>
            <td>Room No : 6</td>
            <td>Class 6</td>
          </tr>
          <tr>
            <td>Room No : 7</td>
            <td>Class 7</td>
          </tr>
          <tr>
            <td>Room No : 8</td>
            <td>Class 8</td>
          </tr>
          <tr>
            <td>Room No : 9</td>
            <td>Class 9</td>
          </tr>
          <tr>
            <td>Room No : 10</td>
            <td>Class 10</td>
          </tr>
          <tr>
            <td>Room No : 11</td>
            <td>Office Room</td>
          </tr>
          <tr>
            <td>Room No : 12</td>
            <td>Lab</td>
          </tr>
          <tr>
            <td>Room No : 13</td>
            <td>Visiters Room</td>
          </tr>
          <tr>
            <td>Room No : 14</td>
            <td>Library</td>
          </tr>
          <tr>
            <td>Room No : 15</td>
            <td>Store Room</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div>
      <h3 class="labtitle">Lab Equipments Availability</h3>
      <table class="labeq">
        <thead>
          <tr>
            <th>Equipment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TestTube</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>Beaker</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>MicroScope</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>Thermometer</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>Burner</td>
            <td>Not Available</td>
          </tr>
          <tr>
            <td>Dropper</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>Tongs</td>
            <td>Not Available</td>
          </tr>
          <tr>
            <td>Wash Bottles</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>Burette</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>Funnel</td>
            <td>Available</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  );
}

export default Resource;