import React, { useState, useEffect } from "react";
import "./Staffs.css";
import { staffsData } from "../../../assets/data";
import CreateNewStaff from "../../../Components/Admin/CreateNewStaff/CreateNewStaff";
import EditStaffProfileForm from "../../../Components/Admin/EditStaffProfileForm/EditStaffProfileForm";
import ViewStaffData from "../../../Components/Admin/ViewStaffData/ViewStaffData";

const Staffs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaffs, setSelectedStaffs] = useState(null);
  const StaffsPerPage = 8;
  const [createNew, setCreateNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Skeleton loading state

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleCreateNew = () => setCreateNew(true);
  const handleBackToHome = () => setCreateNew(false);

  const classes = ["All", ...new Set(staffsData.map((s) => s.class))];

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const filteredStaffs = staffsData.filter((s) =>
    [s.first_name, s.last_name, s.staff_id, s.mobile_number, s.email].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * StaffsPerPage;
  const indexOfFirst = indexOfLast - StaffsPerPage;
  const currentStaffs = filteredStaffs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStaffs.length / StaffsPerPage);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleViewStaffs = (staff) => setSelectedStaffs(staff);
  const handleStaffsProfileEdit = () => setIsEditing(true);
  const handleProfileUpdate = (updated) => {
    console.log("Updated", updated);
    setIsEditing(false);
  };
  const handleCancel = () => setIsEditing(false);

  let serialNumber = indexOfFirst + 1;

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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={handleCreateNew}>
              <i className="bx bx-plus-circle"></i>Add New Staffs
            </button>
          </div>

          <div className="class-navigation">
            <span className="active">All</span>
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
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx}>
                      <td><div className="skeleton-box sm" /></td>
                      <td>
                        <div className="ed-Staffs-line-name">
                          <div className="skeleton-circle" />
                          <div className="skeleton-box" />
                        </div>
                      </td>
                      <td><div className="skeleton-box" /></td>
                      <td><div className="skeleton-box" /></td>
                      <td><div className="skeleton-box" /></td>
                      <td><div className="skeleton-box" /></td>
                      <td><div className="skeleton-box sm" /></td>
                    </tr>
                  ))
                ) : currentStaffs.length > 0 ? (
                  currentStaffs.map((staff, idx) => (
                    <tr key={idx}>
                      <td>{serialNumber++}</td>
                      <td>
                        <div className="ed-Staffs-line-name">
                          <img src={staff.image} alt="" />
                          <span>{staff.first_name + " " + staff.last_name}</span>
                        </div>
                      </td>
                      <td>{staff.staff_id}</td>
                      <td>{staff.designation}</td>
                      <td>{staff.mobile_number}</td>
                      <td>{staff.email}</td>
                      <td>
                        <button onClick={() => handleViewStaffs(staff)}>View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" style={{ textAlign: "center" }}>No Staffs found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}

      {createNew && <CreateNewStaff handleBackToHome={handleBackToHome} />}

      {selectedStaffs && !isEditing && (
  <ViewStaffData
    selectedStaff={selectedStaffs}
    setSelectedStaffs={setSelectedStaffs}
    handleStaffsProfileEdit={handleStaffsProfileEdit}
    formatDate={formatDate}
  />
)}


      {selectedStaffs && isEditing && selectedStaffs.first_name && (
        <EditStaffProfileForm
          selectedStaff={selectedStaffs}
          handleProfileUpdate={handleProfileUpdate}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Staffs;
