import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default CSS for skeleton
import './ViewStudentData.css'
const ViewStudentData = ({ selectedStudent, setSelectedStudent, handleStudentProfileEdit, formatDate }) => {
  if (!selectedStudent && isLoading) {
    return (
      <div className="skeleton-loader">
        <Skeleton circle={true} height={100} width={100} />
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
        <Skeleton height={15} width="60%" />
        <Skeleton height={15} width="60%" />
      </div>
    );
  }

  if (!selectedStudent) return null;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
        setTimeout(()=>{
                setIsLoading(false)
        },2000)
  },[])
  return (
    <div className="selected-student-details">
      <div className="selected-student-details-top">
        <div className="back-vanigation">
          <i
            className="bx bxs-chevron-left"
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
        {isLoading ? (
          <Skeleton circle={true} height={100} width={100} />
        ) : (
          <img src={selectedStudent.image} alt="student" />
        )}
         <div className="selected-student-name">
      {isLoading ? (
        // Skeleton loader for the name section
        <>
          <Skeleton width={200} height={30} />
          <Skeleton width={150} height={20} />
          <div className="selected-student-skeleton-course">
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
          </div>
        </>
      ) : (
        <>
          <h2>{selectedStudent.first_name + " " + selectedStudent.last_name}</h2>
          <p>Student ID: {selectedStudent.register_number}</p>
          <div className="selected-student-course">
            <span>{selectedStudent.department}</span>
            <span>{selectedStudent.class}</span>
            <span>{selectedStudent.gender}</span>
          </div>
        </>
      )}
    </div>
      </div>

      <div className="student-personal-contact-acedamic">
        <div className="personal-and-contact">
          <div className="student-personal-details">
            <h3>Personal Information</h3>
            <div className="informations">
              {isLoading ? (
                <>
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="80%" />
                </>
              ) : (
                <>
                  <div className="infos">
                    <span>Date of Birth :</span>
                    <p>{formatDate(selectedStudent.date_of_birth)}</p>
                  </div>
                  <div className="infos">
                    <span>Aadhaar :</span>
                    <p>{selectedStudent.adhaar}</p>
                  </div>
                  <div className="infos">
                    <span>Father's Name :</span>
                    <p>{selectedStudent.father_name}</p>
                  </div>
                  <div className="infos">
                    <span>Mother's Name :</span>
                    <p>{selectedStudent.mother_name}</p>
                  </div>
                  <div className="infos">
                    <span>Father's Occupation :</span>
                    <p>{selectedStudent.fathers_occupation}</p>
                  </div>
                  <div className="infos">
                    <span>Blood Group :</span>
                    <p>{selectedStudent.blood_group}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="student-contact-details">
            <h3>Contact Information</h3>
            <div className="informations">
              {isLoading ? (
                <>
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="80%" />
                </>
              ) : (
                <>
                  <div className="infos">
                    <span>Mobile Number :</span>
                    <p>{selectedStudent.mobile_number}</p>
                  </div>
                  <div className="infos">
                    <span>Email :</span>
                    <p>{selectedStudent.email}</p>
                  </div>
                  <div className="infos">
                    <span>Address :</span>
                    <p>{selectedStudent.address}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="student-acedamic-details">
          <h3>Academic Details</h3>
          <div className="informations">
            {isLoading ? (
              <>
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="80%" />
              </>
            ) : (
              <>
                <div className="infos">
                  <span>Register Number :</span>
                  <p>{selectedStudent.register_number}</p>
                </div>
                <div className="infos">
                  <span>Class :</span>
                  <p>{selectedStudent.class}</p>
                </div>
                <div className="infos">
                  <span>College Name :</span>
                  <p>{selectedStudent.college}</p>
                </div>
                <div className="infos">
                  <span>Batch :</span>
                  <p>{selectedStudent.year_of_study}</p>
                </div>
                <div className="infos">
                  <span>10th Mark :</span>
                  <p>{selectedStudent.tenth_mark}</p>
                </div>
                <div className="infos">
                  <span>11th Mark :</span>
                  <p>{selectedStudent.eleventh_mark}</p>
                </div>
                <div className="infos">
                  <span>12th Mark :</span>
                  <p>{selectedStudent.twelfth_mark}</p>
                </div>
                <div className="infos">
                  <span>Higher Secondary Group :</span>
                  <p>{selectedStudent.higher_secondry_group}</p>
                </div>
                <div className="infos">
                  <span>School Name :</span>
                  <p>{selectedStudent.school}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentData;
