import mongoose from "mongoose";

const entranceSchema = new mongoose.Schema({
  departmentName: String,
  collegeName: String,
  universityName: String,
  departmentEmail: String,
  departmentPhone: String,
  departmentAddress: String,
  departmentWebsite: String,
  departmentHODName: String,
  departmentHODEmail: String,
  departmentHODPhone: String,
  password: String,
  termsAndCondition: Boolean,
  twoStepVerification: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Organization = mongoose.model("organization", entranceSchema);

export default Organization;
