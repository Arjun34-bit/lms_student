import axiosClient from "../client";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;

export const authLoginApi = async ({ email, password }) => {
  const { data } = await axiosClient.post(
    `${apiBaseUrl}/student/auth/login-with-email`,
    {
      email,
      password,
    }
  );
  return data;
};

export const authRegisterApi = async ({ name, email, password }) => {
  const { data } = await axiosClient.post(
    `${apiBaseUrl}/student/auth/signup-with-email`,
    {
      name,
      email,
      password,
    }
  );
  return data;
};

export const googleSigninApi = async (idToken) => {
  const { data } = await axiosClient.post("/instructor/auth/google-login", {
    idToken,
  });
  return data;
};

export const authLoginWithPhoneApi = async (idToken) => {
  const response = await axiosClient.post(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/instructor/auth/login-with-phone-number`,
    {
      idToken,
    }
  );
  return response.data;
};
