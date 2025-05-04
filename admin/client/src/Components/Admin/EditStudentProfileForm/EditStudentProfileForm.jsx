import React, { useState } from "react";
import "./EditStudentProfileForm.css";
import { toast } from "react-toastify";
const EditStudentProfileForm = ({
  selectedStudent,
  handleProfileUpdate,
  handleCancel,
}) => {
  
  const formatDate = (timestamp) => {
    if (!timestamp) return ""; // Handle null/undefined cases

    const date = new Date(timestamp * 1000); // Convert to milliseconds by multiplying by 1000
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };
  

  // Initialize form values based on selectedStudent
  const [formData, setFormData] = useState({
    first_name: selectedStudent.first_name,
    last_name: selectedStudent.last_name,
    register_number: selectedStudent.register_number,
    department:selectedStudent.department,
    class: selectedStudent.class,
    gender: selectedStudent.gender,
    date_of_birth: formatDate(selectedStudent.date_of_birth),
    adhaar: selectedStudent.adhaar,
    father_name: selectedStudent.father_name,
    mother_name: selectedStudent.mother_name,
    fathers_occupation: selectedStudent.fathers_occupation,
    blood_group: selectedStudent.blood_group,
    mobile_number: selectedStudent.mobile_number,
    email: selectedStudent.email,
    address: selectedStudent.address,
    college: selectedStudent.college,
    year_of_study: selectedStudent.year_of_study,
    tenth_mark: selectedStudent.tenth_mark,
    eleventh_mark: selectedStudent.eleventh_mark,
    twelfth_mark: selectedStudent.twelfth_mark,
    higher_secondry_group: selectedStudent.higher_secondry_group,
    school: selectedStudent.school,
  });
  console.log(formData);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState({});
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    let currentErrors = {};
    if (currentPage === 1) {
      if (!formData.first_name)
        currentErrors.first_name = "First name is required";
      if (!formData.last_name)
        currentErrors.last_name = "Last name is required";
      if (!formData.date_of_birth)
        currentErrors.date_of_birth = "Date of birth is required";
      if (!formData.adhaar) currentErrors.adhaar = "Adhaar number is required";
      if (!formData.father_name)
        currentErrors.father_name = "Father's name is required";
      if (!formData.mother_name)
        currentErrors.mother_name = "Mother's name is required";
      if (!formData.fathers_occupation)
        currentErrors.fathers_occupation = "Father's occupation is required";
      if (!formData.blood_group)
        currentErrors.blood_group = "Blood Group is required";
    }
    if (currentPage === 2) {
      if (!formData.mobile_number)
        currentErrors.mother_name = "Mobile Number is required";
      else if (!/^\d{10}$/.test(formData.mobile_number))
        currentErrors.mobile_number =
          "Invalid phone number! Must be 10 digits.";
      if (!formData.address) currentErrors.address = "Address is required";
      if (!formData.email) currentErrors.email = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
        currentErrors.email = "Invalid email formate";
    }
    if (currentPage === 3) {
      if (!formData.register_number)
        currentErrors.register_number = "Register number is required";
      else if (formData.register_number.length != 9)
        currentErrors.register_number = "Register number must be 9 letters";

      if (!formData.class) currentErrors.class = "Class is Required";
      if (!formData.tenth_mark)
        currentErrors.tenth_mark = "10th mark is required";
      if (!formData.tenth_mark) {
        currentErrors.tenth_mark = "10th mark is required";
      } else if (isNaN(formData.tenth_mark)) {
        currentErrors.tenth_mark = "Only numbers are allowed for 10th mark";
      }

      if (!formData.eleventh_mark) {
        currentErrors.eleventh_mark = "11th mark is required";
      } else if (isNaN(formData.eleventh_mark)) {
        currentErrors.eleventh_mark = "Only numbers are allowed for 11th mark";
      }

      if (!formData.twelfth_mark) {
        currentErrors.twelfth_mark = "12th mark is required";
      } else if (isNaN(formData.twelfth_mark)) {
        currentErrors.twelfth_mark = "Only numbers are allowed for 12th mark";
      }

      if (!formData.school) {
        currentErrors.school = "School name is required";
      }

      if (!formData.higher_secondry_group)
        currentErrors.higher_secondry_group =
          "Higher Secondry Group is required";
    }

    setError(currentErrors);
    console.log(currentErrors);

    return Object.keys(currentErrors).length === 0;
  };
  const nextPage = () => {
    if (validateForm()) {
      setCurrentPage((prev) => Math.min(prev + 1, 3));
    }else{
         toast.error("An error occurred. Please fix the issue to continue.");
    }
  }; // Move to the next section
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleProfileUpdate(formData); 
       toast.success("Student Data updated successfully");// Call the function to update profile
    }else{
         toast.error("An error occurred. Please fix the issue to continue.");
    }
  };

  return (
    <>
      <div className="selected-student-details-top">
        <div className="back-vanigation">
          <i class="bx bxs-chevron-left" onClick={handleCancel}></i>
          <div>
            <h2>Edit Student Profile</h2>
            <p>View and edit student information</p>
          </div>
        </div>
      </div>{" "}
      <div className="edit-profile-form">
        <form onSubmit={handleSubmit}>
          {currentPage === 1 && (
            <>
              <h3>Personal Information</h3>
                <div className="input-fields">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  {error.first_name && <span>{error.first_name}</span>}
                </div>
                <div className="input-fields">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  {error.last_name && <span>{error.last_name}</span>}
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                  {error.date_of_birth && <span>{error.date_of_birth}</span>}
                </div>

                <div className="input-fields">
                  {" "}
                  <label>Adhaar:</label>
                  <input
                    type="text"
                    name="adhaar"
                    value={formData.adhaar}
                    onChange={handleChange}
                  />
                  {error.adhaar && <span>{error.adhaar}</span>}
                </div>
                <div className="input-fields">
                  <label>Father's Name:</label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                  />
                  {error.father_name && <span>{error.father_name}</span>}
                </div>
                <div className="input-fields">
                  <label>Mother's Name:</label>
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                  />
                  {error.mother_name && <span>{error.mother_name}</span>}
                </div>
                <div className="input-fields">
                  <label>Father's Occupation:</label>
                  <input
                    type="text"
                    name="fathers_occupation"
                    value={formData.fathers_occupation}
                    onChange={handleChange}
                  />
                  {error.fathers_occupation && (
                    <span>{error.fathers_occupation}</span>
                  )}
                </div>
                <div className="input-fields">
                  <label>Blood Group:</label>
                  <input
                    type="text"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                  />
                  {error.blood_group && <span>{error.blood_group}</span>}
                </div>
            </>
          )}

          {/* Contact Info */}
          {currentPage === 2 && (
            <>
              <h3>Contact Information</h3>
                <div className="input-fields">
                  <label>Mobile Number:</label>
                  <input
                    type="text"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />
                  {error.mobile_number && <span>{error.mobile_number}</span>}
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {error.email && <span>{error.email}</span>}
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Address:</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {error.address && <span>{error.address}</span>}
                </div>
            </>
          )}

          {/* Academic Info */}
          {currentPage === 3 && (
            <>
              <h3>Academic Details</h3>
                <div className="input-fields">
                  {" "}
                  <label>Register Number:</label>
                  <input
                    type="text"
                    name="register_number"
                    value={formData.register_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Class:</label>
                  <select
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                  >
                    <option value="first-ug">UG First Year</option>
                    <option value="second-ug">UG Second Year</option>
                    <option value="third-ug">UG Third Year</option>
                    <option value="first-pg">PG First Year</option>
                    <option value="second-pg">PG Second Year</option>
                  </select>
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Department:</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="input-fields">
                  {" "}
                  <label>College:</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Batch (Year of Study):</label>
                  <input
                    type="text"
                    name="year_of_study"
                    value={formData.year_of_study}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="input-fields">
                  <label>10th Mark:</label>
                  <input
                    type="text"
                    name="tenth_mark"
                    value={formData.tenth_mark}
                    onChange={handleChange}
                  />
                  {error.tenth_mark && <span>{error.tenth_mark}</span>}
                </div>
                <div className="input-fields">
                  {" "}
                  <label>11th Mark:</label>
                  <input
                    type="text"
                    name="eleventh_mark"
                    value={formData.eleventh_mark}
                    onChange={handleChange}
                  />
                  {error.eleventh_mark && <span>{error.eleventh_mark}</span>}
                </div>
                <div className="input-fields">
                  <label>12th Mark:</label>
                  <input
                    type="text"
                    name="twelfth_mark"
                    value={formData.twelfth_mark}
                    onChange={handleChange}
                  />
                  {error.twelfth_mark && <span>{error.twelfth_mark}</span>}
                </div>
                <div className="input-fields">
                  <label>Higher Secondary Group:</label>
                  <input
                    type="text"
                    name="higher_secondry_group"
                    value={formData.higher_secondry_group}
                    onChange={handleChange}
                  />
                  {error.higher_secondry_group && (
                    <span>{error.higher_secondry_group}</span>
                  )}
                </div>
                <div className="input-fields">
                  <label>School Name:</label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                  />
                  {error.school && <span>{error.school}</span>}
                </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="form-actions">
            {currentPage > 1 && (
              <button type="button" onClick={prevPage}>
                Prev
              </button>
            )}
            {currentPage < 3 && (
              <button type="button" onClick={nextPage}>
                Next
              </button>
            )}
            {currentPage === 3 && <button type="submit">Save Changes</button>}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudentProfileForm;
