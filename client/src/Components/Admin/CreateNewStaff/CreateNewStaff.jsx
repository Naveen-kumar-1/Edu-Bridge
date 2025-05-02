import React, { useState } from "react";
import "./CreateNewStaff.css";
import { toast } from "react-toastify";

const CreateNewStaff = ({ handleBackToHome }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender:'',
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
      if(!formData.gender)validationErrors.gender = "Gender is required";
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
        joining_date: "",
        gender:""
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

                  <div className="input-fields">
                    <label htmlFor="">First Name</label>
                    <input type='text' name='first_name' placeholder='Enter first name' onChange={handleInputChange} />
                    {errors.first_name && <p className="error-message">{errors.first_name}</p>}
                  </div>
                   <div className="input-fields">
                   <label htmlFor="">Last Name</label>
                   <input type='text' name='last_name' placeholder='Enter last name' onChange={handleInputChange} />
                   {errors.last_name && <p className="error-message">{errors.last_name}</p>}
                 </div>
                 <div className="input-fields">
                  <label htmlFor="">Gender </label>
                  <select
                    type="text"
                    name="gender"
                    onChange={handleInputChange}
                
                  >
                     <option value="">select class</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.gender && <span className="error">{errors.gender}</span>}
                </div>
                 
                  <div className="input-fields">
                  <label htmlFor="">Date of birth</label>
                  <input type='date' name='date_of_birth'  onChange={handleInputChange} />
                  {errors.date_of_birth && <p className="error-message">{errors.date_of_birth}</p>}
                </div>
                 <div className="input-fields">
                 <label htmlFor="">Adhaar </label>
                 <input type='text' name='adhaar' placeholder='Enter adhaar number' onChange={handleInputChange} />
                 {errors.adhaar && <p className="error-message">{errors.adhaar}</p>}
               </div>

              </div>
            </>
          )}

          {currentPage === 2 && (
            <>
              <h2>Contact Information</h2>
              <div className="form-section">
                  <div className="input-fields" >
                    <label htmlFor="">Email</label>
                    <input type='email' name='email' placeholder='Enter email' onChange={handleInputChange} />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                  </div>
                   <div className="input-fields" >
                   <label htmlFor="">Mobile number</label>
                   <input type='text' name='mobile_number' placeholder='Enter mobile number' onChange={handleInputChange} />
                   {errors.mobile_number && <p className="error-message">{errors.mobile_number}</p>}
                 </div>
                  <div className="input-fields" >
                  <label htmlFor="">Address</label>
                  <input type='text' name='address' placeholder='Enter address' onChange={handleInputChange} />
                  {errors.address && <p className="error-message">{errors.address}</p>}
                </div>
              </div>
            </>
          )}

          {currentPage === 3 && (
            <>
              <h2>Professional Information</h2>
              <div className="form-section">
                  <div className="input-fields" >
                    <label>Designation</label>
                    <input type='text' name='designation' placeholder='Enter Degigination' onChange={handleInputChange} />
                    {errors.designation && <p className="error-message">{errors.designation}</p>}
                  </div>
                   <div className="input-fields"  >
                   <label>Experience (If not set it as a Fresher)</label>
                   <input type='text' name='experience' placeholder='Enter Expreince' onChange={handleInputChange} />
                   {errors.experience && <p className="error-message">{errors.experience}</p>}
                 </div>
                  <div className="input-fields"  >
                  <label>Qualification</label>
                  <input type='text' name='qualification' placeholder='Enter Qualification' onChange={handleInputChange} />
                  {errors.qualification && <p className="error-message">{errors.qualification}</p>}
                </div>
                <div className="input-fields"  >
                <label>Join Date</label>
                <input type='date' name='joining_date'  onChange={handleInputChange} />
                {errors.joining_date && <p className="error-message">{errors.joining_date}</p>}
              </div>
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