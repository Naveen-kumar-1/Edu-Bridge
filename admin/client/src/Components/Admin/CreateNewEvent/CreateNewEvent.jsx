import React, { useState, useEffect, useRef } from "react";
import "./CreateNewEvent.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewEvent = ({ backToEnevts }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

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

  const saveEvent = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Saving Event: ", eventData);
      toast.success("Event saved successfully!");

      setEventData({
        event_name: "",
        description: (quillRef.current.root.innerHTML = ""),
        date: "",
      });
      setTimeout(() => {
        backToEnevts();
      }, 2000);
    } else {
      toast.error("Please fix the errors to proceed!");
    }
  };

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
  }, []);

  return (
    <div className="ed-create-new-event">
      <ToastContainer />
      <div className="top-bar">
        <div className="left">
          <i className="bx bx-chevron-left" onClick={backToEnevts}></i>
        </div>
        <div className="right">
          <h2>Create New Event</h2>
          <p>
            Easily add upcoming events to keep your students and staff informed.
            Fill out the event details including the title, description, and
            date. This helps ensure timely communication and smooth coordination
            for every academic or extracurricular activity.
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
          <button type="submit" onClick={saveEvent}>
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewEvent;
