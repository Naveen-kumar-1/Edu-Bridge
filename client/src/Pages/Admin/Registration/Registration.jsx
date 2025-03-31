import React, { useContext, useState } from "react";
import "./Registration.css";
import tick_icon from "../../../assets/tick.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/Admin/NavBar/NavBar";
import TermsAndConditionsModal from "../../../Components/Admin/TermsAndConditionModal/TermsAndConditionModal";
import TwoStepAuthModal from "../../../Components/Admin/TwoStepAuthModal/TwoStepAuthModal";
import { AppContext } from "../../../Context/AppContext";
const Registration = () => {
  const [formState, setFormState] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [isValidCode, setIsCodeValid] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { setIsUserRegistred ,isUserRegistred} = useContext(AppContext);

  // Function to open the modal
  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  // Function to close the modal
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();
  const [basicFormData, setBasicFormData] = useState({
    departmentName: "",
    collegeName: "",
    universityName: "",
  });
  const [contactFormData, setContactFormData] = useState({
    departmentEmail: "",
    departmentPhone: "",
    departmentAddress: "",
    departmentWebsite: "",
  });
  const [headFormData, setHeadFormData] = useState({
    departmentHODName: "",
    departmentHODEmail: "",
    departmentHODPhone: "",
  });
  const [verificationCodeForm, setVerificationCodeForm] = useState({
    entredVerificationCode: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
    termsAndCondition: false,
    twoStepVerification: false,
  });

  const [error, setError] = useState({});

  //   Handle input on change
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Update the appropriate form data based on the formState
    if (formState === 1) {
      setBasicFormData({ ...basicFormData, [name]: value });
    } else if (formState === 2) {
      setContactFormData({ ...contactFormData, [name]: value });
    } else if (formState === 3) {
      setHeadFormData({ ...headFormData, [name]: value });
    } else if (formState === 4) {
      setVerificationCodeForm({
        ...verificationCodeForm,
        [e.target.name]: e.target.value,
      });
    } else if (formState === 5) {
      const { name, type, value, checked } = e.target;

      setPasswordForm((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value, // Handle checkboxes with checked value
      }));
    }
  };

  // Validate the form
  const validateForm = () => {
    let currentErrors = {};

    // Basic Information Validation
    if (formState === 1) {
      if (!basicFormData.departmentName)
        currentErrors.departmentName = "Department name is required!";
      if (typeof basicFormData.departmentName !== "string")
        currentErrors.departmentName = "Department name must be string!";
      if (!basicFormData.collegeName)
        currentErrors.collegeName = "College name is required!";
      if (!basicFormData.universityName)
        currentErrors.universityName = "University name is required!";
    }

    // Contact Details Validation
    if (formState === 2) {
      // Email validation
      if (!contactFormData.departmentEmail)
        currentErrors.departmentEmail = "Department email is required!";
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          contactFormData.departmentEmail
        )
      )
        currentErrors.departmentEmail = "Invalid email format!";

      // Phone number validation
      if (!contactFormData.departmentPhone)
        currentErrors.departmentPhone = "Department phone number is required!";
      else if (!/^\d{10}$/.test(contactFormData.departmentPhone))
        currentErrors.departmentPhone =
          "Invalid phone number! Must be 10 digits.";

      // Address validation
      if (!contactFormData.departmentAddress)
        currentErrors.departmentAddress = "Department address is required!";
    }
    if (formState === 3) {
      // Email validation
      if (!headFormData.departmentHODEmail)
        currentErrors.departmentHODEmail = "HOD email is required!";
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          headFormData.departmentHODEmail
        )
      )
        currentErrors.departmentHODEmail = "Invalid email format!";

      // Phone number validation
      if (!headFormData.departmentHODPhone)
        currentErrors.departmentHODPhone = "HOD phone numer is required!";
      else if (!/^\d{10}$/.test(headFormData.departmentHODPhone))
        currentErrors.departmentHODPhone =
          "Invalid phone number! Must be 10 digits.";

      // Address validation
      if (!headFormData.departmentHODName)
        currentErrors.departmentHODName = "HOD name is required!";
    }
    if (formState === 4) {
      if (
        !verificationCodeForm.entredVerificationCode ||
        verificationCodeForm.entredVerificationCode.trim() === ""
      ) {
        currentErrors.entredVerificationCode = "Verification code is required!";
      } else if (verificationCodeForm.entredVerificationCode.length !== 6) {
        currentErrors.entredVerificationCode =
          "Verification code must be exactly 6 characters!";
      } else if (
        verificationCode != verificationCodeForm.entredVerificationCode
      )
        currentErrors.entredVerificationCode =
          "Code not match! please try again";
    }
    if (formState === 5) {
      if (!passwordForm.password) {
        currentErrors.password = "Password is required.";
      } else if (passwordForm.password.length < 8) {
        currentErrors.password = "Password must be at least 8 characters long.";
      }

      if (!passwordForm.confirmPassword) {
        currentErrors.confirmPassword = "Confirm password is required.";
      } else if (passwordForm.password !== passwordForm.confirmPassword) {
        currentErrors.confirmPassword =
          "Passwords do not match. Please ensure both passwords are the same.";
      }
      if (!passwordForm.termsAndCondition) {
        currentErrors.termsAndCondition = "Must accept terms & conditions";
      }
    }

    setError(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Handle Next button
  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormState((prev) => Math.min(prev + 1, 5));
    } else {
      toast.error("An error occurred. Please fix the issue to continue.");
    }
  };

  // Handle previous button
  const handlePrev = (e) => {
    e.preventDefault();
    setFormState((prev) => Math.max(prev - 1, 1));
  };
  //   Send verification code
  const sendVerificationCode = () => {
    toast.success("Code send to the email successfully!");
    const charecters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let verificationCode = "";
    for (let i = 0; i < 6; i++) {
      const randomCode = Math.floor(Math.random() * charecters.length);
      verificationCode += charecters[randomCode];
    }
    console.log(verificationCode);

    setVerificationCode(verificationCode);
  };
  // Check verification code
  const checkVerificationCode = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsCodeValid(true);
      toast.success("Verification successful!");
    } else {
      toast.error("An error occurred. Please fix the issue to continue.");
      setIsCodeValid(false);
    }
  };
  // Complete verification

  const completeRegistration = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Combine all the form data
      const allFormData = {
        ...basicFormData,
        ...contactFormData,
        ...headFormData,
        ...passwordForm,
      };

      try {
        localStorage.setItem(
          "registeredDepartmentData",
          JSON.stringify(allFormData)
        );
       

        // Make the API call to your server for registration
        if (allFormData) {
          localStorage.setItem('isRegistered',true)
          setIsUserRegistred(true)
          console.log(isUserRegistred);
          
          // Success case: Navigate to login
          toast.success("Success");
      //    navigate("/login");
        } else {
          // Error case: Display error message from the response
          toast.error(result.error || "Registration failed");
        }
      } catch (error) {
        console.log(error);

        // Catch any other errors that occur during the API call
        toast.error("An error occurred. Please try again.");
      }
    } else {
      // Validation failed case
      toast.error("An error occurred. Please fix the issue to continue.");
    }
  };

  // Show password
  const displayPassword = () => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };
  const changePageUsingNavigation = (value) => {
    // Allow moving backward without validation
    if (value < formState) {
      setFormState(value);
    } else {
      // Only validate when moving forward
      if (validateForm()) {
        setFormState(value);
      } else {
        toast.error("An error occurred. Please fix the issue to continue.");
      }
    }
  };

  return (
    <>
    <NavBar />
    <div className="ed-registration-container">
   
      <h1>Register your Department</h1>
      <div className="ed-registration-form">
        <div className="top-navigation">
          <span
            className="navigations"
            onClick={() => changePageUsingNavigation(1)}
            style={formState === 1 ? { background: "#fff" } : {}}
          >
            Basic info
          </span>
          <span
            className="navigations"
            onClick={() => changePageUsingNavigation(2)}
            style={formState === 2 ? { background: "#fff" } : {}}
          >
            Contact Details
          </span>
          <span
            className="navigations"
            onClick={() => changePageUsingNavigation(3)}
            style={formState === 3 ? { background: "#fff" } : {}}
          >
            HOD Details
          </span>
          <span
            className="navigations"
            onClick={() => changePageUsingNavigation(4)}
            style={formState === 4 ? { background: "#fff" } : {}}
          >
            Verification
          </span>
        </div>
        <form onSubmit={completeRegistration}>
          {formState === 1 && (
            <div>
              <h2>Basic Information</h2>
              <div className="input-fields">
                <label>
                  Department name: <p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="text"
                  name="departmentName"
                  onChange={handleOnChange}
                  value={basicFormData.departmentName}
                  placeholder="eg.., Computer science"
                />
                {error.departmentName && (
                  <span className="error-message">{error.departmentName}</span>
                )}
              </div>
              <div className="input-fields">
                <label>
                  College name:<p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="text"
                  name="collegeName"
                  onChange={handleOnChange}
                  value={basicFormData.collegeName}
                  placeholder="eg.., MIT"
                />
                {error.collegeName && (
                  <span className="error-message">{error.collegeName}</span>
                )}
              </div>
              <div className="input-fields">
                <label>
                  University name:<p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="text"
                  name="universityName"
                  onChange={handleOnChange}
                  value={basicFormData.universityName}
                  placeholder="eg.., State University"
                />
                {error.universityName && (
                  <span className="error-message">{error.universityName}</span>
                )}
              </div>
            </div>
          )}

          {formState === 2 && (
            <div>
              <h2>Contact Details</h2>
              <div className="input-fields">
                <label>
                  Department email address:<p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="email"
                  name="departmentEmail"
                  onChange={handleOnChange}
                  value={contactFormData.departmentEmail}
                  placeholder="eg.., example@edu.in"
                />
                {error.departmentEmail && (
                  <span className="error-message">{error.departmentEmail}</span>
                )}
              </div>
              <div className="input-fields">
                <label>
                  Department Contact number:<p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="text"
                  name="departmentPhone"
                  onChange={handleOnChange}
                  value={contactFormData.departmentPhone}
                  placeholder="eg.., 432 567 890"
                />
                {error.departmentPhone && (
                  <span className="error-message">{error.departmentPhone}</span>
                )}
              </div>
              <div className="input-fields">
                <label>
                  Department Location:<p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="text"
                  name="departmentAddress"
                  onChange={handleOnChange}
                  value={contactFormData.departmentAddress}
                  placeholder="eg.., Happie Street"
                />
                {error.departmentAddress && (
                  <span className="error-message">
                    {error.departmentAddress}
                  </span>
                )}
              </div>
              <div className="input-fields">
                <label>Department website (if applicable): </label>
                <input
                  type="text"
                  name="departmentWebsite"
                  onChange={handleOnChange}
                  value={contactFormData.departmentWebsite}
                  placeholder="eg.., example.in"
                />
                {error.departmentWebsite && (
                  <span className="error-message">
                    {error.departmentWebsite}
                  </span>
                )}
              </div>
            </div>
          )}

          {formState === 3 && (
            <div>
              <h2>Department head</h2>
              <div className="input-fields">
                <label>
                  HOD name:<p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="text"
                  name="departmentHODName"
                  onChange={handleOnChange}
                  value={headFormData.departmentHODName}
                  placeholder="eg.., John Doe"
                />
                {error.departmentHODName && (
                  <span className="error-message">
                    {error.departmentHODName}
                  </span>
                )}
              </div>
              <div className="input-fields">
                <label>
                  HOD email address:<p className="important-mark">*</p>{" "}
                </label>
                <input
                  type="email"
                  name="departmentHODEmail"
                  onChange={handleOnChange}
                  value={headFormData.departmentHODEmail}
                  placeholder="eg.., example.in"
                />
                {error.departmentHODEmail && (
                  <span className="error-message">
                    {error.departmentHODEmail}
                  </span>
                )}
              </div>
              <div className="input-fields">
                <label>
                  HOD Contact Number: <p className="important-mark">*</p>
                </label>
                <input
                  type="email"
                  name="departmentHODPhone"
                  onChange={handleOnChange}
                  value={headFormData.departmentHODPhone}
                  placeholder="eg.., 432 567 890"
                />
                {error.departmentHODPhone && (
                  <span className="error-message">
                    {error.departmentHODPhone}
                  </span>
                )}
              </div>
            </div>
          )}

          {formState === 4 && (
            <div>
              <h2>Send verification code</h2>
              <div className="verification-page">
                <p>
                  The verification code is sent to your department email address
                  <span className="important-mark">*</span>
                </p>
                {!verificationCode && (
                  <div className="send-verification-code">
                    <button
                      className="verification-btn"
                      onClick={sendVerificationCode}
                      name="entredVerificationCode"
                    >
                      Send verification code
                    </button>
                    {error.entredVerificationCode && (
                      <span className="error-message">
                        {error.entredVerificationCode}
                      </span>
                    )}
                  </div>
                )}
                {verificationCode && !isValidCode && (
                  <div>
                    <div className="input-fields">
                      <label>
                        Enter verification code:{" "}
                        <p className="important-mark">*</p>
                      </label>
                      <input
                        type="text"
                        maxLength="6"
                        placeholder="eg.., xyz123"
                        name="entredVerificationCode"
                        onChange={handleOnChange}
                      />
                      {error.entredVerificationCode && (
                        <span className="error-message">
                          {error.entredVerificationCode}
                        </span>
                      )}
                    </div>
                    <button
                      className="verification-submit-btn"
                      onClick={checkVerificationCode}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {isValidCode && (
                  <div className="success-code-validation">
                    <p>Code verified successfully!</p>
                    <img src={tick_icon} alt="" />
                  </div>
                )}
              </div>
            </div>
          )}
          {formState === 5 && (
            <div>
              <h2>Set Password</h2>

              <div className="input-fields">
                <label>
                  Set Password: <p className="important-mark">*</p>
                </label>
                <input
                  type={showPassword}
                  placeholder="*** *** ***"
                  name="password"
                  onChange={handleOnChange}
                />
                {error.password && (
                  <span className="error-message">{error.password}</span>
                )}
              </div>
              <div className="input-fields">
                <label>
                  confirm password : <p className="important-mark">*</p>
                </label>
                <input
                  type={showPassword}
                  placeholder="*** *** ***"
                  name="confirmPassword"
                  onChange={handleOnChange}
                />
                {error.confirmPassword && (
                  <span className="error-message">{error.confirmPassword}</span>
                )}
              </div>
              <div className="display-password">
                <input type="checkbox" onChange={() => displayPassword()} />{" "}
                Show password
              </div>
              <div className="display-password">
                <input
                  type="checkbox"
                  name="termsAndCondition"
                  onChange={handleOnChange}
                />{" "}
                accept{" "}
                <a href="#" onClick={openModal}>
                  terms & conditions
                </a>
                <p className="important-mark">*</p>
              </div>
              <div className="terms-and-condition-error">
                {error.termsAndCondition && (
                  <span className="error-message">
                    {error.termsAndCondition}
                  </span>
                )}
              </div>
              <div className="display-password">
                <input
                  type="checkbox"
                  name="twoStepVerification"
                  onChange={handleOnChange}
                />{" "}
                Enable two step authendication{" "}
                <a href="#" onClick={openAuthModal}>
                  Learn More
                </a>
              </div>
            </div>
          )}
          <div className="ed-register-form-pagination">
            {formState > 1 && !isValidCode && (
              <a href="#" className="previous-btn" onClick={handlePrev}>
                Prev
              </a>
            )}
            {formState <= 4 && (
              <a href="#" className="next-btn" onClick={handleNext}>
                Next
              </a>
            )}
            {formState === 5 /*&& verificationCode && isValidCode*/ && (
              <button type="submit" className="next-btn">
                Complete Registration
              </button>
            )}
          </div>
        </form>
      </div>
      <TermsAndConditionsModal isOpen={isModalOpen} onClose={closeModal} />
      <TwoStepAuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
    </>
  );
};

export default Registration;
