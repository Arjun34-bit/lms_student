import { c as createComponent, b as renderHead, e as renderSlot, f as renderTemplate } from './astro/server_BhpNIqto.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                              */
import * as yup from 'yup';

const $$Auth = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><title>Auth | Let's Learn Student</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">${renderHead()}</head> <body class="min-h-screen flex items-center justify-center bg-gray-100"> <main class="w-full max-w-md p-6 bg-white shadow-lg rounded-xl"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/USER/lms_student/src/layouts/auth.astro", void 0);

// src/validations/authSchemas.js

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

const registerSchema = yup.object({
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

const phoneLoginSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^(?:\+91|0)?[6-9]\d{9}$/, "Enter a valid Indian phone number"),
});

yup.object({
  country: yup.string().required(),
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "Enter a valid 6-digit OTP"),
});

export { $$Auth as $, loginSchema as l, phoneLoginSchema as p, registerSchema as r };
