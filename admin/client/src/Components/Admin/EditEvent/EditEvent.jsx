import React, { useState, useEffect, useRef } from "react";
import "./EditEvent.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEvent = ({ backToEnevts, editData }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  // Initialize with edit data if present
  useEffect(() => {
    if (editData) {
      setEventData({
        event_name: editData.event_name || "",
        description: editData.description || "",
        date: editData.date
          ? new Date(editData.date * 1000).toISOString().split("T")[0]
          : "",
      });
    }
  }, [editData]);

  // Setup Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write event description...",
      });

      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;
        setEventData((prev) => ({ ...prev, description: html }));
      });
    }

    // Set Quill content if editing
    if (quillRef.current && editData?.description) {
      quillRef.current.root.innerHTML = editData.description;
    }
  }, [editData]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const currentErrors = {};
    if (!eventData.event_name)
      currentErrors.event_name = "Event name is required";
    if (!eventData.description || eventData.description === "<p><br></p>")
      currentErrors.description = "Description is required";
    if (!eventData.date) currentErrors.date = "Date is required";

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const updateEventDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Updated Event: ", eventData);

      toast.success("Event updated successfully!");

      setTimeout(() => {
        backToEnevts();
      }, 2000);
    } else {
      toast.error("Please fix the errors to proceed!");
    }
  };

  return (
    <div className="ed-edit-event">
      <ToastContainer />
      <div className="top-bar">
        <div className="left">
          <i className="bx bx-chevron-left" onClick={backToEnevts}></i>
        </div>
        <div className="right">
          <h2>{editData ? "Edit Event" : "Create New Event"}</h2>
          <p>
            {editData
              ? "Update event details to reflect any changes in plans or schedules."
              : "Easily add upcoming events to keep your students and staff informed."}
          </p>
        </div>
      </div>

      <div className="form-section">
        <form>
          <div className="input-fields">
            <label>Event Name</label>
            <input
              type="text"
              name="event_name"
              value={eventData.event_name}
              onChange={handleChange}
              placeholder="Enter event name"
            />
            {errors.event_name && (
              <span className="error">{errors.event_name}</span>
            )}
          </div>

          <div className="input-fields">
            <label>Description</label>
            <div ref={editorRef} className="quill-editor"></div>
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <div className="input-fields">
            <label>Event Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>
        </form>

        <div className="save-btn">
          <button type="submit" onClick={updateEventDetails}>
            {editData ? "Update Event" : "Save Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
