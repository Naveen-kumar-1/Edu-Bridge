import React, { useState } from "react";
import "./EditStaffProfileForm.css";
import { toast } from "react-toastify";
const EditStaffProfileForm = ({
  selectedStaff,
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

  // Initialize form values based on selectedStaff
  const [formData, setFormData] = useState({
    first_name: selectedStaff.first_name,
    last_name: selectedStaff.last_name,
    staff_id: selectedStaff.staff_id,
    class: selectedStaff.class,
    gender: selectedStaff.gender,
    date_of_birth: formatDate(selectedStaff.date_of_birth),
    adhaar: selectedStaff.adhaar,
    mobile_number: selectedStaff.mobile_number,
    email: selectedStaff.email,
    address: selectedStaff.address,
    date_of_joining:formatDate(selectedStaff.date_of_joining),
    qualification:selectedStaff.qualification
  });
  
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
      if(!formData.gender)currentErrors.gender = "Gender is required"
      
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
      if (!formData.staff_id)
        currentErrors.staff_id = "Register number is required";
      else if (formData.staff_id.length != 9)
        currentErrors.staff_id = "Register number must be 9 letters";

      if (!formData.class) currentErrors.class = "Class is Required";
      if (!formData.date_of_joining)
        currentErrors.date_of_joining = "Date of joining is required";
      if (!formData.qualification) {
        currentErrors.qualification = "Qualification is required";
      } 

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
       toast.success("staff Data updated successfully");// Call the function to update profile
    }else{
         toast.error("An error occurred. Please fix the issue to continue.");
    }
  };

  return (
    <>
      <div className="selected-staff-details-top">
        <div className="back-vanigation">
          <i class="bx bxs-chevron-left" onClick={handleCancel}></i>
          <div>
            <h2>Edit staff Profile</h2>
            <p>View and edit staff information</p>
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
                  <label htmlFor="">Gender </label>
                  <select
                    type="text"
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}

                
                  >
                     <option value="">select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  {error.gender && <span className="error">{error.gender}</span>}
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
                  <label>Staff Number:</label>
                  <input
                    type="text"
                    name="staff_id"
                    value={formData.staff_id}
                    onChange={handleChange}
                  />
                  {error.staff_id && (<span>{error.staff_id}</span>)}
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
                    <option>Select Class</option>
                    <option value="no-class-teacher">Not Applicable</option>
                    <option value="first-ug">UG First Year</option>
                    <option value="second-ug">UG Second Year</option>
                    <option value="third-ug">UG Third Year</option>
                    <option value="first-pg">PG First Year</option>
                    <option value="second-pg">PG Second Year</option>
                  </select>
                  {error.class && (<span>{error.class}</span>)}
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Joining Date:</label>
                  <input
                    type="date"
                    name="date_of_joining"
                    value={formData.date_of_joining}
                    onChange={handleChange}

                  />
                  {error.date_of_joining && (<span>{error.date_of_joining}</span>)}
                </div>
                <div className="input-fields">
                  {" "}
                  <label>Qualification:</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    
                  />
                  {error.qualification && (<span>{error.qualification}</span>)}
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

export default EditStaffProfileForm;
