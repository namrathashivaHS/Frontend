import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import  Login  from "./pages/Login";
// import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import  Home  from "./pages/Home";
import AdminProfile from "./pages/AdminProfile";
import StudentRegistration from "./pages/StudentRegistration";
import StaffRegistration from "./pages/StaffRegistration";
import ChangePassword from "./pages/ChangePassword";
import Student from "./pages/Student";
import StudentProfile from "./pages/StudentProfile";
import StudentAttendance from "./pages/StudentAttendance";
import ViewStudent from "./pages/ViewStudent";
import ViewStaff from "./pages/ViewStaff";
import StudentUpdation from "./pages/StudentUpdation";
import StaffUpdation from "./pages/StaffUpdation";
import Teacher from "./pages/Teacher";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherAttendance from "./pages/TeacherAttendance";
import ParentsRegistration from "./pages/ParentsRegistration";
import ViewParents from "./pages/ViewParents";
import ParentsUpdation from "./pages/ParentsUpdation";
import Parents from "./pages/Parents";
import ParentsProfile from "./pages/ParentsProfile";
import ViewAttendance from "./pages/ParentsAttendance";
import ViewAdminAttendance from "./pages/ViewAttendance";
import EditAttendance from "./pages/EditAttendance";
import TeacherViewAttendance from "./pages/TeacherViewAttendance";
import Course from "./pages/Course";
import AddProgressReport from "./pages/AddProgressReport";
import TeacherViewProgressReport from "./pages/TeacherViewProgressReport";
import ParentsViewProgressReport from "./pages/ParentsViewProgressReport";
import StudentViewProgressReport from "./pages/StudentViewProgressreport";
import TeacherEditProgressReport from "./pages/TeacherEditProgressReport";
import Chat from './pages/Chat';
import About from './pages/About';
import Resource from './pages/Resource';
import TimeTable from './pages/Timetable';
import ViewTimeTable from './pages/ViewTimeTable';
import TeacherTimeTable from './pages/TeacherTimetable';
import StudentTimeTable from './pages/StudentTimeTable';
import ParentsTimeTable from './pages/ParentsTimeTable';
import { cookiesProvider } from 'react-cookie';
// import { socket } from './socket';
// import { ConnectionState } from './components/ConnectionState';
// import { ConnectionManager } from './components/ConnectionManager';
// import { MyForm } from './components/MyForm';

function App() {
  //const [isConnected, setIsConnected] = useState(socket.connected);
  //const [fooEvents, setFooEvents] = useState([]);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

    // function onFooEvent(value) {
    //   setFooEvents(previous => [...previous, value]);
    // }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);

  // const [fooEvents, setFooEvents] = useState([]);

  // useEffect(() => {
  //   // no-op if the socket is already connected
  //   socket.connect();

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   function onFooEvent(value) {
  //     setFooEvents(fooEvents.concat(value));
  //   }

  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('foo', onFooEvent);
  //   };
  // }, [fooEvents]);


  return (
   <cookiesProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/logout" element={<Home />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/admin/profile" element={<AdminProfile />}/>
        <Route path="/admin/addStudent" element={<StudentRegistration />} />
        <Route path="/admin/addStaff" element={<StaffRegistration />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/admin/viewStudent" element={<ViewStudent />} />
        <Route path="/admin/viewStaff" element={<ViewStaff />} />
        <Route path="/admin/viewParents" element={<ViewParents />} />
        <Route path="/admin/editParents/:id" element={<ParentsUpdation />} />
        <Route path="/admin/editStudent/:id" element={<StudentUpdation />} />
        <Route path="/admin/deleteStudent/:id" element={<ViewStudent />} />
        <Route path="/admin/editStaff/:id" element={<StaffUpdation />} />
        <Route path="/admin/deleteStaff/:id" element={<ViewStaff />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/admin/addParents" element={<ParentsRegistration />} />
        <Route path="/admin/deleteParents/:id" element={<ViewParents />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/parents/profile" element={<ParentsProfile />} />
        <Route path="/parents/attendance" element={<ViewAttendance />} />
        <Route path="/admin/viewAttendance" element={<ViewAdminAttendance />} />
        <Route path="/teacher/editAttendance/:selectedClass/:selectedDate" element={<EditAttendance />} />
        <Route path="/teacher/viewAttendance" element ={<TeacherViewAttendance />} />
        <Route path="/course" element = {<Course />} />
        <Route path="/teacher/progressReport" element = {<AddProgressReport />} />
        <Route path="/teacher/viewProgressReport" element = {<TeacherViewProgressReport />} />
        <Route path="/parents/viewProgressReport" element = {<ParentsViewProgressReport />} />
        <Route path="/student/viewProgressReport" element = {<StudentViewProgressReport />} />
        <Route path="/teacher/deleteAttendance/:selectedClass/:selectedDate" element={<TeacherViewAttendance />} />
        <Route path="/teacher/editProgressReport/:studentid/:test_type" element={<TeacherEditProgressReport />} />
        <Route path="/teacher/deleteProgressReport/:studentid/:test_type" element={<TeacherViewProgressReport />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/alltheusers" element={<Chat />} />
        <Route path="/chat/group" element={<Chat />} />
        <Route path="/chat/rename" element={<Chat />} />
        <Route path="/about" element={<About/>} />
        <Route path="/admin/resource" element={<Resource />} />
        <Route path="/admin/addTimeTable" element={<TimeTable/>} />
        <Route path="/admin/timeTable" element={<ViewTimeTable />} />
        <Route path="/admin/deleteTimeTable/:class_std" element={<ViewTimeTable/>} />
        <Route path="/teacher/timeTable" element={<TeacherTimeTable />} />
        <Route path="/student/timeTable" element={<StudentTimeTable/>} />
        <Route path="/parents/timeTable" element={<ParentsTimeTable />} />
      </Routes>
      {/* <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm /> */}
    </div>
      </cookiesProvider>
  );
}
export default App;
