import React, { useEffect, useState } from 'react';
import './ViewStaffData.css';

const ViewStaffData = ({
  selectedStaff,
  setSelectedStaffs,
  handleStaffsProfileEdit,
  formatDate
}) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [selectedStaff]);

  const renderInfo = (label, value) => (
    <div className="infos">
      {loading ? <div className="skeleton-box sm" /> : <span>{label}:</span>}
      <p>{loading ? <div className="skeleton-box sm" /> : value || 'N/A'}</p>
    </div>
  );

  const formatLabel = (field) =>
    field.replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="selected-Staffs-details">
      <div className="selected-Staffs-details-top">
        <div className="back-vanigation">
          <i className="bx bxs-chevron-left" onClick={() => setSelectedStaffs(null)}></i>
          <div>
            <h2>Staffs Profile</h2>
            <p>View and manage Staffs information</p>
          </div>
        </div>
        <button onClick={handleStaffsProfileEdit}>Edit Profile</button>
      </div>

      <div className="Staffs-profile">
        {loading ? (
          <>
            <div className="skeleton-circle lg" />
            <div className="selected-Staffs-name">
              <div className="skeleton-box md" style={{ width: '60%' }} />
              <div className="skeleton-box sm" style={{ width: '40%' }} />
              <div className="selected-Staffs-course">
                <div className="skeleton-box xs" />
                <div className="skeleton-box xs" />
                <div className="skeleton-box xs" />
              </div>
            </div>
          </>
        ) : (
          <>
            <img src={selectedStaff?.image} alt="Staff" />
            <div className="selected-Staffs-name">
              <h2>{selectedStaff?.first_name + ' ' + selectedStaff?.last_name}</h2>
              <p>Staffs ID : {selectedStaff?.staff_id}</p>
              <div className="selected-Staffs-course">
                <span>{selectedStaff?.department}</span>
                <span>{selectedStaff?.designation}</span>
                <span>{selectedStaff?.gender}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="Staffs-personal-contact-acedamic">
        <div className="personal-and-contact">
          <div className="Staffs-personal-details">
            <h3>Personal Information</h3>
            <div className="informations">
              {["date_of_birth", "adhaar", "gender"].map((field, i) =>
                renderInfo(formatLabel(field), selectedStaff?.[field])
              )}
            </div>
          </div>

          <div className="Staffs-contact-details">
            <h3>Contact Information</h3>
            <div className="informations">
              {["mobile_number", "email", "address"].map((field, i) =>
                renderInfo(formatLabel(field), selectedStaff?.[field])
              )}
            </div>
          </div>
        </div>

        <div className="Staffs-acedamic-details">
          <h3>Academic Details</h3>
          <div className="informations">
            {renderInfo("Staff ID", selectedStaff?.staff_id)}
            {renderInfo("Class", selectedStaff?.class || "N/A")}
            {renderInfo("College Name", selectedStaff?.college)}
            {renderInfo(
              "Joining Date",
              selectedStaff?.date_of_joining ? formatDate(selectedStaff?.date_of_joining) : ""
            )}
            {renderInfo("Qualification", selectedStaff?.qualication)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffData;
