import React, { useContext, useState } from "react";
import "./Login.css";
import NavBar from "../../../Components/Admin/NavBar/NavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [errors, setErrors] = useState({});
  const [requiresTwoStep, setRequiresTwoStep] = useState(false); // for two-step verification
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const {setIsUserLogin} = useContext(AppContext)
  const navigate = useNavigate();

  // Show password
  const displayPassword = () => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  // Validate form
  const validateForm = () => {
    let currentErrors = {};

    if (!email) {
      currentErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      currentErrors.email = "Invalid email format";
    }

    if (!password) {
      currentErrors.password = "Password is required";
    } else if (password.length < 8) {
      currentErrors.password = "Password must be at least 8 characters long.";
    }
    if (requiresTwoStep) {
      if (!verificationCode) {
        currentErrors.verificationCode = "Verification Code is required";
      } else if (verificationCode.length !== 6) {
        currentErrors.verificationCode =
          "Verification code must be 6 charecters";
      } else if (verificationCode !== generatedCode) {
        currentErrors.verificationCode = "Code doesn't match!";
      }
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Get the stored registered user data
      const registeredUser = JSON.parse(
        localStorage.getItem("registeredDepartmentData")
      );
      console.log(registeredUser);

      if (registeredUser) {
        // If registeredUser is an object, convert it to an array
        const registeredUserArray = Array.isArray(registeredUser)
          ? registeredUser
          : [registeredUser];
          console.log(typeof registeredUserArray);
          

        // Now you can use find on the array
        const user = registeredUserArray.find(
          (user) => user.departmentEmail === email
        );
        if (user && user.password === password) {
          if (user.twoStepVerification) {
            const charecters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let verificationCode = "";
            for (let i = 0; i < 6; i++) {
              const randomCode = Math.floor(Math.random() * charecters.length);
              verificationCode += charecters[randomCode];
            }
            console.log(verificationCode);

            setGeneratedCode(verificationCode);
            setRequiresTwoStep(true);
          } else {
            localStorage.setItem('isLoggedIn',true)
            setIsUserLogin(true)
            // Navigate to the dashboard if login is successful
            toast.success("Login successful!");
            navigate("/dashboard");
          }
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } else {
        toast.error("No registered user found. Please register first.");
      }
    } else {
      toast.error("An error occurred. Please fix the issue to continue.");
    }
  };

  // Handle two-step verification
  const handleTwoStep = () => {
    if (validateForm()) {
      localStorage.setItem('isLoggedIn', true); // Store it as a string
      setIsUserLogin(true)
      toast.success("Two-step verification successful!");
      navigate("/dashboard");  // Navigate to dashboard
    } else {
      toast.error("An error occurred. Please fix the issue to continue.");
    }
  };
  
  return (
    <>
    <NavBar />
    <div className="login-form-container">
    
      <h1>Login your Department</h1>
      <div className="login-form-box">
        {!requiresTwoStep && (
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="input-fields">
              <label>
                Department Email: <p className="important-mark">*</p>{" "}
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter department email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span>{errors.email}</span>}
            </div>
            <div className="input-fields">
              <label>
                Password: <p className="important-mark">*</p>{" "}
              </label>
              <input
                type={showPassword}
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <div className="display-password">
              <input type="checkbox" onChange={() => displayPassword()} />
              Show Password
            </div>
            <button type="submit">Login</button>
          </form>
        )}

        {requiresTwoStep && (
          <div>
            <h2>Two-Step Verification</h2>
            <div className="input-fields">
              <label>
                Verification Code: <p className="important-mark">*</p>{" "}
              </label>
              <input
                type="text"
                name="verificationCode"
                placeholder="Enter your password"
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              {errors.verificationCode && (
                <span>{errors.verificationCode}</span>
              )}
            </div>
            {/* You can add your OTP input field here */}
            <button type="button" onClick={handleTwoStep}>
              Submit Two-Step Verification Code
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Login;
