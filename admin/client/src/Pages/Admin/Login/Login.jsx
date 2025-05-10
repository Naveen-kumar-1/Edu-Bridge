import React, { useContext, useState } from "react";
import "./Login.css";
import NavBar from "../../../Components/Admin/NavBar/NavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const [requiresTwoStep, setRequiresTwoStep] = useState(false); // for two-step verification
  const [verificationCode, setVerificationCode] = useState("");
  const { setIsUserLogin, backendUrl } = useContext(AppContext);
  const [isResendOtpSubmitting,setIsRecentOtpSubmitting] = useState(false);
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
      }
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;
  
    setIsSubmitting(true);
  
    try {
      
      
      const response = await axios.post(`${backendUrl}/api/entrance/login`, {
        email,
        password,
      });
     
      const { success, token, organization } = response.data;
  
      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("org", JSON.stringify(organization));
  
        if (organization.twoStepVerification) {
          const emailResponse = await axios.post(`${backendUrl}/api/entrance/send-mail`, {
            emailtype: "sendloginmail",
            email,
          });
          console.log(emailResponse)
  
          if (emailResponse.data?.success) {
            setRequiresTwoStep(true);
            toast.success("Two-step verification required.");
          } else {
            toast.error("Failed to initiate two-step verification.");
          }
        } else {
          localStorage.setItem("isLoggedIn", "true");
          setIsUserLogin(true);
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login failed.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Handle two-step verification
  const handleTwoStep = async () => {
    if (isVerifying) return; // Prevent double click
    setIsVerifying(true);
  
    try {
      if (!validateForm()) {
        toast.error("Please enter a valid verification code.");
        return;
      }
  
      // Send the verification code for backend validation
      const response = await axios.post(`${backendUrl}/api/entrance/verify-code`, {
        email:email,
        code:verificationCode,
      });
  
      if (response.data.success) {
        toast.success(response.data.message || "Two-step verification successful!");
        localStorage.setItem("isLoggedIn", true);
        setIsUserLogin(true);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred during verification.");
    } finally {
      setIsVerifying(false); // Re-enable button after request finishes
    }
  };
  const handleResendOpt = async () =>{
    if(isResendOtpSubmitting) return;
    setIsRecentOtpSubmitting(true)
    try {
      const emailResponse = await axios.post(`${backendUrl}/api/entrance/send-mail`, {
        emailtype: "resendloginmail",
        email,
      });
      if(emailResponse.data?.success){
        toast.success('Otp sended successfully...!')
      }else{
        toast.error('Failed to re-send the Otp...!')
      }
    } catch (error) {
      toast.error('Failed to re-send the Otp...!')
      
    }finally{
      setIsRecentOtpSubmitting(true)
    }
   
  }
  

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
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
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
              <div className="eb-login-resend-otp">
                <span className="eb-login-resend-otp-button" onClick={handleResendOpt} disabled={isResendOtpSubmitting}><i class='bx bx-refresh'></i></span>
                <span className="eb-login-resend-otp-text">Resend OTP</span>
              </div>
              {/* You can add your OTP input field here */}
              <button
                className="eb-login-submit-otp"
                type="button"
                onClick={handleTwoStep}
                disabled={isVerifying}
              >
                {isVerifying
                  ? "Verifying..."
                  : "Submit Two-Step Verification Code"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
