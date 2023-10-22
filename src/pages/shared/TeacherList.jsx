import React ,{useEffect,useState} from 'react';

function TeacherList() {
  const [isAttendanceDropdownVisible, setAttendanceDropdownVisible] = useState(false);
  const [isProgressReportDropdownVisible, setProgressReportDropdownVisible] = useState(false);

  const toggleAttendanceDropdown = (event) => {
    event.stopPropagation();
    setAttendanceDropdownVisible(!isAttendanceDropdownVisible);
    setProgressReportDropdownVisible(false);
  };

   const toggleProgressReportDropdown = (event) => {
    event.stopPropagation();
    setProgressReportDropdownVisible(!isProgressReportDropdownVisible);
    setAttendanceDropdownVisible(false);
  };

   useEffect(() => {
    // Add event listener to close dropdowns when clicking anywhere on the screen
    const closeDropdowns = () => {
      setProgressReportDropdownVisible(false);
      setAttendanceDropdownVisible(false);
    };

    if ( isAttendanceDropdownVisible || isProgressReportDropdownVisible ) {
      document.addEventListener('click', closeDropdowns);
    }

    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('click', closeDropdowns);
    };
  }, [isAttendanceDropdownVisible, isProgressReportDropdownVisible]);

    return (
        <nav>
          <ul className="adminlist">
            <li><a href="/teacher/Profile">Profile</a></li>
            <li><a href="/course">Course</a></li>
             <li>
            <div className="dropdown">
              <button className="dropdown-toggle par" onClick={toggleAttendanceDropdown}>
                Attendance
              </button>
              <div className={`dropdown-content par ${isAttendanceDropdownVisible ? 'show' : ''}`}>
                <a href="/teacher/attendance">Mark Attendance</a>
                <a href="/teacher/viewAttendance">View/Modify Attendance</a>
              </div>
            </div>
          </li>
             <li>
            <div className="dropdown">
              <button className="dropdown-toggle par" onClick={toggleProgressReportDropdown}>
                Progress Report
              </button>
              <div className={`dropdown-content par ${isProgressReportDropdownVisible ? 'show' : ''}`}>
                <a href="/teacher/progressReport">Prepare Progress Report</a>
                <a href="/teacher/viewProgressReport">View Progress Report</a>
              </div>
            </div>
          </li>
          <li><a href="/teacher/timeTable">Time Table</a></li>
          </ul>
        </nav>
      );
}

export default TeacherList;
