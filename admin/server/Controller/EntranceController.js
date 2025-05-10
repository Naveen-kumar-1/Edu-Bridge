import Organization from "../models/organization.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationMailEmail } from "../email/verificationEmail.js";
import { template } from "../template/templates.js";
import {
  generateVerificationCode,
  verifyCode,
} from "../service/authService.js";

export const registerOrganization = async (req, res) => {
  const saltRounds = 10;
  try {
    const organizationData = req.body;

    if (!organizationData.password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    const departmentEmail = organizationData.departmentEmail;
    const org = await Organization.findOne({ departmentEmail });

    if (org) {
      return res
        .status(401)
        .json({ success: false, message: "Organization is already exits...!" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(
      organizationData.password,
      saltRounds
    );
    const organization = new Organization({
      ...organizationData,
      password: hashedPassword,
    });
    await organization.save();
    res.status(201).json({
      success: true,
      message: "Organization registered successfully",
      data: organization,
    });
  } catch (error) {
    console.error("Error saving organization:", error);
    res.status(500).json({
      success: false,
      message: "Error registering organization",
      error: error.message,
    });
  }
};

export const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const org = await Organization.findOne({ departmentEmail: email });
    if (!org) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, org.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: org._id, email: org.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );
    if (org.twoStepVerification === true) {
      return res.status(200).json({
        success: true,
        message: "Two-step verification required",
        requiresTwoStep: true,
        organization: {
          id: org._id,
          departmentName: org.departmentName,
          departmentEmail: org.departmentEmail,
          twoStepVerification: org.twoStepVerification,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      organization: {
        id: org._id,
        departmentName: org.departmentName,
        departmentEmail: org.departmentEmail,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { emailtype, email } = req.body; 
    console.log(email);
    
    const verificationCode = await generateVerificationCode(email);

    const htmlContent = template(emailtype, verificationCode);

    const mailSent = await sendVerificationMailEmail(
      email,
      "Edu-Bridge Verification Code",
      htmlContent
    );

    if (!mailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Verification code sent successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send verification email",
    });
  }
};
export const verifyEmailCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const isValid = await verifyCode(email, code);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired code" });
    }
    return res.status(200).json({ success: true, message: "Code verified" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
