import React, { useState } from "react";
import "./Staffs.css";
import { staffsData } from "../../../assets/data";
import CreateNewStaff from "../../../Components/Admin/CreateNewStaff/CreateNewStaff";
// import EditProfileForm from "../../../Components/Admin/EditStaffsProfileForm/EditStaffsProfileForm";
// import CreateNewStaffs from "../../../Components/Admin/CreateNewStaffs/CreateNewStaffs";

const Staffs = () => {
  
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedStaffs, setSelectedStaffs] = useState(null); // State to store the selected Staffs
  const StaffsPerPage = 8; // Number of Staffs per page
  const [createNew, setCreateNew] = useState(false);
  const handleCreateNew = () => {
    setCreateNew(true);
  };

  // Get unique classes from Staffs data
  const classes = [
    "All",
    ...new Set(staffsData.map((Staffs) => Staffs.class)),
  ];
  const formatDate = (timestamp) => {
    if (!timestamp) return ""; // Handle null/undefined cases

    const date = new Date(timestamp * 1000); // Convert to milliseconds by multiplying by 1000
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

  // Filter Staffs based on search term and selected class
  const filteredStaffs = staffsData.filter((Staffs) => {
    const matchesSearchTerm =
      Staffs.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Staffs.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Staffs.staff_id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      Staffs.mobile_number.includes(searchTerm) ||
      Staffs.email.toLowerCase().includes(searchTerm.toLowerCase());



    return matchesSearchTerm;
  });

  // Calculate the starting and ending indices for slicing the filteredStaffs array
  const indexOfLastStaffs = currentPage * StaffsPerPage;
  const indexOfFirstStaffs = indexOfLastStaffs - StaffsPerPage;
  const currentStaffs = filteredStaffs.slice(
    indexOfFirstStaffs,
    indexOfLastStaffs
  ); // Get current page Staffs

  // Calculate total pages based on filtered Staffs
  const totalPages = Math.ceil(filteredStaffs.length / StaffsPerPage);

  // Function to handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

 

  // Function to handle Staffs selection for viewing details
  const handleViewStaffs = (Staffs) => {
    setSelectedStaffs(Staffs); // Set the selected Staffs
  };

  let serialNumber = indexOfFirstStaffs + 1; // Adjust the serial number
  // handleStaffsProfileEdit
  const [isEditing, setIsEditing] = useState(false);

  const handleStaffsProfileEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleProfileUpdate = (updatedstaffsData) => {
    // Logic to update the Staffs profile goes here
    // For example, updating the Staffs data in the state or making an API call
    console.log("Updated Data: ", updatedstaffsData);
    setIsEditing(false); // Disable edit mode after saving changes
  };

  const handleCancel = () => {
    setIsEditing(false); // Disable edit mode without saving changes
  };
  const handleBackToHome =()=>{
    setCreateNew(false)
  }
 
  return (
    <div className="ed-admin-Staffs">
      {!selectedStaffs && !createNew && (
        <>
          <div className="ed-admin-Staffs-top">
            <div>
              <h1>Manage Staffs Data</h1>
              <input
                type="text"
                placeholder="Search Staffs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </div>
            <button onClick={handleCreateNew}>
              <i className="bx bx-plus-circle"></i>Add New Staffs
            </button>
          </div>
          
          {/* Class navigation */}
          <div className="class-navigation">
              <span
                className='active'
              >
                All
              </span>
          </div>

          <div className="ed-Staffs-table-container">
            <table className="ed-Staffs-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Staffs Name</th>
                  <th>Staff ID</th>
                  <th>Desigination</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {currentStaffs.length > 0 ? (
                  currentStaffs.map((Staffs, index) => (
                    <tr key={index}>
                      <td>{serialNumber++}</td>
                      <td>
                        <div className="ed-Staffs-line-name">
                          <img src={Staffs.image} alt="" />
                          <span>
                            {Staffs.first_name + " " + Staffs.last_name}
                          </span>
                        </div>
                      </td>
                      <td>{Staffs.staff_id}</td>
                      <td>{Staffs.designation}</td>
                      <td>{Staffs.mobile_number}</td>
                      <td>{Staffs.email}</td>
                      <td>
                        <button onClick={() => handleViewStaffs(Staffs)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No Staffs found
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
             <CreateNewStaff handleBackToHome={handleBackToHome}/>
            </>
          )}
      {selectedStaffs && !isEditing && (
        <div className="selected-Staffs-details">
          <div className="selected-Staffs-details-top">
            <div className="back-vanigation">
              <i
                class="bx bxs-chevron-left"
                onClick={() => setSelectedStaffs(null)}
              ></i>
              <div>
                <h2>Staffs Profile</h2>
                <p>View and manage Staffs information</p>
              </div>
            </div>
            <button onClick={handleStaffsProfileEdit}>Edit Profile</button>
          </div>
          <div className="Staffs-profile">
            <img src={selectedStaffs.image} alt="" />
            <div className="selected-Staffs-name">
              <h2>
                {selectedStaffs.first_name + " " + selectedStaffs.last_name}
              </h2>
              <p>Staffs ID : {selectedStaffs.staff_id}</p>
              <div className="selected-Staffs-course">
                <span>{selectedStaffs.department}</span>
                <span>{selectedStaffs.designation}</span>
                <span>{selectedStaffs.gender}</span>
              </div>
            </div>
          </div>
          <div className="Staffs-personal-contact-acedamic">
            <div className="personal-and-contact">
              <div className="Staffs-personal-details">
                <h3>Personal Information</h3>
                <div className="informations">
                  <div className="infos">
                    <span>Date of Birth :</span>{" "}
                    <p>{formatDate(selectedStaffs.date_of_birth)}</p>{" "}
                  </div>

                  <div className="infos">
                    <span>Adhaar :</span> <p>{selectedStaffs.adhaar}</p>
                  </div>
                  <div className="infos">
                    <span>Father's Name :</span>{" "}
                    <p>{selectedStaffs.father_name}</p>
                  </div>
                  <div className="infos">
                    <span>Mother's Name :</span>{" "}
                    <p>{selectedStaffs.mother_name}</p>
                  </div>
                  <div className="infos">
                    <span>Father's Occupation :</span>{" "}
                    <p>{selectedStaffs.fathers_occupation}</p>
                  </div>
                  <div className="infos">
                    <span>Blood :</span> <p>{selectedStaffs.blood_group}</p>
                  </div>
                </div>
              </div>
              <div className="Staffs-contact-details">
                <h3>Contact Information</h3>
                <div className="informations">
                  <div className="infos">
                    <span>Mobile Number :</span>{" "}
                    <p>{selectedStaffs.mobile_number}</p>{" "}
                  </div>
                  <div className="infos">
                    <span>Email :</span> <p>{selectedStaffs.email}</p>
                  </div>
                  <div className="infos">
                    <span>Address :</span> <p>{selectedStaffs.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="Staffs-acedamic-details">
              <h3>Academic Details</h3>
              <div className="informations">
                <div className="infos">
                  <span>Staff ID :</span>{" "}
                  <p>{selectedStaffs.staff_id}</p>{" "}
                </div>
                <div className="infos">
                  <span>Class :(If class adviser)</span> <p>{selectedStaffs.class?? 'N/A'}</p>
                </div>
                <div className="infos">
                  <span>College name :</span> <p>{selectedStaffs.college }</p>
                </div>
                <div className="infos">
                  <span>Joining Data :</span> <p>{selectedStaffs.joining_date}</p>
                </div>
                <div className="infos">
                  <span>Qualication :</span> <p>{selectedStaffs.qualication}</p>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedStaffs && isEditing && (
        <>
          <EditProfileForm
            selectedStaffs={selectedStaffs}
            handleProfileUpdate={handleProfileUpdate}
            handleCancel={handleCancel}
          />
        </>
      )}
    </div>
  );
};

export default Staffs;
