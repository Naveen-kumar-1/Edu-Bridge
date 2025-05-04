import React, { useState, useEffect } from "react";
import "./Students.css";
import { studentsData } from "../../../assets/data";
import EditStudentProfileForm from "../../../Components/Admin/EditStudentProfileForm/EditStudentProfileForm";
import CreateNewStudent from "../../../Components/Admin/CreateNewStudent/CreateNewStudent";
import ViewStudentData from "../../../Components/Admin/ViewStudentData/ViewStudentData";

const Students = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [createNew, setCreateNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ New loading state

  const studentsPerPage = 8;

  // Simulate API/data loading
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 1200); // simulate 1.2s delay
    return () => clearTimeout(timeout);
  }, [currentPage, searchTerm, selectedClass]);

  const handleCreateNew = () => setCreateNew(true);
  const handleBackToHome = () => setCreateNew(false);

  const classes = ["All", ...new Set(studentsData.map((s) => s.class))];

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.register_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobile_number.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = selectedClass === "All" || student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  let serialNumber = indexOfFirstStudent + 1;

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    setCurrentPage(1);
  };
  const handleViewStudent = (student) => setSelectedStudent(student);
  const handleStudentProfileEdit = () => setIsEditing(true);
  const handleProfileUpdate = (data) => {
    console.log("Updated Data: ", data);
    setIsEditing(false);
  };
  const handleCancel = () => setIsEditing(false);

  return (
    <div className="ed-admin-students">
      {!selectedStudent && !createNew && (
        <>
          {/* Top Header + Search */}
          <div className="ed-admin-student-top">
            <div>
              <h1>Manage Student Data</h1>
              {isLoading ? (
                <div className="skeleton skeleton-input" />
              ) : (
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            </div>
            {isLoading ? (
              <div className="skeleton skeleton-button" />
            ) : (
              <button onClick={handleCreateNew}>
                <i className="bx bx-plus-circle"></i>Add New Student
              </button>
            )}
          </div>

          {/* Class navigation */}
          <div className="class-navigation">
            {isLoading
              ? Array(4)
                  .fill()
                  .map((_, idx) => (
                    <span key={idx} className="skeleton skeleton-tab" />
                  ))
              : classes.map((classItem) => (
                  <span
                    key={classItem}
                    className={selectedClass === classItem ? "active" : ""}
                    onClick={() => handleClassChange(classItem)}
                  >
                    {classItem}
                  </span>
                ))}
          </div>

          {/* Table */}
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
                {isLoading ? (
                  Array(8)
                    .fill()
                    .map((_, idx) => (
                      <tr key={idx}>
                        <td><div className="skeleton skeleton-text" /></td>
                        <td className="skeleton-img-name">
                        <div className="skeleton-circle sm" />
                        <div className="skeleton skeleton-line" /></td>
                        <td><div className="skeleton skeleton-text" /></td>
                        <td><div className="skeleton skeleton-text" /></td>
                        <td><div className="skeleton skeleton-text" /></td>
                        <td><div className="skeleton skeleton-text" /></td>
                        <td><div className="skeleton skeleton-button-sm" /></td>
                      </tr>
                    ))
                ) : currentStudents.length > 0 ? (
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

          {/* Pagination */}
          <div className="pagination-controls">
            {isLoading ? (
              <div className="skeleton skeleton-pagination" />
            ) : (
              <>
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
              </>
            )}
          </div>
        </>
      )}

      {/* Create New Student */}
      {createNew && <CreateNewStudent handleBackToHome={handleBackToHome} />}

      {/* View Student */}
      {selectedStudent && !isEditing && (
        <ViewStudentData
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          handleStudentProfileEdit={handleStudentProfileEdit}
          formatDate={formatDate}
        />
      )}

      {/* Edit Student */}
      {selectedStudent && isEditing && (
        <EditStudentProfileForm
          selectedStudent={selectedStudent}
          handleProfileUpdate={handleProfileUpdate}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Students;
