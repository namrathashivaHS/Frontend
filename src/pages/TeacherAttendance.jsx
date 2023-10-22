import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import Header from './shared/Header';
import Footer from './shared/Footer';
import TeacherList from './shared/TeacherList';

function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState(''); // State to store the selected class
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]); 
  const [isChecked,setChecked] = useState(false);
  const [message,setMessage] = useState("");
  const [students, setStudents] = useState([]); // State to store the list of students
  const navigate = useNavigate();
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setMessage("");
  };

  const handleCheckBoxChange = (e) => {
    setChecked(e.target.checked);
    if(isChecked===false){
      setMessage("On "+ selectedDate+ " is holiday then please click on submit button or else uncheck the Holiday check box");
      const updatedAttendanceData = students.map((student) => ({
        studentId: student.studentId,
        status: 'Holiday', // Update the status based on the checkbox
      }));
      setAttendanceData(updatedAttendanceData);
    }else{
      setMessage("");
    }
    console.log(isChecked);
  }

  const handleAttendanceChange = (studentId, status) => {
    // Update the attendanceData state based on the student's ID and status
    const updatedAttendance = [...attendanceData];
    const existingAttendance = updatedAttendance.find((item) => item.studentId === studentId);

    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      updatedAttendance.push({ studentId, status });
    }
    
    setAttendanceData(updatedAttendance);
    console.log(attendanceData);
   
  };

  const handleSubmitAttendance = async () => {
    if(students.length===attendanceData.length){
    try {
      // Make an API request to submit attendance data
      const { data } = await axios.post('http://localhost:8000/teacher/attendance', {
        date: selectedDate,
        attendanceData: attendanceData,
        email:user.email,
        cls:selectedClass
      });
      const { success, message } = data;
      if(success){
        setAttendanceData([]);
      }
      setMessage(message);
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  }else{
    setMessage("Please enter the attendance for all the students");
  }
  };

  const fetchStudents = async () => {
    
    try {
      // Make an API request to fetch students based on the selected class
      const { data } = await axios.get("http://localhost:8000/teacher/studentList",
                        {
                            params:{
                            clas:selectedClass,
                            },
                        withCredentials: true,
                        });
      const { success, message, stuList} = data;
      if(success){
        setStudents(stuList);
        console.log(message);
        navigate('/teacher/attendance');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
      setMessage("");
    }
    
  }, [selectedClass]); // Trigger the fetch when the selected class changes

  const [cookies,removeCookie] = useCookies([]);
  const [user, setChildData] = useState('');
  const receiveDataFromChild = (user) => {
    // Update the parent component's state with the received data
    setChildData(user);
    if(cookies.jwt && user.role=="Teacher"){
        navigate("/teacher/attendance");
      }else{
        navigate("/login");
      }
    }
  return (
    <>
    <Header sendDataToParent={receiveDataFromChild}/>
    <TeacherList className='adprof'/>
    <div className='flexlayout'>
      <form className="attform">
        <select value={selectedClass} onChange={handleClassChange} className="custom-select">
          <option value="">Select a Class</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
        <label>Select Date:</label>
        <input className="date" type="date" value={selectedDate} onChange={handleDateChange} />
         <div class="check">
        <input type="checkbox" class="onlycheck"checked={isChecked} onChange={handleCheckBoxChange}/>
        <label class="holiday">Holiday</label>
        </div>
      </form>
      </div>
      <div>
      {students.length>0 ?(
        <>
        <h3 className='stuh3'>Students List</h3>
        <table class="attdata">
            <thead>
                <tr>
                    <th >Student ID</th>
                    <th >Name</th>
                    <th >Status</th>
                </tr>
            </thead>
            <tbody>
            {students.map((item) => (
                <tr key={item._id}>
                    <td>{item.studentId}</td>
                    <td>{item.studentName}</td>
                    <td>
                    <label className="custom-radio">
                        <input
                        type="radio"
                        name={`attendance_${item.studentId}`}
                        value="Present"
                        onClick={() => handleAttendanceChange(item.studentId, 'Present')}
                        disabled={isChecked}
                        />
                        <span className="custom-radio-label present">Present</span>
                    </label>
                    <label className="custom-radio">
                        <input
                        type="radio"
                        name={`attendance_${item.studentId}`}
                        value="Absent"
                        onClick={() => handleAttendanceChange(item.studentId, 'Absent')}
                        disabled={isChecked}
                        />
                        <span className="custom-radio-label absent">Absent</span>
                    </label>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <button type="button" class="teachbtn" onClick={handleSubmitAttendance}>
            Submit
        </button>
         </>
      ):(<div class="nostulist">Student List is not available Please check Class and Date value</div>)}
    </div>
   
    <div class="message">{message}</div>
    <Footer/>
    </>
  );
}

export default TeacherAttendance;
