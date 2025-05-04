import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Settings.css';

const Settings = () => {
  const storedUser = JSON.parse(localStorage.getItem("registeredDepartmentData"));

  const [formData, setFormData] = useState(() => {
    if (!storedUser || typeof storedUser !== 'object') return {};
    const { confirmPassword, ...rest } = storedUser;
    return rest;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: key === "termsAndCondition" ? value.target.checked : value.target.value
    }));
  };

  const handleSelectChange = (e) => {
    setFormData(prev => ({
      ...prev,
      twoStepVerification: e.target.value === "true" ? true : false
    }));
  };

  const handleSave = () => {
    localStorage.setItem("registeredDepartmentData", JSON.stringify(formData));
    toast.success("Settings saved successfully!");
  };

  if (!storedUser || typeof storedUser !== 'object') {
    return <p>No registered department data found.</p>;
  }

  return (
    <div className='eb-settings'>
      <div className='eb-settings-topbar'>
        <div>
          <h2>Control your department</h2>
          <p>Take full control over your department details</p>
        </div>
      </div>

      <div className='eb-setting-items'>
        {isLoading ? (
          Array(10).fill().map((_, idx) => (
            <div className="input-fields" key={idx}>
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-input"></div>
            </div>
          ))
        ) : (
          Object.entries(formData).map(([key, value], index) => {
            if (key === "termsAndCondition") return null;

            let inputField;
            if (key === "twoStepVerification") {
              inputField = (
                <select value={value} onChange={handleSelectChange}>
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              );
            } else if (key.toLowerCase().includes("email")) {
              inputField = (
                <input
                  type="email"
                  value={value}
                  onChange={(e) => handleChange(key, e)}
                />
              );
            } else if (key.toLowerCase().includes("phone")) {
              inputField = (
                <input
                  type="tel"
                  value={value}
                  onChange={(e) => handleChange(key, e)}
                />
              );
            } else if (key.toLowerCase().includes("website")) {
              inputField = (
                <input
                  type="url"
                  value={value}
                  onChange={(e) => handleChange(key, e)}
                />
              );
            } else if (typeof value === "boolean") {
              inputField = (
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleChange(key, e)}
                />
              );
            } else if (key.toLowerCase().includes("password")) {
              inputField = (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e)}
                />
              );
            } else {
              inputField = (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e)}
                />
              );
            }

            return (
              <div className="input-fields" key={index}>
                <label>{formatLabel(key)}</label>
                {inputField}
              </div>
            );
          })
        )}
      </div>

      {isLoading ? (
        <div className="skeleton skeleton-btn"></div>
      ) : (
        <button onClick={handleSave} className='eb-save-settings'>Save Changes</button>
      )}
    </div>
  );
};

export default Settings;
