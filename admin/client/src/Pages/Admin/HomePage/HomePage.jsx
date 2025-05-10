import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { NavLink } from "react-router-dom";
import { studentsData, staffsData, upComingEvents } from "../../../assets/data";
import adminImage from '../../../assets/background.jpg'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const totalStudents = studentsData.length;
  const activeStudents = studentsData.filter(
    (student) => student.is_logged_in?.login === true
  ).length;
  const totalEvents = upComingEvents.length;
  let serialNumber = 1;

  const [dashboardActivePage, setDashboardActivePage] = useState("overview");

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [dashboardActivePage]);

  const handlePageChange = (page) => {
    setIsLoading(true);
    setDashboardActivePage(page);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const companyData = localStorage.getItem('registeredDepartmentData');
  console.log(companyData);
  
  // Skeleton Loader Components
  const BoxSkeleton = () => (
    <div className="ed-dashboard-box skeleton">
      <div className="box-content-title skeleton">
        <span className="skeleton-text"></span>
        <i className="bx skeleton-icon"></i>
      </div>
      <div>
        <h2 className="skeleton-text"></h2>
      </div>
    </div>
  );

  const TableRowSkeleton = ({ cols }) => (
    <tr>
      {Array(cols).fill().map((_, i) => (
        <td key={i}><div className="skeleton-text"></div></td>
      ))}
    </tr>
  );

  const RecentStudentRowSkeleton = () => (
    <tr>
      <td><div className="skeleton-text"></div></td>
      <td><div className="skeleton-text"></div></td>
      <td><div className="skeleton-text"></div></td>
      <td><div className="skeleton-text"></div></td>
    </tr>
  );

  const EventItemSkeleton = () => (
    <li className="skeleton-event">
      <span className="event-icon skeleton">
        <i className="bx bx-calendar skeleton-icon"></i>
      </span>
      <div className="event-details skeleton">
        <h3 className="skeleton-text"></h3>
        <p className="skeleton-text"></p>
      </div>
    </li>
  );

  return (
    <div className="ed-dashboard-home">
      <div className="ed-dashboard-top">
        <div className="ed-dashboard-top-right">
          <h1>Dashboard</h1>
          <ul className="ed-top-nav">
            <li
              onClick={() => handlePageChange("overview")}
              className={`ed-top-navlink ${
                dashboardActivePage === "overview" ? "active" : ""
              }`}
            >
              Overview
            </li>
            <li
              onClick={() => handlePageChange("students")}
              className={`ed-top-navlink ${
                dashboardActivePage === "students" ? "active" : ""
              }`}
            >
              Students
            </li>
            <li
              onClick={() => handlePageChange("staffs")}
              className={`ed-top-navlink ${
                dashboardActivePage === "staffs" ? "active" : ""
              }`}
            >
              Staffs
            </li>
            <li
              onClick={() => handlePageChange("events")}
              className={`ed-top-navlink ${
                dashboardActivePage === "events" ? "active" : ""
              }`}
            >
              Events
            </li>
          </ul>
        </div>
        <div className="ed-dashboard-top-left">
          <div>
            <span>Computer Science</span>
            <p>Dr.S.Rizwana</p>
          </div>
          <img src={adminImage} alt="" />
        </div>
      </div>

      {/* Little overview section */}
      {dashboardActivePage === "overview" && (
        <>
          <div className="ed-dashboard-all-data-list-top">
            <h2>Overview</h2>
          </div>
          <div className="ed-dashboard-boxes">
            {isLoading ? (
              <>
                <BoxSkeleton />
                <BoxSkeleton />
                <BoxSkeleton />
                <BoxSkeleton />
              </>
            ) : (
              <>
                <div className="ed-dashboard-box">
                  <div className="box-content-title">
                    <span>Total students</span>
                    <i className="bx bxs-graduation"></i>
                  </div>
                  <div>
                    <h2>{totalStudents}</h2>
                  </div>
                </div>
                <div className="ed-dashboard-box">
                  <div className="box-content-title">
                    <span>Total Staffs</span>
                    <i className="bx bx-user"></i>
                  </div>
                  <div>
                    <h2>12</h2>
                  </div>
                </div>
                <div className="ed-dashboard-box">
                  <div className="box-content-title">
                    Events<i className="bx bx-calendar"></i>
                  </div>
                  <div>
                    <h2>{totalEvents}</h2>
                  </div>
                </div>
                <div className="ed-dashboard-box">
                  <div className="box-content-title">
                    Active Users<i className="bx bx-user-check"></i>
                  </div>
                  <div>
                    <h2>{activeStudents}</h2>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Recently loggedin students list and events list */}
          <div className="recent-upcoming-container">
            <div className="recent-students-box">
              <div className="recent-header">
                <h2>Recent Students</h2>
                <p>Recently added students to the platform</p>
              </div>
              <table className="recent-students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Department</th>
                    <th>Login date</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <>
                      <RecentStudentRowSkeleton />
                      <RecentStudentRowSkeleton />
                      <RecentStudentRowSkeleton />
                      <RecentStudentRowSkeleton />
                      <RecentStudentRowSkeleton />
                    </>
                  ) : (
                    studentsData
                      .filter((student) => student.is_logged_in?.login === true)
                      .sort(
                        (a, b) =>
                          b.is_logged_in.login_date - a.is_logged_in.login_date
                      )
                      .slice(0, 5)
                      .map((students, index) => {
                        const loginDate = new Date(
                          students.is_logged_in?.login_date * 1000
                        ).toLocaleString();

                        return (
                          <tr key={index}>
                            <td>
                              {students.first_name + " " + students.last_name}
                            </td>
                            <td>{students.register_number}</td>
                            <td>{students.class}</td>
                            <td>
                              <span className="status active">{loginDate}</span>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
              <div className="view-all-button">
                <NavLink className="view-all-btn" to="/dashboard/students/">
                  <i className="bx bxs-graduation"></i>View All Students
                </NavLink>
              </div>
            </div>

            <div className="upcoming-events-box">
              <div className="upcoming-header">
                <h2>Upcoming Events</h2>
                <p>Events scheduled for the next 30 days</p>
              </div>
              <ul className="upcoming-events-list">
                {isLoading ? (
                  <>
                    <EventItemSkeleton />
                    <EventItemSkeleton />
                    <EventItemSkeleton />
                    <EventItemSkeleton />
                    <EventItemSkeleton />
                  </>
                ) : (
                  upComingEvents
                    .filter((event) => {
                      const eventDate = new Date(event.date);
                      const today = new Date();
                      return eventDate >= today;
                    })
                    .slice(0, 5)
                    .map((event, index) => (
                      <li key={index}>
                        <span className="event-icon">
                          <i className="bx bx-calendar"></i>
                        </span>
                        <div className="event-details">
                          <h3>{event.event_name}</h3>
                          <p>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}{" "}
                            •{" "}
                            {new Date(event.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </li>
                    ))
                )}
              </ul>

              <div className="view-all-button">
                <NavLink to="/dashboard/events/" className="view-all-btn">
                  <i className="bx bx-calendar"></i>View All Events
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}

      {dashboardActivePage === "students" && (
        <>
          <div className="ed-dashboard-all-data-list">
            <div className="ed-dashboard-all-data-list-top">
              <h2>Students</h2>
            </div>
            <table className="ed-dashboard-all-data-list-table">
              <thead>
                <tr>
                  <th>s.no</th>
                  <th>Name</th>
                  <th>register number</th>
                  <th>class</th>
                  <th>Mobile</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                  </>
                ) : (
                  studentsData.slice(0, 8).map((students, index) => {
                    return (
                      <tr key={index}>
                        <td>{serialNumber++}</td>
                        <td>
                          <img src={students.image} alt="" />
                          <span>
                            {students.first_name + " " + students.last_name}
                          </span>
                        </td>
                        <td>{students.register_number}</td>
                        <td>{students.class}</td>
                        <td>{students.mobile_number}</td>
                        <td>{students.email}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div className="ed-dashboard-view-all-button">
              <div className="view-all-button">
                <NavLink className="view-all-btn" to="/dashboard/students/">
                  <i className="bx bxs-graduation"></i>View All Students
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}

      {dashboardActivePage === "staffs" && (
        <>
          <div className="ed-dashboard-all-data-list">
            <div className="ed-dashboard-all-data-list-top">
              <h2>Staffs</h2>
            </div>
            <table className="ed-dashboard-all-data-list-table">
              <thead>
                <tr>
                  <th>s.no</th>
                  <th>Name</th>
                  <th>staff id</th>
                  <th>designation</th>
                  <th>Mobile</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                    <TableRowSkeleton cols={6} />
                  </>
                ) : (
                  staffsData.slice(0, 8).map((staffs, index) => {
                    return (
                      <tr key={index}>
                        <td>{serialNumber++}</td>
                        <td>
                          <img src={staffs.image} alt="" />
                          <span>
                            {staffs.first_name + " " + staffs.last_name}
                          </span>
                        </td>
                        <td>{staffs.staff_id}</td>
                        <td>{staffs.designation}</td>
                        <td>{staffs.mobile_number}</td>
                        <td>{staffs.email}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div className="ed-dashboard-view-all-button">
              <div className="view-all-button">
                <NavLink className="view-all-btn" to="/dashboard/staffs/">
                  <i className="bx bx-user"></i>View All Staffs
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}

      {dashboardActivePage === "events" && (
        <>
          <div className="ed-dashboard-all-data-list">
            <div className="ed-dashboard-all-data-list-top">
              <h2>Events</h2>
            </div>
            <table className="ed-dashboard-all-data-list-table">
              <thead>
                <tr>
                  <th>s.no</th>
                  <th>Event Name</th>
                  <th>Event Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                    <TableRowSkeleton cols={3} />
                  </>
                ) : (
                  upComingEvents
                    .slice(0, 10)
                    .map((events, index) => {
                      return (
                        <tr key={index}>
                          <td>{serialNumber++}</td>
                          <td>{events.event_name}</td>
                          <td>
                            {formatDate(events.date)}
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <div className="ed-dashboard-view-all-button">
              <div className="view-all-button">
                <NavLink className="view-all-btn" to="/dashboard/events/">
                  <i className="bx bx-calendar"></i>View All Events
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;