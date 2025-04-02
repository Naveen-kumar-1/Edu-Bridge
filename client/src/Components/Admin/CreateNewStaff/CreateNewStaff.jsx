import React, { useState } from "react";
import "./CreateNewStaff.css";
import { toast } from "react-toastify";

const CreateNewStaff = ({ handleBackToHome }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    adhaar: "",
    email: "",
    mobile_number: "",
    address: "",
    designation: "",
    experience: "",
    qualification: "",
    joining_date: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};
    if (currentPage === 1) {
      if (!formData.first_name) validationErrors.first_name = "First name is required";
      if (!formData.last_name) validationErrors.last_name = "Last name is required";
      if (!formData.date_of_birth) validationErrors.date_of_birth = "Date of birth is required";
      if (!formData.adhaar) validationErrors.adhaar = "Aadhaar number is required";
    }
    if (currentPage === 2) {
      if (!formData.email) validationErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) validationErrors.email = "Invalid email format";
      
      if (!formData.mobile_number) validationErrors.mobile_number = "Mobile number is required";
      else if (!/^\d{10}$/.test(formData.mobile_number)) validationErrors.mobile_number = "Invalid mobile number";
      
      if (!formData.address) validationErrors.address = "Address is required";
    }
    if (currentPage === 3) {
      if (!formData.designation) validationErrors.designation = "Designation is required";
      if (!formData.qualification) validationErrors.qualification = "Qualification is required";
      if (!formData.joining_date) validationErrors.joining_date = "Joining date is required";
    }
    console.log(validationErrors);
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextPage = () => {
    if (validateForm()) {
      setCurrentPage((prev) => Math.min(prev + 1, 3));
    } else {
      toast.error("Please fix the errors to continue.");
    }
  };

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (validateForm()) {

      console.log("Submitted Data:", formData);
      toast.success("Staff Data Added Successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        adhaar: "",
        email: "",
        mobile_number: "",
        address: "",
        designation: "",
        experience: "",
        qualification: "",
        joining_date: ""
      });
      setCurrentPage(1);
    }
  };

  return (
    <div className="create-new-staff">
      <div className="create-new-staff-top">
        <div className="top-bar-first">
          <i className="bx bxs-chevron-left" onClick={handleBackToHome}></i>
          <div>
            <h2>Create a new staff data</h2>
            <p>Create and manage your staff data easily</p>
          </div>
        </div>
      </div>
      <div className="create-new-form-box">
        <form onSubmit={handleSubmit}>
          {currentPage === 1 && (
            <>
              <h2>Personal Information</h2>
              <div className="form-section">
                {['first_name', 'last_name', 'date_of_birth', 'adhaar'].map((field) => (

                  <div className="input-fields" key={field}>
                    <label htmlFor="">{field}</label>
                    <input type={field === 'date_of_birth' ? 'date' : 'text'} name={field} placeholder={field.replace('_', ' ')} onChange={handleInputChange} />
                    {errors[field] && <p className="error-message">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          {currentPage === 2 && (
            <>
              <h2>Contact Information</h2>
              <div className="form-section">
                {['email', 'mobile_number', 'address'].map((field) => (
                  <div className="input-fields" key={field}>
                    <label htmlFor="">{field}</label>
                    <input type={field === 'email' ? 'email' : 'text'} name={field} placeholder={field.replace('_', ' ')} onChange={handleInputChange} />
                    {errors[field] && <p className="error-message">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          {currentPage === 3 && (
            <>
              <h2>Professional Information</h2>
              <div className="form-section">
                {[ 'designation', 'experience (If Not set it as a Fresher)', 'qualification', 'joining_date'].map((field) => (
                  <div className="input-fields" key={field}>
                    <label>{field}</label>
                    <input type={field === 'joining_date' ? 'date' : 'text'} name={field} placeholder={field.replace('_', ' ')} onChange={handleInputChange} />
                    {errors[field] && <p className="error-message">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="form-actions">
            {currentPage > 1 && <button type="button" onClick={prevPage}>Prev</button>}
            {currentPage < 3 && <button type="button" onClick={nextPage}>Next</button>}
            {currentPage === 3 && <button type="submit">Save Changes</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewStaff;