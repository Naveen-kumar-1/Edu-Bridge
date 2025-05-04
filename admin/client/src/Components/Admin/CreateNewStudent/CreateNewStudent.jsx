import React, { useState } from "react";
import "./CreateNewStudent.css";
import { toast } from "react-toastify";
const CreateNewStudent = ({ handleBackToHome }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    adhaar: "",
    father_name: "",
    mother_name: "",
    fathers_occupation: "",
    blood_group: "",
    mobile_number: "",
    email: "",
    address: "",
    class: "",
    year_of_study: "",
    tenth_mark: "",
    eleventh_mark: "",
    twelfth_mark: "",
    higher_secondry_group: "",
    school: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};

    // Personal Information Validation (Page 1)
    if(currentPage === 1){
    if (!formData.first_name) validationErrors.first_name = "First name is required";
    if (!formData.last_name) validationErrors.last_name = "Last name is required";
    if (!formData.date_of_birth) validationErrors.date_of_birth = "Date of birth is required";
    if (!formData.adhaar) validationErrors.adhaar = "Adhaar number is required";
    if (!formData.father_name) validationErrors.father_name = "Father's name is required";
    if (!formData.mother_name) validationErrors.mother_name = "Mother's name is required";
    if (!formData.fathers_occupation) validationErrors.fathers_occupation = "Father's occupation is required";
    if (!formData.blood_group) validationErrors.blood_group = "Blood group is required";
    }
    if(currentPage === 2){
    // Academic Information Validation (Page 2)
    if (!formData.mobile_number) validationErrors.mobile_number = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile_number)) validationErrors.mobile_number = "Invalid mobile number";

    if (!formData.email) validationErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) validationErrors.email = "Invalid email format";

    if (!formData.address) validationErrors.address = "Address is required";
    }
    if(currentPage === 3){
    // Educational Background Validation (Page 3)
    if (!formData.class) validationErrors.class = "Class is required";
    if (!formData.year_of_study) validationErrors.year_of_study = "Year of study is required";

    if (!formData.tenth_mark) validationErrors.tenth_mark = "10th mark is required";
    else if (isNaN(formData.tenth_mark)) validationErrors.tenth_mark = "Must be a number";

    if (!formData.eleventh_mark) validationErrors.eleventh_mark = "11th mark is required";
    else if (isNaN(formData.eleventh_mark)) validationErrors.eleventh_mark = "Must be a number";

    if (!formData.twelfth_mark) validationErrors.twelfth_mark = "12th mark is required";
    else if (isNaN(formData.twelfth_mark)) validationErrors.twelfth_mark = "Must be a number";

    if (!formData.higher_secondry_group) validationErrors.higher_secondry_group = "Higher secondary group is required";
    if (!formData.school) validationErrors.school = "School name is required";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextPage = () => {
    if(validateForm()){
 
      setCurrentPage((prev) => Math.min(prev + 1, 3));
    }else{
         toast.error("An error occurred. Please fix the issue to continue.");
    }
    }
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted Data:", formData);
       toast.success("Student Data Added Successfuly...!");
      setFormData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        adhaar: "",
        father_name: "",
        mother_name: "",
        fathers_occupation: "",
        blood_group: "",
        mobile_number: "",
        email: "",
        address: "",
        class: "",
        year_of_study: "",
        tenth_mark: "",
        eleventh_mark: "",
        twelfth_mark: "",
        higher_secondry_group: "",
        school: ""
      });
    }
    setCurrentPage(1)
  };
  return (
    <div className="create-new-student">
      <div className="create-new-student-top">
        <div className="top-bar-first">
          <i class="bx bxs-chevron-left" onClick={handleBackToHome}></i>
          <div>
            <h2>Create a new student data</h2>
            <p>Create and manage your student data easily</p>
          </div>
        </div>
      </div>
      <div className="create-new-form-box">
        <form action="" onSubmit={handleSubmit}>
          {currentPage === 1 && (
            <>
             <h2>Personal Informations</h2> 
                <div className="input-fields">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="first_name"
                    onChange={handleInputChange}
                  />
                    {errors.first_name && <span className="error">{errors.first_name}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last name"
                    name="last_name"
                    onChange={handleInputChange}
                  />
                    {errors.last_name && <span className="error">{errors.last_name}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Date of birth</label>
                  <input type="date" name="date_of_birth" onChange={handleInputChange} />
                  {errors.date_of_birth && <span className="error">{errors.date_of_birth}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Adhaar Number</label>
                  <input
                    type="text"
                    placeholder="Enter Adhaar Number"
                    name="adhaar"
                    onChange={handleInputChange}
                  />
                    {errors.adhaar && <span className="error">{errors.adhaar}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Fathsr's Name</label>
                  <input
                    type="text"
                    placeholder="Enter father's name"
                    name="father_name"
                    onChange={handleInputChange}
                  />
                    {errors.father_name && <span className="error">{errors.father_name}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Mother's Name</label>
                  <input
                    type="text"
                    placeholder="Enter mother's name"
                    name="mother_name"
                    onChange={handleInputChange}
                  />
                    {errors.mother_name && <span className="error">{errors.mother_name}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Father's Occupation</label>
                  <input
                    type="text"
                    placeholder="Enter father's occupation"
                    name="fathers_occupation"
                    onChange={handleInputChange}
                  />
                    {errors.fathers_occupation && <span className="error">{errors.fathers_occupation}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Blood Group</label>
                  <input
                    type="text"
                    placeholder="Enter your blood group"
                    name="blood_group"
                    onChange={handleInputChange}
                  />
                    {errors.blood_group && <span className="error">{errors.blood_group}</span>}
                </div>
            </>
          )}
          {currentPage === 2 && (
            <>
             <h2> Acadamic Informations</h2>
                <div className="input-fields">
                  <label htmlFor="">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter mobie number"
                    name="mobile_number"
                    onChange={handleInputChange}
                  />
                    {errors.mobile_number && <span className="error">{errors.mobile_number}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder="Enter email" name="email" onChange={handleInputChange}/>
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter the address"
                    name="address"
                    onChange={handleInputChange}
                  />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
            </>
          )}
          {currentPage === 3 && (
            <>
            <h2>Acadamic Information</h2>
                <div className="input-fields">
                  <label htmlFor="">Class </label>
                  <select
                    type="text"
                    name="class"
                    onChange={handleInputChange}
                
                  >
                     <option value="">select class</option>
                    <option value="first-ug">UG First Year</option>
                    <option value="second-ug">UG Second Year</option>
                    <option value="third-ug">UG Third Year</option>
                    <option value="first-pg">PG First Year</option>
                    <option value="second-pg">PG Second Year</option>
                  </select>
                  {errors.class && <span className="error">{errors.class}</span>}
                </div>
                <div className="input-fields">
                  <label htmlFor="">Batch (Year of Study):</label>
                  <input
                    type="text"
                    placeholder="Batch (Year of Study):"
                    name="year_of_study"
                    onChange={handleInputChange}
                  />
                    {errors.year_of_study && <span className="error">{errors.year_of_study}</span>}
                </div>
                <div className="input-fields">
                  <label>10th Mark:</label>
                  <input
                    type="text"
                    name="tenth_mark"
                    placeholder="Enter 10th mark"
                    onChange={handleInputChange}
                  />
                    {errors.tenth_mark && <span className="error">{errors.tenth_mark}</span>}
                </div>
                <div className="input-fields">
                  {" "}
                  <label>11th Mark:</label>
                  <input
                    type="text"
                    name="eleventh_mark"
                    placeholder="Enter 11th Mark"
                    onChange={handleInputChange}
                  />
                    {errors.eleventh_mark && <span className="error">{errors.eleventh_mark}</span>}
                </div>
                <div className="input-fields">
                  <label>12th Mark:</label>
                  <input
                    type="text"
                    name="twelfth_mark"
                    placeholder="Enter 12th mark"
                    onChange={handleInputChange}
                  />
                    {errors.twelfth_mark && <span className="error">{errors.twelfth_mark}</span>}
                </div>
                <div className="input-fields">
                  <label>Higher Secondary Group:</label>
                  <input
                    type="text"
                    name="higher_secondry_group"
                    placeholder="Enter Higher Secondry group"
                    onChange={handleInputChange}
                  />
                    {errors.higher_secondry_group && <span className="error">{errors.higher_secondry_group}</span>}
                </div>
                <div className="input-fields">
                  <label>School Name:</label>
                  <input
                    type="text"
                    name="school"
                    placeholder="Enter school name"
                    onChange={handleInputChange}
                  />
                    {errors.school && <span className="error">{errors.school}</span>}
                </div>
            </>
          )}
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
    </div>
  );
};

export default CreateNewStudent;
