// src/validations/authSchemas.js
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const phoneLoginSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^(?:\+91|0)?[6-9]\d{9}$/, "Enter a valid Indian phone number"),
});

export const phoneLoginOtpSchema = yup.object({
  country: yup.string().required(),
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "Enter a valid 6-digit OTP"),
});
