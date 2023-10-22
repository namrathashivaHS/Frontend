import React, { useState, useEffect } from 'react';

function AdminList() {
  const [isStudentDropdownVisible, setStudentDropdownVisible] = useState(false);
  const [isStaffDropdownVisible, setStaffDropdownVisible] = useState(false);
  const [isParentDropdownVisible, setParentDropdownVisible] = useState(false);
  const [isTimeTableDropdownVisible, setTimeTableDropdownVisible] = useState(false);

  const toggleStudentDropdown = (event) => {
    event.stopPropagation();
    setStudentDropdownVisible(!isStudentDropdownVisible);
    setStaffDropdownVisible(false);
    setParentDropdownVisible(false);
    setTimeTableDropdownVisible(false);
  };

  const toggleStaffDropdown = (event) => {
    event.stopPropagation();
    setStaffDropdownVisible(!isStaffDropdownVisible);
    setStudentDropdownVisible(false);
    setParentDropdownVisible(false);
    setTimeTableDropdownVisible(false);
  };

  const toggleParentDropdown = (event) => {
    event.stopPropagation();
    setParentDropdownVisible(!isParentDropdownVisible);
    setStudentDropdownVisible(false);
    setStaffDropdownVisible(false);
    setTimeTableDropdownVisible(false);
  };

  const toggleTimeTableDropdown = (event) => {
    event.stopPropagation();
    setTimeTableDropdownVisible(!isTimeTableDropdownVisible);
    setStudentDropdownVisible(false);
    setParentDropdownVisible(false);
    setStaffDropdownVisible(false);
  };

  useEffect(() => {
    // Add event listener to close dropdowns when clicking anywhere on the screen
    const closeDropdowns = () => {
      setStudentDropdownVisible(false);
      setStaffDropdownVisible(false);
      setParentDropdownVisible(false);
      setTimeTableDropdownVisible(false);
    };

    if (isStudentDropdownVisible || isStaffDropdownVisible || isParentDropdownVisible || isTimeTableDropdownVisible) {
      document.addEventListener('click', closeDropdowns);
    }

    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('click', closeDropdowns);
    };
  }, [isStudentDropdownVisible, isStaffDropdownVisible, isParentDropdownVisible, isTimeTableDropdownVisible]);

  return (
    <>
    <div>
      <nav>
        <ul className="adminlist">
          <li><a href="/admin/profile" >Profile</a></li>
          <li>
            <div className="dropdown">
              <button className="dropdown-toggle stu" onClick={toggleStudentDropdown}>
                Student
              </button>
              <div className={`dropdown-content stu ${isStudentDropdownVisible ? 'show' : ''}`}>
                <a href="/admin/addStudent">Add Student</a>
                <a href="/admin/viewStudent">View/Modify Student</a>
              </div>
            </div>
          </li>
          <li><a href="/admin/viewAttendance">Attendance</a></li>
          <li>
            <div className="dropdown">
              <button className="dropdown-toggle sta" onClick={toggleStaffDropdown}>
                Staff
              </button>
              <div className={`dropdown-content sta ${isStaffDropdownVisible ? 'show' : ''}`}>
                <a href="/admin/addStaff">Add Staff</a>
                <a href="/admin/viewStaff">View/Modify Staff</a>
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropdown-toggle par" onClick={toggleParentDropdown}>
                Parents
              </button>
              <div className={`dropdown-content par ${isParentDropdownVisible ? 'show' : ''}`}>
                <a href="/admin/addParents">Add Parents</a>
                <a href="/admin/viewParents">View/Modify Parents</a>
              </div>
            </div>
          </li>
           <li>
            <div className="dropdown">
              <button className="dropdown-toggle par" onClick={toggleTimeTableDropdown}>
                Time Table
              </button>
              <div className={`dropdown-content par ${isTimeTableDropdownVisible ? 'show' : ''}`}>
                <a href="/admin/addTimeTable">Add Time Table</a>
                <a href="/admin/timeTable">View/Modify Time Table</a>
              </div>
            </div>
          </li>
          <li><a href="/course">Course</a></li>
          <li><a href="/admin/resource">Resource</a></li>
          {/* <li><a href="/chat">Chat</a></li> */}
        </ul>
      </nav>
    </div>
    </>
  );
}

export default AdminList;
