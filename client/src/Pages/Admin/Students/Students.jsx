import React, { useState } from "react";
import "./Students.css";
import { studentsData } from "../../../assets/data";
import EditProfileForm from "../../../Components/Admin/EditStudentProfileForm/EditStudentProfileForm";
import CreateNewStudent from "../../../Components/Admin/CreateNewStudent/CreateNewStudent";
import EditStudentProfileForm from "../../../Components/Admin/EditStudentProfileForm/EditStudentProfileForm";

const Students = () => {
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedClass, setSelectedClass] = useState("All"); // State for selected class
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
  const studentsPerPage = 8; // Number of students per page
  const [createNew, setCreateNew] = useState(false);
  const handleCreateNew = () => {
    setCreateNew(true);
  };

  // Get unique classes from student data
  const classes = [
    "All",
    ...new Set(studentsData.map((student) => student.class)),
  ];
  const formatDate = (timestamp) => {
    if (!timestamp) return ""; // Handle null/undefined cases

    const date = new Date(timestamp * 1000); // Convert to milliseconds by multiplying by 1000
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

  // Filter students based on search term and selected class
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearchTerm =
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.register_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.mobile_number.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "All" || student.class === selectedClass;

    return matchesSearchTerm && matchesClass;
  });

  // Calculate the starting and ending indices for slicing the filteredStudents array
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  ); // Get current page students

  // Calculate total pages based on filtered students
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Function to handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Function to handle class selection
  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    setCurrentPage(1); // Reset to first page on class change
  };

  // Function to handle student selection for viewing details
  const handleViewStudent = (student) => {
    setSelectedStudent(student); // Set the selected student
  };

  let serialNumber = indexOfFirstStudent + 1; // Adjust the serial number
  // handleStudentProfileEdit
  const [isEditing, setIsEditing] = useState(false);

  const handleStudentProfileEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleProfileUpdate = (updatedStudentData) => {
    // Logic to update the student profile goes here
    // For example, updating the student data in the state or making an API call
    console.log("Updated Data: ", updatedStudentData);
    setIsEditing(false); // Disable edit mode after saving changes
  };

  const handleCancel = () => {
    setIsEditing(false); // Disable edit mode without saving changes
  };
  const handleBackToHome =()=>{
    setCreateNew(false)
  }
 
  return (
    <div className="ed-admin-students">
      {!selectedStudent && !createNew && (
        <>
          <div className="ed-admin-student-top">
            <div>
              <h1>Manage Student Data</h1>
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </div>
            <button onClick={handleCreateNew}>
              <i className="bx bx-plus-circle"></i>Add New Student
            </button>
          </div>
          
          {/* Class navigation */}
          <div className="class-navigation">
            {classes.map((classItem) => (
              <span
                key={classItem}
                className={selectedClass === classItem ? "active" : ""}
                onClick={() => handleClassChange(classItem)}
              >
                {classItem}
              </span>
            ))}
          </div>

          <div className="ed-student-table-container">
            <table className="ed-student-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Register Number</th>
                  <th>Class</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{serialNumber++}</td>
                      <td>
                        <div className="ed-student-line-name">
                          <img src={student.image} alt="" />
                          <span>
                            {student.first_name + " " + student.last_name}
                          </span>
                        </div>
                      </td>
                      <td>{student.register_number}</td>
                      <td>{student.class}</td>
                      <td>{student.mobile_number}</td>
                      <td>{student.email}</td>
                      <td>
                        <button onClick={() => handleViewStudent(student)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      {createNew && (
            <>
             <CreateNewStudent handleBackToHome={handleBackToHome}/>
            </>
          )}
      {selectedStudent && !isEditing && (
        <div className="selected-student-details">
          <div className="selected-student-details-top">
            <div className="back-vanigation">
              <i
                class="bx bxs-chevron-left"
                onClick={() => setSelectedStudent(null)}
              ></i>
              <div>
                <h2>Student Profile</h2>
                <p>View and manage student information</p>
              </div>
            </div>
            <button onClick={handleStudentProfileEdit}>Edit Profile</button>
          </div>
          <div className="student-profile">
            <img src={selectedStudent.image} alt="" />
            <div className="selected-student-name">
              <h2>
                {selectedStudent.first_name + " " + selectedStudent.last_name}
              </h2>
              <p>student ID : {selectedStudent.register_number}</p>
              <div className="selected-student-course">
                <span>{selectedStudent.department}</span>
                <span>{selectedStudent.class}</span>
                <span>{selectedStudent.gender}</span>
              </div>
            </div>
          </div>
          <div className="student-personal-contact-acedamic">
            <div className="personal-and-contact">
              <div className="student-personal-details">
                <h3>Personal Information</h3>
                <div className="informations">
                  <div className="infos">
                    <span>Date of Birth :</span>{" "}
                    <p>{formatDate(selectedStudent.date_of_birth)}</p>{" "}
                  </div>

                  <div className="infos">
                    <span>Adhaar :</span> <p>{selectedStudent.adhaar}</p>
                  </div>
                  <div className="infos">
                    <span>Father's Name :</span>{" "}
                    <p>{selectedStudent.father_name}</p>
                  </div>
                  <div className="infos">
                    <span>Mother's Name :</span>{" "}
                    <p>{selectedStudent.mother_name}</p>
                  </div>
                  <div className="infos">
                    <span>Father's Occupation :</span>{" "}
                    <p>{selectedStudent.fathers_occupation}</p>
                  </div>
                  <div className="infos">
                    <span>Blood :</span> <p>{selectedStudent.blood_group}</p>
                  </div>
                </div>
              </div>
              <div className="student-contact-details">
                <h3>Contact Information</h3>
                <div className="informations">
                  <div className="infos">
                    <span>Mobile Number :</span>{" "}
                    <p>{selectedStudent.mobile_number}</p>{" "}
                  </div>
                  <div className="infos">
                    <span>Email :</span> <p>{selectedStudent.email}</p>
                  </div>
                  <div className="infos">
                    <span>Address :</span> <p>{selectedStudent.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="student-acedamic-details">
              <h3>Academic Details</h3>
              <div className="informations">
                <div className="infos">
                  <span>Register Number :</span>{" "}
                  <p>{selectedStudent.register_number}</p>{" "}
                </div>
                <div className="infos">
                  <span>Class :</span> <p>{selectedStudent.class}</p>
                </div>
                <div className="infos">
                  <span>College name :</span> <p>{selectedStudent.college}</p>
                </div>
                <div className="infos">
                  <span>Batch :</span> <p>{selectedStudent.year_of_study}</p>
                </div>
                <div className="infos">
                  <span>10th Mark :</span> <p>{selectedStudent.tenth_mark}</p>
                </div>
                <div className="infos">
                  <span>11th Mark :</span>{" "}
                  <p>{selectedStudent.eleventh_mark}</p>
                </div>
                <div className="infos">
                  <span>12th Mark :</span> <p>{selectedStudent.twelfth_mark}</p>
                </div>
                <div className="infos">
                  <span>Higher secondry group :</span>{" "}
                  <p>{selectedStudent.higher_secondry_group}</p>
                </div>
                <div className="infos">
                  <span>School Name :</span> <p>{selectedStudent.school}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedStudent && isEditing && (
        
        
        <>
          <EditStudentProfileForm
            selectedStudent={selectedStudent}
            handleProfileUpdate={handleProfileUpdate}
            handleCancel={handleCancel}
          />
        </>
      )}
    </div>
  );
};

export default Students;
