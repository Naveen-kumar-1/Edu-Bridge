import express from "express";
import { loginOrganization, registerOrganization, sendEmail, verifyEmailCode } from "../Controller/EntranceController.js";


const router = express.Router();

// Register a Organization

router.post("/register", registerOrganization);

// Login Organization

router.post('/login',loginOrganization);

// Send Mail Function

router.post('/send-mail',sendEmail);

//  Verify Email code 

router.post('/verify-code',verifyEmailCode)

export default router;

