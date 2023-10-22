import React, { useState } from 'react';

function ParentsList() {
  const [isStudentDropdownVisible, setStudentDropdownVisible] = useState(false);
  const [isStaffDropdownVisible, setStaffDropdownVisible] = useState(false);

  const toggleStudentDropdown = () => {
    setStudentDropdownVisible(!isStudentDropdownVisible);
  };

  const toggleStaffDropdown = () => {
    setStaffDropdownVisible(!isStaffDropdownVisible);
  };

  return (
    <>
    <nav>
      <ul className="adminlist">
        <li><a href="/parents/profile">Profile</a></li>
        <li><a href="/course">Course</a></li>
        <li><a href="/parents/attendance">Attendance</a></li>
        <li><a href="/parents/viewProgressReport">Progress Report</a></li>
        <li><a href="/parents/timeTable">Time Table</a></li>
      </ul>
    </nav>
    </>
  );
}

export default ParentsList;
