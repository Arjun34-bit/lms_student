// src/validations/authSchemas.js
import * as yup from "yup";

export const joinSchema = yup.object({
  name: yup.string().required("name is required"),
  classID: yup.string().required("classId is required"),
});
