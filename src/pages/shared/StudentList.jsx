import React from 'react';

function StudentList() {
  return (
    <>
     <nav>
      <ul className="adminlist">
        <li><a href="/student/Profile">Profile</a></li>
        <li><a href="/course">Course</a></li>
        {/* <li><a href="/resource">Resource</a></li> */}
        <li><a href="/student/attendance">Attendance</a></li>
        <li><a href="/student/viewProgressReport">Progress Report</a></li>
        <li><a href="/student/timeTable">Time Table</a></li>
      </ul>
    </nav>
    </>
  );
}

export default StudentList;
