import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

function Home() {
  const [user, setChildData] = useState('');
  const navigate=useNavigate();
  const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
  };

  // const handleAbout = (e) => {
  //   //e.preventDefault();
  //   navigate('/about');
  // }
  
  return (
    <>
      <Header sendDataToParent={receiveDataFromChild}/>
      <header>
      <div className="home_page">
        <h2  class="head hema">
          HEMA VIDYA SANGHA
        </h2>
      </div>
      <div class="view">
      {user ? (
        user.role === 'Admin' ? (
          <a href="/admin" className="btn">VIEW MORE</a>
        ) : user.role === 'Student' ? (
          <a href="/student" className="btn">VIEW MORE</a>
        ) : user.role === 'Teacher' ? (
          <a href="/teacher" className="btn">VIEW MORE</a>
        ) : user.role === 'Parents' ? (
          <a href="/parents" className="btn">VIEW MORE</a>
        ) : (<div></div>)
      ) : null}
      {/* <button onClick={(e)=>handleAbout(e)} className="about">About</button> */}
    </div>
    </header>
      <ToastContainer />
      <Footer/>
    </>
  );
};

export default Home;

