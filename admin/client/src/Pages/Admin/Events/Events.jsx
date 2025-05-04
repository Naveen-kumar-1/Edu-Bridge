import React, { useState } from "react";
import "./Events.css";
import { upComingEvents } from "../../../assets/data";
import CreateNewEvent from "../../../Components/Admin/CreateNewEvent/CreateNewEvent";
import EditEvent from "../../../Components/Admin/EditEvent/EditEvent";
import { toast } from "react-toastify";

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isCreateNewEvent, setIsCreateNewEvent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editEventData, setEditEventData] = useState(null);

  const totalPages = Math.ceil(upComingEvents.length / itemsPerPage);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = upComingEvents.slice(startIndex, endIndex);

  const handleBackToEvents = () => {
    setIsCreateNewEvent(false);
    setIsEdit(false);
    setEditEventData(null);
  };

  const handleEditEvents = (event) => {
    setEditEventData(event);
    setIsEdit(true);
  };
  const handleDeleteEvent =(event_name)=>{
    toast.success("Deleted successfully...!")
  }
  return (
    <div className="ed-events">
      {!isCreateNewEvent && !isEdit && (
        <>
          <div className="ed-event-top-bar">
            <div>
              <h1>Events</h1>
              <p>
                Easily manage and update event information from one place.
                Modify event names, dates, descriptions, and more to keep
                students and staff informed with the latest updates.
              </p>
            </div>
            <div className="create-new-event">
              <button onClick={() => setIsCreateNewEvent(true)}>
                Create New Event
              </button>
            </div>
          </div>

          <div className="ed-events-table">
            <table className="event-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{event.event_name}</td>
                    <td>{event.description}</td>
                    <td>{formatDate(event.date)}</td>
                    <td>
                      <span className="edit-btn">
                        <i
                          className="bx bx-edit"
                          onClick={() => handleEditEvents(event)}
                        ></i>
                      </span>
                      <span className="delete-btn">
                        <i className="bx bx-trash" onClick={()=>handleDeleteEvent(event.event_name)}></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentPage(pageIndex + 1)}
                  className={currentPage === pageIndex + 1 ? "active-page" : ""}
                >
                  {pageIndex + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {isCreateNewEvent && !isEdit && (
        <CreateNewEvent backToEnevts={handleBackToEvents} />
      )}

      {isEdit && editEventData && (
        <EditEvent editData={editEventData} backToEnevts={handleBackToEvents} />
      )}
    </div>
  );
};

export default Events;
